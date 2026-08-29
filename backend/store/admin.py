from django.contrib import admin
from store.models import Category, Product, Gallery ,Specification, Size, Color

# Register your models here.

class GalleryInline(admin.TabularInline):
    model = Gallery
class SpecificationInline(admin.TabularInline):
    model = Specification
class ColorInline(admin.TabularInline):
    model = Color
class SizeInline(admin.TabularInline):
    model = Size        
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'vendor', 'status', 'in_stock', 'featured', 'views', 'ratings', 'date','shipping_cost', 'stock_quantity')
    list_filter = ('category', 'vendor', 'status', 'in_stock', 'featured', 'date')
    list_editable = ('status', 'in_stock', 'featured', 'shipping_cost', 'stock_quantity')
    inlines = [GalleryInline ,SpecificationInline,ColorInline,SizeInline]
    search_fields = ('title',)
    ordering = ('-date',)
    prepopulated_fields = {'slug': ('title',)}
admin.site.register(Category)
admin.site.register(Product , ProductAdmin)
