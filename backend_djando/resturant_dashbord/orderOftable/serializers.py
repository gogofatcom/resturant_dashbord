from rest_framework import serializers
from .models import  Order, OrderItem , Tablemodel
from  catagyres.serializers import ItemSerializer

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablemodel
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = OrderItem
        fields = ['item', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['total_price','paymentType','addUser','items','tableNumber']

    
    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order    