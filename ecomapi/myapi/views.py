from django.shortcuts import render
from rest_framework import generics
from .models import products
from .serializers import ProductSerializer
# Create your views here.

class ProductList(generics.ListCreateAPIView):
    queryset = products.objects.all()
    serializer_class = ProductSerializer
