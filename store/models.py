from django.db import models
from .timestamp import TimeStamp

# Create your models here.
class Category(models.Model):

    title = models.CharField(max_length=64)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Product(TimeStamp):

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    price = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/%Y/%m/%d/')
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
