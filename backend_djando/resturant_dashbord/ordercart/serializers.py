from rest_framework import serializers
from django.db.models import F, Sum
from .models import OrderCart , EndOrder
from catagyres.serializers import *

class ShopCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderCart
        fields = ('id', 'item', 'quantity', 'orderstate', 't_number' ,  'item_cost')

  
    item_cost = serializers.ReadOnlyField()
    
    def get_total_cost(self, obj):
       
        total_cost = OrderCart.objects.all().aggregate(total_cost=Sum(F('quantity') * F('book__price')))['total_cost']
        return total_cost or 0
    
    

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['item'] = {
            'id': instance.item.id,
            'name': instance.item.name,  # Replace with the actual field name in your Book model
            'sellingPrice': instance.item.sellingPrice,  # Replace with the actual field name in your Book model
            
        }
        return representation
    



class OrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = EndOrder
        fields = '__all__'

    totalcost = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    adduser = serializers.CharField(max_length=40, required=False)
    itemsorders = serializers.PrimaryKeyRelatedField(queryset=OrderCart.objects.all(), many=True, required=False)
