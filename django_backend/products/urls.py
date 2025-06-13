from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('brands/', views.BrandListView.as_view(), name='brand-list'),
    path('tags/', views.TagListView.as_view(), name='tag-list'),
    path('', views.ProductListView.as_view(), name='product-list'),
    path('featured/', views.FeaturedProductsView.as_view(), name='featured-products'),
    path('search-suggestions/', views.product_search_suggestions, name='product-search-suggestions'),
    path('<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('<int:product_id>/related/', views.related_products, name='related-products'),
]