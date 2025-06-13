from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from .models import DashboardWidget, UserDashboardPreference
from .serializers import DashboardWidgetSerializer, UserDashboardPreferenceSerializer
from orders.models import Order
from products.models import Product
from analytics.models import UserActivity


class DashboardWidgetListCreateView(generics.ListCreateAPIView):
    serializer_class = DashboardWidgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DashboardWidget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DashboardWidgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DashboardWidgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DashboardWidget.objects.filter(user=self.request.user)


class UserDashboardPreferenceView(generics.RetrieveUpdateAPIView):
    serializer_class = UserDashboardPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        preference, created = UserDashboardPreference.objects.get_or_create(
            user=self.request.user
        )
        return preference


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_overview(request):
    user = request.user
    now = timezone.now()
    thirty_days_ago = now - timedelta(days=30)
    
    # Sales Overview
    if user.is_staff or user.account_type == 'B2B':
        total_orders = Order.objects.filter(created_at__gte=thirty_days_ago).count()
        total_revenue = Order.objects.filter(
            created_at__gte=thirty_days_ago,
            status__in=['completed', 'shipped', 'delivered']
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        
        avg_order_value = Order.objects.filter(
            created_at__gte=thirty_days_ago
        ).aggregate(avg=Avg('total_amount'))['avg'] or 0
        
        # Top Products
        top_products = Product.objects.filter(
            orderitem__order__created_at__gte=thirty_days_ago
        ).annotate(
            total_sold=Sum('orderitem__quantity')
        ).order_by('-total_sold')[:5]
        
        # Recent Orders
        recent_orders = Order.objects.filter(
            created_at__gte=thirty_days_ago
        ).order_by('-created_at')[:10]
        
        data = {
            'sales_overview': {
                'total_orders': total_orders,
                'total_revenue': float(total_revenue),
                'avg_order_value': float(avg_order_value),
            },
            'top_products': [
                {
                    'id': product.id,
                    'name': product.name,
                    'total_sold': product.total_sold,
                    'revenue': float(product.total_sold * product.current_price)
                }
                for product in top_products
            ],
            'recent_orders': [
                {
                    'id': order.id,
                    'customer': order.user.get_full_name(),
                    'total': float(order.total_amount),
                    'status': order.status,
                    'created_at': order.created_at
                }
                for order in recent_orders
            ]
        }
    else:
        # Customer dashboard
        user_orders = Order.objects.filter(user=user, created_at__gte=thirty_days_ago)
        total_spent = user_orders.aggregate(total=Sum('total_amount'))['total'] or 0
        
        data = {
            'user_overview': {
                'total_orders': user_orders.count(),
                'total_spent': float(total_spent),
                'recent_orders': [
                    {
                        'id': order.id,
                        'total': float(order.total_amount),
                        'status': order.status,
                        'created_at': order.created_at
                    }
                    for order in user_orders.order_by('-created_at')[:5]
                ]
            }
        }
    
    return Response(data)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def sales_analytics(request):
    if not (request.user.is_staff or request.user.account_type == 'B2B'):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
    
    now = timezone.now()
    days = int(request.GET.get('days', 30))
    start_date = now - timedelta(days=days)
    
    # Daily sales data
    daily_sales = []
    for i in range(days):
        date = start_date + timedelta(days=i)
        next_date = date + timedelta(days=1)
        
        daily_revenue = Order.objects.filter(
            created_at__gte=date,
            created_at__lt=next_date,
            status__in=['completed', 'shipped', 'delivered']
        ).aggregate(total=Sum('total_amount'))['total'] or 0
        
        daily_orders = Order.objects.filter(
            created_at__gte=date,
            created_at__lt=next_date
        ).count()
        
        daily_sales.append({
            'date': date.strftime('%Y-%m-%d'),
            'revenue': float(daily_revenue),
            'orders': daily_orders
        })
    
    return Response({
        'daily_sales': daily_sales,
        'period': f'{days} days'
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def customer_analytics(request):
    if not (request.user.is_staff or request.user.account_type == 'B2B'):
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
    
    now = timezone.now()
    thirty_days_ago = now - timedelta(days=30)
    
    # Customer segments
    new_customers = UserActivity.objects.filter(
        activity_type='registration',
        timestamp__gte=thirty_days_ago
    ).count()
    
    active_customers = UserActivity.objects.filter(
        activity_type='login',
        timestamp__gte=thirty_days_ago
    ).values('user').distinct().count()
    
    returning_customers = Order.objects.filter(
        created_at__gte=thirty_days_ago,
        user__in=Order.objects.filter(
            created_at__lt=thirty_days_ago
        ).values('user')
    ).values('user').distinct().count()
    
    return Response({
        'customer_segments': {
            'new_customers': new_customers,
            'active_customers': active_customers,
            'returning_customers': returning_customers
        }
    })