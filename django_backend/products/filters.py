import django_filters
from .models import Product, Category, Brand


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="regular_price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="regular_price", lookup_expr='lte')
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.filter(is_active=True))
    brand = django_filters.ModelChoiceFilter(queryset=Brand.objects.filter(is_active=True))
    in_stock = django_filters.BooleanFilter(method='filter_in_stock')
    on_sale = django_filters.BooleanFilter(method='filter_on_sale')
    rating = django_filters.NumberFilter(method='filter_rating')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'featured', 'is_digital']

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock_quantity__gt=0)
        return queryset

    def filter_on_sale(self, queryset, name, value):
        if value:
            return queryset.filter(sale_price__isnull=False)
        return queryset

    def filter_rating(self, queryset, name, value):
        return queryset.filter(reviews__rating__gte=value)