from django.urls import path
from . import views

urlpatterns = [
    path('methods/', views.PaymentMethodListCreateView.as_view(), name='payment-methods'),
    path('methods/<int:pk>/', views.PaymentMethodDetailView.as_view(), name='payment-method-detail'),
    path('', views.PaymentListView.as_view(), name='payments'),
    path('create-intent/', views.create_payment_intent, name='create-payment-intent'),
    path('confirm/', views.confirm_payment, name='confirm-payment'),
    path('create-setup-intent/', views.create_setup_intent, name='create-setup-intent'),
    path('save-method/', views.save_payment_method, name='save-payment-method'),
    path('refund/', views.process_refund, name='process-refund'),
    path('webhook/stripe/', views.stripe_webhook, name='stripe-webhook'),
]