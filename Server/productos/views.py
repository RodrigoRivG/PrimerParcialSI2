from django.shortcuts import render
from django.http import JsonResponse

from .models import Productos

# Create your views here.
def getListProducts(request):
    productos = Productos.objects.filter(disponible=True)
    data = []
    for producto in productos:
        data.append({
            "id": producto.id,
            "nombre": producto.nombre,
            "precio": float(producto.precio),
            "imagen": producto.imagen,
            "disponible": producto.disponible,
            "stock": producto.stock
        })
    
    return JsonResponse(data, safe=False)