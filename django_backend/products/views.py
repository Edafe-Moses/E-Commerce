from rest_framework import generics, filters, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Avg, Count
from .models import Category, Brand, Product, Tag
from .serializers import (
    CategorySerializer, BrandSerializer, ProductListSerializer,
    ProductDetailSerializer, TagSerializer
)
from .filters import ProductFilter


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True, parent=None)
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    permission_classes = [permissions.AllowAny]


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True).select_related('category', 'brand')
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'short_description', 'sku']
    ordering_fields = ['name', 'regular_price', 'created_at', 'average_rating']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Add annotations for rating and review count
        queryset = queryset.annotate(
            average_rating=Avg('reviews__rating'),
            review_count=Count('reviews', filter=Q(reviews__is_approved=True))
        )
        
        # Filter by featured products if requested
        if self.request.query_params.get('featured'):
            queryset = queryset.filter(featured=True)
        
        # Filter by category
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Filter by brand
        brand_slug = self.request.query_params.get('brand')
        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)
        
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        return super().get_queryset().select_related('category', 'brand').prefetch_related(
            'images', 'attributes__attribute', 'tags', 'reviews'
        ).annotate(
            average_rating=Avg('reviews__rating'),
            review_count=Count('reviews', filter=Q(reviews__is_approved=True))
        )


class FeaturedProductsView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True, featured=True)
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]


class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def product_search_suggestions(request):
    query = request.GET.get('q', '')
    if len(query) < 2:
        return Response([])
    
    products = Product.objects.filter(
        Q(name__icontains=query) | Q(description__icontains=query),
        is_active=True
    )[:10]
    
    suggestions = [
        {
            'id': product.id,
            'name': product.name,
            'slug': product.slug,
            'price': product.current_price
        }
        for product in products
    ]
    
    return Response(suggestions)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def related_products(request, product_id):
    try:
        product = Product.objects.get(id=product_id, is_active=True)
        related = Product.objects.filter(
            category=product.category,
            is_active=True
        ).exclude(id=product_id)[:8]
        
        serializer = ProductListSerializer(related, many=True)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response([])