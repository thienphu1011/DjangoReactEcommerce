from django.contrib import admin
from store.models import Category, Product, Gallery ,Specification, Size, Color, Cart, CartOrder, CartOrderItem ,Review, Wishlist

# Register your models here.

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0 
class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0
class ColorInline(admin.TabularInline):
    model = Color
    extra = 0
class SizeInline(admin.TabularInline):
    model = Size      
    extra = 0  
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'vendor', 'status', 'in_stock', 'featured', 'views', 'ratings', 'date','shipping_cost', 'stock_quantity')
    list_filter = ('category', 'vendor', 'status', 'in_stock', 'featured', 'date')
    list_editable = ('status', 'in_stock', 'featured', 'shipping_cost', 'stock_quantity')
    inlines = [GalleryInline ,SpecificationInline,ColorInline,SizeInline]
    search_fields = ('title',)
    ordering = ('-date',)
    prepopulated_fields = {'slug': ('title',)}
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user']
      
admin.site.register(Category)
admin.site.register(Product , ProductAdmin)
admin.site.register(CartOrderItem)
admin.site.register(CartOrder)
admin.site.register(Cart)
admin.site.register(Review , ReviewAdmin)