from django.urls import path
from . import views

urlpatterns = [
    path('widgets/', views.DashboardWidgetListCreateView.as_view(), name='dashboard-widgets'),
    path('widgets/<int:pk>/', views.DashboardWidgetDetailView.as_view(), name='dashboard-widget-detail'),
    path('preferences/', views.UserDashboardPreferenceView.as_view(), name='dashboard-preferences'),
    path('overview/', views.dashboard_overview, name='dashboard-overview'),
    path('sales-analytics/', views.sales_analytics, name='sales-analytics'),
    path('customer-analytics/', views.customer_analytics, name='customer-analytics'),
]