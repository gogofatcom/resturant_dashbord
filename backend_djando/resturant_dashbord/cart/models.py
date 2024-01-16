from django.db import models
from catagyres.models import Item
from django.contrib.auth.models import User
from orderOftable.models import *

# Create your models here.
class Cart(models.Model):
   cartid=models.BigIntegerField(),
   # client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
   cartn=models.BigIntegerField(default=1 )
   cartno=models.BigIntegerField(default=1)
   item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='shopcart_books')
   quantity = models.PositiveSmallIntegerField(default=0)

   @property
   def item_cost(self):
      return self.quantity * self.item.sellingPrice

   def __str__(self):
      return f"product id: {self.item_id}, Price: {self.item_cost} EGP, quantity :{self.quantity}"
   
   def get_total_cost_for_user(self, order):
        # Retrieve all shop cart items related to the user
        user_cart_items = Cart.objects.all()

        # Calculate the total cost by summing up item costs for each cart item
        total_cost = sum(cart_item.item_cost for cart_item in user_cart_items)

        return total_cost
       



class EndOrder(models.Model):
   CASH='CASH'
   VISA='VISA'
   ORDER_payment = [
        (CASH,'CASH'),
        (VISA,'VISA')]

    
   totalcost = models.DecimalField(max_digits=10, decimal_places=2)
   tableNumber=models.ForeignKey(Tablemodel, on_delete=models.CASCADE, related_name='table_no',blank=True)
   paymentType= models.CharField(max_length=20, choices=ORDER_payment, default='CASH')
   adduser= models.CharField(max_length=40)
   orderedfinish  = models.BooleanField(default=False)
   created_at = models.DateTimeField(auto_now_add=True)
   itemsorders = models.ManyToManyField(Cart)



