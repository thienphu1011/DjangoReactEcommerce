from django.shortcuts import render
from store.models import Product, Category, Review
from store.serializer import ProductSerializer, CategorySerializer, ReviewSerializer
from  rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]    

class ProductDetailAPIView(generics.RetrieveAPIView):
    #queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    def get_object(self):
        slug = self.kwargs['slug']
        return Product.objects.get(slug=slug)