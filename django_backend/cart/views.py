from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, SavedForLater
from .serializers import CartSerializer, CartItemSerializer, SavedForLaterSerializer
from products.models import Product


class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))
    
    product = get_object_or_404(Product, id=product_id, is_active=True)
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': quantity}
    )
    
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    
    return Response({
        'message': 'Product added to cart',
        'cart_item': CartItemSerializer(cart_item).data
    })


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_cart_item(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    quantity = int(request.data.get('quantity', 1))
    
    if quantity <= 0:
        cart_item.delete()
        return Response({'message': 'Item removed from cart'})
    
    cart_item.quantity = quantity
    cart_item.save()
    
    return Response({
        'message': 'Cart item updated',
        'cart_item': CartItemSerializer(cart_item).data
    })


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    cart_item.delete()
    
    return Response({'message': 'Item removed from cart'})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def clear_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart.items.all().delete()
    
    return Response({'message': 'Cart cleared'})


class SavedForLaterListView(generics.ListAPIView):
    serializer_class = SavedForLaterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedForLater.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_for_later(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id, is_active=True)
    
    saved_item, created = SavedForLater.objects.get_or_create(
        user=request.user,
        product=product
    )
    
    if created:
        return Response({'message': 'Product saved for later'})
    else:
        return Response({'message': 'Product already saved'})


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_saved_item(request, item_id):
    saved_item = get_object_or_404(SavedForLater, id=item_id, user=request.user)
    saved_item.delete()
    
    return Response({'message': 'Saved item removed'})