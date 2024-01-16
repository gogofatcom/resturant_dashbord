from django.db import models

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


# Create your models here.
class Catagrey(models.Model):
    name=models.CharField("name",max_length=240)
    image=models.ImageField(upload_to=upload_to, blank=True, null=True)
    status_Show=models.BooleanField(default=True)
    
    def __str__(self):
        return self.name 
    


class Item(models.Model):
    packingchoise=(
         
        ('carton','carton'),
        ('pill','pill')
       
    )



    name=models.CharField("Name",max_length=240)
    purshingPrice=models.FloatField()
    sellingPrice=models.FloatField()
    quanilty=models.IntegerField()
    packingType=models.CharField(max_length=300, choices = packingchoise)
    catagyName=models.ForeignKey(Catagrey, on_delete=models.CASCADE)
    status_show=models.BooleanField(default=True)
    
    def __str__(self):
        return self.name







