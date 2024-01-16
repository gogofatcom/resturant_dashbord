from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework import generics
from .models import *
from django.db.models import Q
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework import status
# Create your views here.

@api_view(['GET', 'POST'])
def CatagresList(request):
    if request.method == 'GET':
        data=Catagrey.objects.all()
        serialize= CatagreySeriralizer(data,context={'request': request}, many=True)

        return Response(serialize.data)
    
    elif request.method == 'POST':
        serialize=CatagreySeriralizer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=status.HTTP_201_CREATED)
        
        
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT', 'DELETE'])
def catagres_detial(request,id):

    try:
        catagre=Catagrey.objects.get(id=id)
    except Catagrey.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method ==  'PUT':
        serializers= CatagreySeriralizer(catagre,data=request.data,context={'request': request})
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'DELETE':
        catagre.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
def ItemsList(request):
    if request.method == 'GET':
        data=Item.objects.all()
        serialize= ItemSerializer(data,context={'request': request}, many=True)

        return Response(serialize.data)
    
    elif request.method == 'POST':
        serialize=ItemSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['PUT', 'DELETE'])
def Items_detial(request,id):

    try:
        item=Item.objects.get(id=id)
    except Item.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method ==  'PUT':
        serializers= ItemSerializer(item,data=request.data,context={'request': request})
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    

    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def ItemssByCategory(request,id):
     items = Item.objects.filter(catagyName=id)
     serializer = ItemSerializer(items, many=True, context={'request': request})  # Pass the request object
     return Response(serializer.data, status=status.HTTP_200_OK)    
    


@api_view(['GET'])
def catgyreById(request,id):
    catgry= Catagrey.objects.get(id=id)
    serializer=CatagreySeriralizer(catgry,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def itemeById(request,id):
    item= Item.objects.get(id=id)
    serializer=ItemSerializer(item,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK) 





# class ItemsearchListView(generics.ListAPIView):
#     queryset = Item.objects.all()
#     serializer_class = ItemSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name', 'packingType']

#     def get_queryset(self):
#         search_query = self.request.query_params.get('q')
#         if search_query:
#             return Item.objects.filter(
#                 Q(name__icontains=search_query) |
#                 Q(category__name__icontains=search_query) 
              
#             )
#         else:
#             return Item.objects.all()
        




class ItemSearchView(generics.ListAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Item.objects.filter(Q(name__icontains=query) | Q(packingType__icontains=query))



class CatgySearchView(generics.ListAPIView):
    serializer_class = CatagreySeriralizer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Catagrey.objects.filter(Q(name__icontains=query))

