"""
URL configuration for resturant_dashbord project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from catagyres.views import *
from orderOftable.views import *
from ordercart.views import*

from django.conf import  settings
from django.conf.urls.static import static
# from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('admin/', admin.site.urls),
    
   

    path('catagyres/', CatagresList),
     path('catagyres/<int:id>/', catagres_detial),
     path('catagy/<int:id>/',catgyreById),

    path('items/', ItemsList),
    path('items/<int:id>/', Items_detial), 
    path('item/<int:id>/', itemeById), 


     path('tables/', TablesList),
     path('iables/<int:id>/', Tables_detial), 

   #order
  
    path('orderx/', OrderDetail.as_view(), name='order-detail'),
    # path('orders/', OrderListCreate.as_view(), name='order-list-create'),
    
   #cart
    path('api/add-to-cart/', AddToShopCartView.as_view(), name='add-to-cart'),
    path('api/remove-from-cart/', RemoveFromShopCartView.as_view(), name='remove-from-cart'),
    path('api/list-cart/', ListShopCartView.as_view(), name='list-cart'),
    path('api/reduce-cart-item-quantity/', ReduceShopCartItemQuantityView.as_view(), name='list-cart'),
    path('api/increase-cart-item-quantity/', IncreaseShopCartItemQuantityView.as_view(), name='list-cart'),
     path('deletorder/', delete_all_dataofcart, name='delete_order'),
     path('cart_items/', ListCartOfTable.as_view(),name='items_of_table'),
     path('cartstatus/', update_cartstuts, name='delete_order'),
     path('cancelorder/', cancel_items, name='cancel_order'),
    
    path('search/', ItemSearchView.as_view(), name='itemsearch'),
     path('searchcatgy/', CatgySearchView.as_view(), name='itemsearch'),

    # path('orders/', OrderListCreate.as_view(), name='order-list-create'),

    # path('orders/',  OrderListCreate.as_view(), name='order-list-create'),
    # path('orders/<int:pk>/', OrderRetrieveUpdateDestroy.as_view(), name='order-retrieve-update-destroy'),


    # path('order/<int:id>/', orders_detial),
    # path('orderInc/', IncreaseShopCartItemQuantityView.as_view()),
    # path('orderDec/', DecreseItemQuantityView.as_view()),    

    path('itemscatgres/<int:id>/', ItemssByCategory),
    



]
if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
