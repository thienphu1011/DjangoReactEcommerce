from django.db import models
from django.utils.text import slugify

from userauths.models import User
# Create your models here.

class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to='vendor', null=True, blank=True ,default='vendor.jpg')
    name = models.CharField(max_length=100, help_text="Enter your name", blank=True, null=True)
    description = models.TextField(help_text="Enter your description", blank=True, null=True)
    mobile = models.CharField(max_length=20, help_text="Enter your mobile number", blank=True, null=True)
    active = models.BooleanField(default=False, help_text="Activate your account")
    date = models.DateTimeField(auto_now_add=True, help_text="Date of account creation")
    slug = models.SlugField(max_length=500, unique=True, help_text="Enter your slug", blank=True, null=True)

class Meta:
    
    verbose_name_plural = "Vendors"
    odering = ['-date']

def __str__(self):
    return str(self.name)

def save(self, *args, **kwargs):
    if self.slug == " " or self.slug is None:
        self.slug = slugify(self.name)

        super(Vendor, self).save(*args, **kwargs)