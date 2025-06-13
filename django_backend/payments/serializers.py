from rest_framework import serializers
from .models import PaymentMethod, Payment, PaymentIntent, Refund


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = [
            'id', 'payment_type', 'provider', 'last_four', 'brand',
            'exp_month', 'exp_year', 'is_default', 'nickname', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class PaymentSerializer(serializers.ModelSerializer):
    payment_method_details = PaymentMethodSerializer(source='payment_method', read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class PaymentIntentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentIntent
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


class PaymentIntentCreateSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    currency = serializers.CharField(max_length=3, default='USD')
    order_id = serializers.UUIDField(required=False)
    payment_method_types = serializers.ListField(
        child=serializers.CharField(),
        default=['card']
    )
    metadata = serializers.JSONField(default=dict)


class PaymentConfirmSerializer(serializers.Serializer):
    payment_intent_id = serializers.CharField()
    payment_method_id = serializers.CharField(required=False)
    return_url = serializers.URLField(required=False)