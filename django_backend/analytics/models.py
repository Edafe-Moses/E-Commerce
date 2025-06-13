from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class UserActivity(models.Model):
    ACTIVITY_TYPES = [
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('registration', 'Registration'),
        ('product_view', 'Product View'),
        ('category_view', 'Category View'),
        ('search', 'Search'),
        ('add_to_cart', 'Add to Cart'),
        ('remove_from_cart', 'Remove from Cart'),
        ('checkout_start', 'Checkout Start'),
        ('checkout_complete', 'Checkout Complete'),
        ('order_placed', 'Order Placed'),
        ('review_submitted', 'Review Submitted'),
        ('wishlist_add', 'Wishlist Add'),
        ('page_view', 'Page View'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session_id = models.CharField(max_length=100, null=True, blank=True)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    object_id = models.CharField(max_length=100, null=True, blank=True)
    object_type = models.CharField(max_length=50, null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analytics_useractivity'
        verbose_name = _('User Activity')
        verbose_name_plural = _('User Activities')
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', 'activity_type']),
            models.Index(fields=['timestamp']),
            models.Index(fields=['session_id']),
        ]

    def __str__(self):
        return f"{self.user or 'Anonymous'} - {self.activity_type} - {self.timestamp}"


class ProductAnalytics(models.Model):
    product = models.OneToOneField('products.Product', on_delete=models.CASCADE, related_name='analytics')
    views_count = models.PositiveIntegerField(default=0)
    cart_additions = models.PositiveIntegerField(default=0)
    purchases = models.PositiveIntegerField(default=0)
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    conversion_rate = models.FloatField(default=0)
    bounce_rate = models.FloatField(default=0)
    avg_time_on_page = models.PositiveIntegerField(default=0)  # seconds
    
    # Time-based metrics
    daily_views = models.JSONField(default=dict, blank=True)
    weekly_views = models.JSONField(default=dict, blank=True)
    monthly_views = models.JSONField(default=dict, blank=True)
    
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'analytics_productanalytics'
        verbose_name = _('Product Analytics')
        verbose_name_plural = _('Product Analytics')

    def __str__(self):
        return f"Analytics for {self.product.name}"


class SalesAnalytics(models.Model):
    date = models.DateField(unique=True)
    total_orders = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_items_sold = models.PositiveIntegerField(default=0)
    avg_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    new_customers = models.PositiveIntegerField(default=0)
    returning_customers = models.PositiveIntegerField(default=0)
    
    # Channel breakdown
    direct_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    organic_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    paid_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    social_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analytics_salesanalytics'
        verbose_name = _('Sales Analytics')
        verbose_name_plural = _('Sales Analytics')
        ordering = ['-date']

    def __str__(self):
        return f"Sales Analytics for {self.date}"


class CustomerSegment(models.Model):
    SEGMENT_TYPES = [
        ('high_value', 'High Value'),
        ('frequent_buyer', 'Frequent Buyer'),
        ('new_customer', 'New Customer'),
        ('at_risk', 'At Risk'),
        ('dormant', 'Dormant'),
        ('vip', 'VIP'),
        ('price_sensitive', 'Price Sensitive'),
        ('brand_loyal', 'Brand Loyal'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='segments')
    segment_type = models.CharField(max_length=50, choices=SEGMENT_TYPES)
    score = models.FloatField(default=0)
    last_calculated = models.DateTimeField(auto_now=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'analytics_customersegment'
        verbose_name = _('Customer Segment')
        verbose_name_plural = _('Customer Segments')
        unique_together = ['user', 'segment_type']

    def __str__(self):
        return f"{self.user.email} - {self.segment_type}"