from django.db import models
from django.utils.text import slugify

from vendor.models import Vendor
from shortuuid.django_fields import ShortUUIDField

from userauths.models import User,Profile
# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=100, help_text="Enter your category title", blank=True, null=True)
    image = models.FileField(upload_to='category', null=True, blank=True ,default='category.jpg')
    active = models.BooleanField(default=False, help_text="Activate your account")
    slug = models.SlugField(max_length=500, unique=True, help_text="Enter your slug", blank=True, null=True)

class Product(models.Model):
    STATUS = (
        ("draft", "Draft"),
        ("published", "Published"),
        ("disabled", "Disabled"),
        ("in_review", "In Review"),
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE, help_text="Select your category", blank=True, null=True)
    title = models.CharField(max_length=100, help_text="Enter your product title", blank=True, null=True)
    image = models.FileField(upload_to='product', null=True, blank=True ,default='product.jpg')
    description = models.TextField(help_text="Enter your description", blank=True, null=True)
    price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2, help_text="Enter your price", blank=True, null=True)
    old_price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2, help_text="Enter your old price", blank=True, null=True)
    shipping_cost = models.DecimalField(max_digits=12, decimal_places=2, help_text="Enter your shipping cost", blank=True, null=True)
    stock_quantity = models.PositiveIntegerField(default=1,help_text="Enter your stock quantity", blank=True, null=True)
    in_stock = models.BooleanField(default=True, help_text="Is product in stock?")
    featured = models.BooleanField(default=False, help_text="Is product featured?")
    views = models.PositiveIntegerField(default=0, blank=True, null=True)
    ratings = models.PositiveIntegerField(default=0.00, blank=True, null=True)
    status = models.CharField(max_length=100, choices=STATUS, default="draft", help_text="Select your status", blank=True, null=True)
    vendor = models.ForeignKey(Vendor , on_delete=models.CASCADE, blank=True, null=True)
    pid = ShortUUIDField(length=10, unique=True, alphabet="abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", blank=True, null=True)
    slug = models.SlugField(max_length=500, unique=True, help_text="Enter your slug", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

def __str__(self):
    return str(self.title)

def save(self, *args, **kwargs):
    if self.slug == " " or self.slug is None:
        self.slug = slugify(self.title)

        super(Product, self).save(*args, **kwargs)

class Meta:
    
    verbose_name_plural = "Categories"
    ordering = ['-date']

class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, help_text="Select your product", blank=True, null=True)
    image = models.FileField(upload_to='gallery', null=True, blank=True ,default='gallery.jpg')
    active = models.BooleanField(default=False, help_text="Activate your account")
    date = models.DateTimeField(auto_now_add=True)
    gid = ShortUUIDField(length=10, unique=True, alphabet="abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", blank=True, null=True)

    def __str__(self):
        return self.product.title
    class Meta: 
        verbose_name_plural ="Product Images"    

class Specification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, help_text="Select your product", blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    content = models.CharField(max_length=1000)   
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, help_text="Select your product", blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2, help_text="Enter your price", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Color(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, help_text="Select your product", blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    color_code = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.name