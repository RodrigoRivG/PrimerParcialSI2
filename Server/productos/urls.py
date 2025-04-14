from django.urls import path
from . import views

urlpatterns = [
    path('getproducts/', views.getListProducts)
]