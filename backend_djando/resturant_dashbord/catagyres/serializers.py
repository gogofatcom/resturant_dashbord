from rest_framework import serializers
from .models import *

class CatagreySeriralizer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model=Catagrey
        fields='__all__'

    




class ItemSerializer(serializers.ModelSerializer):
      
    #catagyName=CatagreySeriralizer()

    class Meta:
        model=Item
        fields='__all__'
        # fields=['id','name','purshingPrice','sellingPrice','quanilty','packingType','packingType','catagyName','status_show']