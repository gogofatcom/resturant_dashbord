from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework import generics
from catagyres.models import Item
from .models import Cart , EndOrder
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view

from .serializers import ShopCartSerializer , OrdersSerializer

# CART_SESSION_ID = 'cart'

class ListShopCartView(APIView):
    def get(self, request):
        
        #   self.session = request.session
        #   cart = self.session.get(CART_SESSION_ID)
        # Retrieve the shop cart items for the user
        
        shop_cart_items = Cart.objects.all()

        # Serialize the shop cart items
        serializer = ShopCartSerializer(shop_cart_items, many=True,context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)



class AddToShopCartView(APIView):
    def post(self, request):
        # Assuming the request data contains 'book_id' and 'quantity'
        cartid= request.data.get('cartno')
        book_id = request.data.get('item')
        quantity = request.data.get('quantity', 1)  # Default to 1 if quantity is not provided

        # Check if the book exists
        try:
            book = Item.objects.get(id=book_id)
        except Item.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        #
        shop_cart, created = Cart.objects.get_or_create( item=book)

        # Check if the requested quantity exceeds the available stock
        if quantity > book.quanilty:
            return Response({'error': 'Requested quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the requested quantity exceeds the available stock of the book
        if quantity > book.quanilty:
            return Response({'error': 'Requested quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the quantity
        shop_cart.quantity += quantity
        shop_cart.save()

        # Serialize the updated shop cart item
        serializer = ShopCartSerializer(shop_cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


def delete_all_dataofcart(request):
    try:
        Cart.objects.all().delete()
        return JsonResponse({'message': 'All data deleted successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



class RemoveFromShopCartView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = Cart.objects.get(id=cart_item_id)

            # Check if the user making the request is the owner of the shop cart item
           
            # Delete the shop cart item
            shop_cart_item.delete()

            return Response({'message': 'Item removed from the shop cart'}, status=status.HTTP_200_OK)

        except Cart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)



class ReduceShopCartItemQuantityView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = Cart.objects.get(id=cart_item_id)

            # Check if the user making the request is the owner of the shop cart item
           
            # Reduce the quantity of the shop cart item by 1
            if shop_cart_item.quantity > 1:
                shop_cart_item.quantity -= 1
                shop_cart_item.save()
            else:
                # If the quantity is 1, remove the item
                shop_cart_item.delete()

            return Response({'message': 'Quantity reduced or item removed from the shop cart'}, status=status.HTTP_200_OK)

        except Cart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
        
class IncreaseShopCartItemQuantityView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = Cart.objects.get(id=cart_item_id)

        
            # Increase the quantity of the shop cart item by 1
            shop_cart_item.quantity += 1
            shop_cart_item.save()

            return Response({'message': 'Quantity increased for the shop cart item'}, status=status.HTTP_200_OK)

        except Cart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)




class OrderDetail(generics.ListCreateAPIView):
    queryset = EndOrder.objects.all()
    serializer_class = OrdersSerializer
