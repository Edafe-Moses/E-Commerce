from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListCreateView.as_view(), name='order-list-create'),
    path('<uuid:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('<uuid:order_id>/update-status/', views.update_order_status, name='update-order-status'),
    path('<uuid:order_id>/cancel/', views.cancel_order, name='cancel-order'),
    path('refunds/', views.RefundListCreateView.as_view(), name='refund-list-create'),
    path('refunds/<int:refund_id>/process/', views.process_refund, name='process-refund'),
]