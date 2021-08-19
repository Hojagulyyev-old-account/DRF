from django.urls import path, include
from django.conf import settings
from rest_framework import routers
from . import views

# router = routers.SimpleRouter()
router = routers.DefaultRouter()

router.register('category', views.CategoryViewSet)
router.register('product', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
