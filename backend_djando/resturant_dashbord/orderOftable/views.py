from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .models import Order, OrderItem , Tablemodel

from .serializers import OrderItemSerializer, OrderSerializer ,TableSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def TablesList(request):
    if request.method == 'GET':
        data=Tablemodel.objects.all()
        serialize= TableSerializer(data,context={'request': request}, many=True)

        return Response(serialize.data)
    
    elif request.method == 'POST':
        serialize=TableSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    



@api_view(['PUT', 'DELETE'])
def Tables_detial(request,id):

    try:
        catagre=Tablemodel.objects.get(id=id)
    except Tablemodel.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method ==  'PUT':
        serializers= TableSerializer(catagre,data=request.data,context={'request': request})
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'DELETE':
        Tablemodel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Adjust the permission as needed
def create_order(request):
    # Assuming you have access to the order and its total price
    order_total_price = 1.00  # Replace with your actual total price

    # Create the order
    order = Order.objects.create(
        
        paymentType=request.data.get('paymentType'),  # Replace with the actual form data
        tableNumber=request.data.get('tableNumber'),  # Replace with the actual form data
        addUser=request.data.get('addUser'),  # Replace with the actual form data
        
        total_price=order_total_price,
    )

    # Assuming you have a serializer for order items
    order_items_serializer = OrderItemSerializer(data=request.data.get('items', []), many=True)
    order_items_serializer.is_valid(raise_exception=True)
    order_items_serializer.save(order=order)

    return JsonResponse({"order_id": order.id})

