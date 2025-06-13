from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Order, OrderStatusHistory, Refund
from .serializers import (
    OrderListSerializer, OrderDetailSerializer, OrderCreateSerializer,
    RefundSerializer
)


class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderListSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def update_order_status(request, order_id):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
    
    order = get_object_or_404(Order, id=order_id)
    new_status = request.data.get('status')
    notes = request.data.get('notes', '')
    
    if new_status not in dict(Order.STATUS_CHOICES):
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Update order status
    old_status = order.status
    order.status = new_status
    order.save()
    
    # Create status history entry
    OrderStatusHistory.objects.create(
        order=order,
        status=new_status,
        notes=notes,
        created_by=request.user
    )
    
    return Response({
        'message': f'Order status updated from {old_status} to {new_status}',
        'order': OrderDetailSerializer(order).data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def cancel_order(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    if order.status not in ['pending', 'confirmed']:
        return Response(
            {'error': 'Order cannot be cancelled at this stage'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    order.status = 'cancelled'
    order.save()
    
    # Create status history entry
    OrderStatusHistory.objects.create(
        order=order,
        status='cancelled',
        notes='Cancelled by customer',
        created_by=request.user
    )
    
    return Response({'message': 'Order cancelled successfully'})


class RefundListCreateView(generics.ListCreateAPIView):
    serializer_class = RefundSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Refund.objects.all()
        return Refund.objects.filter(order__user=user)

    def perform_create(self, serializer):
        order_id = self.request.data.get('order')
        order = get_object_or_404(Order, id=order_id, user=self.request.user)
        serializer.save(order=order)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def process_refund(request, refund_id):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
    
    refund = get_object_or_404(Refund, id=refund_id)
    action = request.data.get('action')  # 'approve' or 'reject'
    
    if action == 'approve':
        refund.status = 'approved'
        # Here you would integrate with payment processor to process refund
        refund.refund_reference = f"REF_{refund.id}"
    elif action == 'reject':
        refund.status = 'rejected'
    else:
        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
    
    refund.processed_by = request.user
    refund.save()
    
    return Response({
        'message': f'Refund {action}d successfully',
        'refund': RefundSerializer(refund).data
    })