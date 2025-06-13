from django.contrib import admin
from .models import PaymentMethod, Payment, PaymentIntent, Refund


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('user', 'payment_type', 'brand', 'last_four', 'is_default', 'is_active', 'created_at')
    list_filter = ('payment_type', 'brand', 'is_default', 'is_active')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'last_four')
    raw_id_fields = ('user',)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('provider_payment_id', 'user', 'amount', 'currency', 'status', 'provider', 'created_at')
    list_filter = ('status', 'provider', 'currency', 'payment_type')
    search_fields = ('user__email', 'provider_payment_id', 'order__order_number')
    raw_id_fields = ('user', 'order', 'payment_method')
    readonly_fields = ('id', 'created_at', 'updated_at')


@admin.register(PaymentIntent)
class PaymentIntentAdmin(admin.ModelAdmin):
    list_display = ('provider_intent_id', 'user', 'amount', 'currency', 'status', 'created_at')
    list_filter = ('status', 'provider', 'currency')
    search_fields = ('user__email', 'provider_intent_id')
    raw_id_fields = ('user', 'order')


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('provider_refund_id', 'payment', 'amount', 'currency', 'status', 'created_at')
    list_filter = ('status', 'currency')
    search_fields = ('provider_refund_id', 'payment__provider_payment_id')
    raw_id_fields = ('payment',)