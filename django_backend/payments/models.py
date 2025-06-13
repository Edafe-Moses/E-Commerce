from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
import uuid

User = get_user_model()


class PaymentMethod(models.Model):
    PAYMENT_TYPES = [
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('paypal', 'PayPal'),
        ('apple_pay', 'Apple Pay'),
        ('google_pay', 'Google Pay'),
        ('bank_transfer', 'Bank Transfer'),
        ('crypto', 'Cryptocurrency'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_methods')
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPES)
    provider = models.CharField(max_length=50)  # stripe, paypal, etc.
    provider_id = models.CharField(max_length=100)  # external ID
    
    # Card details (encrypted/tokenized)
    last_four = models.CharField(max_length=4, blank=True, null=True)
    brand = models.CharField(max_length=20, blank=True, null=True)  # visa, mastercard, etc.
    exp_month = models.PositiveIntegerField(blank=True, null=True)
    exp_year = models.PositiveIntegerField(blank=True, null=True)
    
    # Metadata
    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    nickname = models.CharField(max_length=50, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments_paymentmethod'
        verbose_name = _('Payment Method')
        verbose_name_plural = _('Payment Methods')

    def __str__(self):
        if self.last_four:
            return f"{self.brand} ending in {self.last_four}"
        return f"{self.payment_type} - {self.provider}"


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('succeeded', 'Succeeded'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
        ('partially_refunded', 'Partially Refunded'),
    ]

    PAYMENT_TYPES = [
        ('order', 'Order Payment'),
        ('subscription', 'Subscription Payment'),
        ('refund', 'Refund'),
        ('partial_refund', 'Partial Refund'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='payments', null=True, blank=True)
    
    # Payment details
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPES, default='order')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    currency = models.CharField(max_length=3, default='USD')
    
    # Provider details
    provider = models.CharField(max_length=50)  # stripe, paypal, etc.
    provider_payment_id = models.CharField(max_length=100, unique=True)
    provider_payment_method_id = models.CharField(max_length=100, blank=True, null=True)
    
    # Payment method used
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, blank=True)
    payment_method_details = models.JSONField(default=dict, blank=True)
    
    # Transaction details
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    failure_reason = models.TextField(blank=True, null=True)
    receipt_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    processed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'payments_payment'
        verbose_name = _('Payment')
        verbose_name_plural = _('Payments')
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment {self.provider_payment_id} - {self.amount} {self.currency}"


class PaymentIntent(models.Model):
    """Represents a payment intent before actual payment"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_intents')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='payment_intents', null=True, blank=True)
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    
    # Provider details
    provider = models.CharField(max_length=50, default='stripe')
    provider_intent_id = models.CharField(max_length=100, unique=True)
    client_secret = models.CharField(max_length=200)
    
    # Status
    status = models.CharField(max_length=20, default='requires_payment_method')
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments_paymentintent'
        verbose_name = _('Payment Intent')
        verbose_name_plural = _('Payment Intents')

    def __str__(self):
        return f"Payment Intent {self.provider_intent_id}"


class Refund(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('succeeded', 'Succeeded'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='refunds')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    reason = models.TextField(blank=True, null=True)
    
    # Provider details
    provider_refund_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    failure_reason = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'payments_refund'
        verbose_name = _('Refund')
        verbose_name_plural = _('Refunds')

    def __str__(self):
        return f"Refund {self.provider_refund_id} - {self.amount} {self.currency}"