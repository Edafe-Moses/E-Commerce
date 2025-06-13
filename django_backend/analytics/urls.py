from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.UserActivityListView.as_view(), name='user-activities'),
    path('overview/', views.analytics_overview, name='analytics-overview'),
    path('user-behavior/', views.user_behavior_analytics, name='user-behavior-analytics'),
    path('customer-segments/', views.customer_segments_analytics, name='customer-segments-analytics'),
    path('track/', views.track_activity, name='track-activity'),
]