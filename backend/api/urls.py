from django.urls import path
from userauths import views as userauths_views
from store import views as store_views
from vendor import views as vendor_views
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
     path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
     path('user/token/refresh/', TokenRefreshView.as_view()),
     path('user/register/', userauths_views.RegisterView.as_view()),
     path('user/password-reset/<email>/', userauths_views.PasswordResetEmailVerify.as_view()),
     path('user/password-change/', userauths_views.PasswordChangeView.as_view()),

     #Store API endpoints
     path('category/', store_views.CategoryListAPIView.as_view()),
     path('products/', store_views.ProductListAPIView.as_view()),
     path('products/<slug>/', store_views.ProductDetailAPIView.as_view()),
]  
