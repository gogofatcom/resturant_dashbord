from catagyres.models import Item
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tablemodel(models.Model):
    name=models.CharField("Name",max_length=240)
    tableDetial=models.CharField("Name",max_length=240)
   
    status_Busy=models.BooleanField(default=False)

    def __str__(self):
        return self.name
    

class Order(models.Model):

    CASH='CASH'
    VISA='VISA'
    ORDER_payment = [
        (CASH,'CASH'),
        (VISA,'VISA')]

    
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    #tableNumber=models.ForeignKey(Tablemodel, on_delete=models.CASCADE, related_name='table_no',blank=True)
    paymentType= models.CharField(max_length=20, choices=ORDER_payment, default='CASH')
    addUser= models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Calculate total price based on the items in the order
        self.total_price = sum(cart_item.item_cost for cart_item in self.client.shopcart_item.all())
      
       
        super().save(*args, **kwargs)


    def __str__(self):
        return f"Order {self.id} - Total Price: {self.total_price} EGP"
 

class OrderManager(models.Manager):
    def create_order(self, addUser):
        order = self.model(addUser=addUser)
        
        # Copy items from the cart to the order
        for cart_item in  addUser.shopcart_item.all():
            order_item = OrderItem.objects.create(order=order, item=cart_item.item, quantity=cart_item.quantity)
        # Clear the cart
        addUser.shopcart_item.all().delete()
        return order
   

Order.add_to_class('objects', OrderManager())
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField() 

    def save(self, *args, **kwargs):
        # Update the associated order's total price when saving an item
        self.order.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order Item {self.id} - Book: {self.book}, Quantity: {self.quantity}"
   

    @property
    def total_cart_price(self):
        return sum(cart_item.item_cost for cart_item in self.shopcart_item.all())

