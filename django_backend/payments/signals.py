from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment
from analytics.models import UserActivity


@receiver(post_save, sender=Payment)
def track_payment_activity(sender, instance, created, **kwargs):
    if created:
        UserActivity.objects.create(
            user=instance.user,
            activity_type='payment_created',
            object_id=str(instance.id),
            object_type='payment',
            metadata={
                'amount': str(instance.amount),
                'currency': instance.currency,
                'provider': instance.provider,
                'status': instance.status
            }
        )
    elif instance.status == 'succeeded':
        UserActivity.objects.create(
            user=instance.user,
            activity_type='payment_succeeded',
            object_id=str(instance.id),
            object_type='payment',
            metadata={
                'amount': str(instance.amount),
                'currency': instance.currency,
                'provider': instance.provider
            }
        )