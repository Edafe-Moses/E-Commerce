from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg
from django.utils import timezone
from datetime import timedelta
from .models import UserActivity, ProductAnalytics, SalesAnalytics, CustomerSegment
from .serializers import (
    UserActivitySerializer, ProductAnalyticsSerializer,
    SalesAnalyticsSerializer, CustomerSegmentSerializer
)


class UserActivityListView(generics.ListAPIView):
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return UserActivity.objects.all()
        return UserActivity.objects.filter(user=user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def analytics_overview(request):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=403)
    
    now = timezone.now()
    thirty_days_ago = now - timedelta(days=30)
    
    # User activity metrics
    total_users = UserActivity.objects.filter(
        activity_type='registration',
        timestamp__gte=thirty_days_ago
    ).count()
    
    active_users = UserActivity.objects.filter(
        activity_type='login',
        timestamp__gte=thirty_days_ago
    ).values('user').distinct().count()
    
    # Product metrics
    top_viewed_products = ProductAnalytics.objects.order_by('-views_count')[:10]
    top_selling_products = ProductAnalytics.objects.order_by('-purchases')[:10]
    
    # Sales metrics
    recent_sales = SalesAnalytics.objects.filter(
        date__gte=thirty_days_ago.date()
    ).order_by('-date')
    
    total_revenue = recent_sales.aggregate(
        total=Sum('total_revenue')
    )['total'] or 0
    
    return Response({
        'user_metrics': {
            'total_new_users': total_users,
            'active_users': active_users,
        },
        'product_metrics': {
            'top_viewed': ProductAnalyticsSerializer(top_viewed_products, many=True).data,
            'top_selling': ProductAnalyticsSerializer(top_selling_products, many=True).data,
        },
        'sales_metrics': {
            'total_revenue': total_revenue,
            'daily_sales': SalesAnalyticsSerializer(recent_sales, many=True).data,
        }
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_behavior_analytics(request):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=403)
    
    # Activity breakdown
    activity_breakdown = UserActivity.objects.values('activity_type').annotate(
        count=Count('id')
    ).order_by('-count')
    
    # Conversion funnel
    funnel_data = {
        'product_views': UserActivity.objects.filter(activity_type='product_view').count(),
        'cart_additions': UserActivity.objects.filter(activity_type='add_to_cart').count(),
        'checkout_starts': UserActivity.objects.filter(activity_type='checkout_start').count(),
        'orders_completed': UserActivity.objects.filter(activity_type='order_placed').count(),
    }
    
    return Response({
        'activity_breakdown': activity_breakdown,
        'conversion_funnel': funnel_data,
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def customer_segments_analytics(request):
    if not request.user.is_staff:
        return Response({'error': 'Permission denied'}, status=403)
    
    segments = CustomerSegment.objects.values('segment_type').annotate(
        count=Count('user'),
        avg_score=Avg('score')
    ).order_by('-count')
    
    return Response({
        'segments': segments
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def track_activity(request):
    """Track custom user activity"""
    activity_type = request.data.get('activity_type')
    object_id = request.data.get('object_id')
    object_type = request.data.get('object_type')
    metadata = request.data.get('metadata', {})
    
    UserActivity.objects.create(
        user=request.user if request.user.is_authenticated else None,
        session_id=request.session.session_key,
        activity_type=activity_type,
        object_id=object_id,
        object_type=object_type,
        metadata=metadata,
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )
    
    return Response({'message': 'Activity tracked successfully'})