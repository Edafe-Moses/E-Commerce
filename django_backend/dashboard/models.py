from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class DashboardWidget(models.Model):
    WIDGET_TYPES = [
        ('sales_overview', 'Sales Overview'),
        ('recent_orders', 'Recent Orders'),
        ('top_products', 'Top Products'),
        ('customer_analytics', 'Customer Analytics'),
        ('inventory_status', 'Inventory Status'),
        ('revenue_chart', 'Revenue Chart'),
        ('conversion_funnel', 'Conversion Funnel'),
        ('geographic_sales', 'Geographic Sales'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dashboard_widgets')
    widget_type = models.CharField(max_length=50, choices=WIDGET_TYPES)
    position_x = models.PositiveIntegerField(default=0)
    position_y = models.PositiveIntegerField(default=0)
    width = models.PositiveIntegerField(default=4)
    height = models.PositiveIntegerField(default=3)
    is_visible = models.BooleanField(default=True)
    settings = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'dashboard_widget'
        verbose_name = _('Dashboard Widget')
        verbose_name_plural = _('Dashboard Widgets')
        unique_together = ['user', 'widget_type']

    def __str__(self):
        return f"{self.user.email} - {self.get_widget_type_display()}"


class UserDashboardPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='dashboard_preferences')
    theme = models.CharField(max_length=20, default='light', choices=[
        ('light', 'Light'),
        ('dark', 'Dark'),
        ('auto', 'Auto'),
    ])
    layout = models.CharField(max_length=20, default='grid', choices=[
        ('grid', 'Grid'),
        ('list', 'List'),
        ('compact', 'Compact'),
    ])
    refresh_interval = models.PositiveIntegerField(default=300)  # seconds
    show_notifications = models.BooleanField(default=True)
    show_tips = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'dashboard_user_preference'
        verbose_name = _('User Dashboard Preference')
        verbose_name_plural = _('User Dashboard Preferences')

    def __str__(self):
        return f"{self.user.email} Dashboard Preferences"