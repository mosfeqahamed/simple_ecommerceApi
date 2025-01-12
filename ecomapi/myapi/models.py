from django.db import models

# Create your models here.
class products(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField()
    category = models.CharField(max_length=200)
    description = models.TextField()
    img = models.URLField()
    
    def __str__(self):
        return self.title