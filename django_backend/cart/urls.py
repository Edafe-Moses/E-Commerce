from django.urls import path
from . import views

urlpatterns = [
    path('', views.CartView.as_view(), name='cart-detail'),
    path('add/', views.add_to_cart, name='add-to-cart'),
    path('items/<int:item_id>/update/', views.update_cart_item, name='update-cart-item'),
    path('items/<int:item_id>/remove/', views.remove_from_cart, name='remove-from-cart'),
    path('clear/', views.clear_cart, name='clear-cart'),
    path('saved/', views.SavedForLaterListView.as_view(), name='saved-for-later'),
    path('save/', views.save_for_later, name='save-for-later'),
    path('saved/<int:item_id>/remove/', views.remove_saved_item, name='remove-saved-item'),
]