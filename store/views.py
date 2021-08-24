from django.shortcuts import render
from .serializers import (
    CategorySerializer,
    CategoryRetrieveSerializer,
    ProductSerializer,
    ProductRetrieveSerializer,
)
from rest_framework import viewsets
from .models import Category, Product

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    action_to_serializer = {
        'list':CategorySerializer,
        'retrieve':CategoryRetrieveSerializer,
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )

class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    action_to_serializer = {
        'list':ProductSerializer,
        'retrieve':ProductRetrieveSerializer,
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )
