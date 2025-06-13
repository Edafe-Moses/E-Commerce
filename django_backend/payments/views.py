from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
import stripe
from .models import PaymentMethod, Payment, PaymentIntent, Refund
from .serializers import (
    PaymentMethodSerializer, PaymentSerializer, PaymentIntentSerializer,
    PaymentIntentCreateSerializer, PaymentConfirmSerializer, RefundSerializer
)
from orders.models import Order

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentMethodListCreateView(generics.ListCreateAPIView):
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user, is_active=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PaymentMethodDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_payment_intent(request):
    """Create a payment intent for Stripe"""
    serializer = PaymentIntentCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    user = request.user
    
    try:
        # Create Stripe payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(data['amount'] * 100),  # Convert to cents
            currency=data['currency'].lower(),
            payment_method_types=data['payment_method_types'],
            customer=user.stripe_customer_id if hasattr(user, 'stripe_customer_id') else None,
            metadata={
                'user_id': str(user.id),
                'order_id': str(data.get('order_id', '')),
                **data.get('metadata', {})
            }
        )
        
        # Save payment intent to database
        payment_intent = PaymentIntent.objects.create(
            user=user,
            order_id=data.get('order_id'),
            amount=data['amount'],
            currency=data['currency'],
            provider='stripe',
            provider_intent_id=intent.id,
            client_secret=intent.client_secret,
            status=intent.status,
            metadata=data.get('metadata', {})
        )
        
        return Response({
            'payment_intent': PaymentIntentSerializer(payment_intent).data,
            'client_secret': intent.client_secret,
            'publishable_key': settings.STRIPE_PUBLISHABLE_KEY
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirm_payment(request):
    """Confirm a payment intent"""
    serializer = PaymentConfirmSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    user = request.user
    
    try:
        # Get payment intent from database
        payment_intent = get_object_or_404(
            PaymentIntent,
            provider_intent_id=data['payment_intent_id'],
            user=user
        )
        
        # Confirm with Stripe
        intent = stripe.PaymentIntent.confirm(
            data['payment_intent_id'],
            payment_method=data.get('payment_method_id'),
            return_url=data.get('return_url')
        )
        
        # Update payment intent status
        payment_intent.status = intent.status
        payment_intent.save()
        
        # If successful, create payment record
        if intent.status == 'succeeded':
            payment = Payment.objects.create(
                user=user,
                order=payment_intent.order,
                amount=payment_intent.amount,
                currency=payment_intent.currency,
                provider='stripe',
                provider_payment_id=intent.id,
                status='succeeded',
                net_amount=payment_intent.amount,
                metadata=payment_intent.metadata
            )
            
            # Update order status if applicable
            if payment_intent.order:
                payment_intent.order.payment_status = 'paid'
                payment_intent.order.status = 'confirmed'
                payment_intent.order.save()
            
            return Response({
                'payment': PaymentSerializer(payment).data,
                'status': 'succeeded'
            })
        
        return Response({
            'payment_intent': PaymentIntentSerializer(payment_intent).data,
            'status': intent.status
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_setup_intent(request):
    """Create a setup intent for saving payment methods"""
    user = request.user
    
    try:
        # Create or get Stripe customer
        if not hasattr(user, 'stripe_customer_id') or not user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=user.email,
                name=user.get_full_name(),
                metadata={'user_id': str(user.id)}
            )
            user.stripe_customer_id = customer.id
            user.save()
        
        # Create setup intent
        setup_intent = stripe.SetupIntent.create(
            customer=user.stripe_customer_id,
            payment_method_types=['card'],
            usage='off_session'
        )
        
        return Response({
            'client_secret': setup_intent.client_secret,
            'publishable_key': settings.STRIPE_PUBLISHABLE_KEY
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_payment_method(request):
    """Save a payment method after setup intent confirmation"""
    payment_method_id = request.data.get('payment_method_id')
    nickname = request.data.get('nickname', '')
    is_default = request.data.get('is_default', False)
    
    if not payment_method_id:
        return Response(
            {'error': 'payment_method_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Retrieve payment method from Stripe
        payment_method = stripe.PaymentMethod.retrieve(payment_method_id)
        
        # Save to database
        saved_method = PaymentMethod.objects.create(
            user=request.user,
            payment_type='credit_card',
            provider='stripe',
            provider_id=payment_method_id,
            last_four=payment_method.card.last4,
            brand=payment_method.card.brand,
            exp_month=payment_method.card.exp_month,
            exp_year=payment_method.card.exp_year,
            nickname=nickname,
            is_default=is_default
        )
        
        # If this is set as default, update other methods
        if is_default:
            PaymentMethod.objects.filter(
                user=request.user,
                is_default=True
            ).exclude(id=saved_method.id).update(is_default=False)
        
        return Response({
            'payment_method': PaymentMethodSerializer(saved_method).data,
            'message': 'Payment method saved successfully'
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def process_refund(request):
    """Process a refund for a payment"""
    if not request.user.is_staff:
        return Response(
            {'error': 'Permission denied'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    payment_id = request.data.get('payment_id')
    amount = request.data.get('amount')
    reason = request.data.get('reason', '')
    
    payment = get_object_or_404(Payment, id=payment_id)
    
    try:
        # Create refund with Stripe
        refund = stripe.Refund.create(
            payment_intent=payment.provider_payment_id,
            amount=int(amount * 100) if amount else None,
            reason='requested_by_customer',
            metadata={
                'payment_id': str(payment.id),
                'reason': reason
            }
        )
        
        # Save refund to database
        refund_obj = Refund.objects.create(
            payment=payment,
            amount=amount or payment.amount,
            currency=payment.currency,
            reason=reason,
            provider_refund_id=refund.id,
            status='succeeded' if refund.status == 'succeeded' else 'pending'
        )
        
        # Update payment status
        if refund.amount == payment.amount * 100:  # Full refund
            payment.status = 'refunded'
        else:
            payment.status = 'partially_refunded'
        payment.save()
        
        return Response({
            'refund': RefundSerializer(refund_obj).data,
            'message': 'Refund processed successfully'
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def stripe_webhook(request):
    """Handle Stripe webhooks"""
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except stripe.error.SignatureVerificationError:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # Update payment status in database
        try:
            payment = Payment.objects.get(
                provider_payment_id=payment_intent['id']
            )
            payment.status = 'succeeded'
            payment.save()
        except Payment.DoesNotExist:
            pass
    
    elif event['type'] == 'payment_intent.payment_failed':
        payment_intent = event['data']['object']
        try:
            payment = Payment.objects.get(
                provider_payment_id=payment_intent['id']
            )
            payment.status = 'failed'
            payment.failure_reason = payment_intent.get('last_payment_error', {}).get('message', '')
            payment.save()
        except Payment.DoesNotExist:
            pass
    
    return Response(status=status.HTTP_200_OK)