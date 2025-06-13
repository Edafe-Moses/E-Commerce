from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products_category'
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name
    
    @property
    def full_path(self):
        if self.parent:
            return f"{self.parent.full_path} > {self.name}"
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products_brand'
        verbose_name = _('Brand')
        verbose_name_plural = _('Brands')
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Product(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ('simple', 'Simple Product'),
        ('variable', 'Variable Product'),
        ('grouped', 'Grouped Product'),
        ('external', 'External Product'),
    ]
    
    STOCK_STATUS_CHOICES = [
        ('in_stock', 'In Stock'),
        ('out_of_stock', 'Out of Stock'),
        ('on_backorder', 'On Backorder'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    short_description = models.TextField(max_length=500, blank=True, null=True)
    
    # Product type and categorization
    product_type = models.CharField(max_length=10, choices=PRODUCT_TYPE_CHOICES, default='simple')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True, related_name='products')
    tags = models.ManyToManyField('Tag', blank=True, related_name='products')
    
    # Pricing
    regular_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    b2b_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    # Inventory
    sku = models.CharField(max_length=100, unique=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    stock_status = models.CharField(max_length=15, choices=STOCK_STATUS_CHOICES, default='in_stock')
    manage_stock = models.BooleanField(default=True)
    low_stock_threshold = models.PositiveIntegerField(default=5)
    
    # Physical attributes
    weight = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    length = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    width = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    
    # SEO and marketing
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(max_length=500, blank=True, null=True)
    featured = models.BooleanField(default=False)
    
    # Status and visibility
    is_active = models.BooleanField(default=True)
    is_digital = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products_product'
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['sku']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['featured', 'is_active']),
        ]
    
    def __str__(self):
        return self.name
    
    @property
    def current_price(self):
        return self.sale_price if self.sale_price else self.regular_price
    
    @property
    def is_on_sale(self):
        return self.sale_price is not None and self.sale_price < self.regular_price
    
    @property
    def discount_percentage(self):
        if self.is_on_sale:
            return round(((self.regular_price - self.sale_price) / self.regular_price) * 100, 2)
        return 0
    
    @property
    def average_rating(self):
        reviews = self.reviews.filter(is_approved=True)
        if reviews.exists():
            return reviews.aggregate(models.Avg('rating'))['rating__avg']
        return 0
    
    @property
    def review_count(self):
        return self.reviews.filter(is_approved=True).count()

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'products_productimage'
        verbose_name = _('Product Image')
        verbose_name_plural = _('Product Images')
        ordering = ['sort_order']
    
    def __str__(self):
        return f"{self.product.name} - Image {self.id}"

class ProductAttribute(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    
    class Meta:
        db_table = 'products_productattribute'
        verbose_name = _('Product Attribute')
        verbose_name_plural = _('Product Attributes')
    
    def __str__(self):
        return self.name

class ProductAttributeValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')
    attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE)
    value = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'products_productattributevalue'
        verbose_name = _('Product Attribute Value')
        verbose_name_plural = _('Product Attribute Values')
        unique_together = ['product', 'attribute']
    
    def __str__(self):
        return f"{self.product.name} - {self.attribute.name}: {self.value}"

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    
    class Meta:
        db_table = 'products_tag'
        verbose_name = _('Tag')
        verbose_name_plural = _('Tags')
        ordering = ['name']
    
    def __str__(self):
        return self.name

class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=255)
    comment = models.TextField()
    is_approved = models.BooleanField(default=False)
    is_verified_purchase = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'products_productreview'
        verbose_name = _('Product Review')
        verbose_name_plural = _('Product Reviews')
        unique_together = ['product', 'user']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.user.email} - {self.rating} stars"

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlisted_by')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'products_wishlist'
        verbose_name = _('Wishlist Item')
        verbose_name_plural = _('Wishlist Items')
        unique_together = ['user', 'product']
    
    def __str__(self):
        return f"{self.user.email} - {self.product.name}"