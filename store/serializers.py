from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('is_published', 'updated', 'description')

class ProductRetrieveSerializer(serializers.ModelSerializer):

    category = CategorySerializer()

    class Meta:
        model = Product
        exclude = ('is_published', 'updated', 'description')
