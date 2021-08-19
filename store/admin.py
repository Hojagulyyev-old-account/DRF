from django.contrib import admin
from .models import Category, Product

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = ('id', 'title', 'slug')
    list_display_links = ('id', 'title')
    prepopulated_fields = {'slug':('title',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = ('id', 'title', 'price', 'is_published')
    list_display_links = ('id', 'title')
    list_editable = ('is_published', )
