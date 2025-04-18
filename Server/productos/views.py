from django.shortcuts import render
from django.http import JsonResponse

from .models import Productos

# Create your views here.

# Esta lista es para la vista del cliente
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

# Esta lista sera solo para la vista del Admin
def getListProductsAdmin(request):
    productos = Productos.objects.all()
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

# Actualizar los campos de stock, precio y disponible en la
# base de datos, vista del Admin
def updateProduct(request):
    if request.method == 'POST':
        try:
            data = json.load(request.body)

            prod_id = data.get('id')
            n_precio = data.get('precio')
            n_stock = data.get('stock')
            disponible = data.get('disponible')

            producto = Productos.objects.get(id=prod_id)

            if n_precio is not None:
                producto.precio = n_precio
            if n_stock is not None:
                producto.stock = n_stock
            if disponible is not None:
                producto.disponible = disponible

            producto.save()

            return JsonResponse({'mensaje': 'El producto a sido actualizado'}, status=200)

        except Producto.DoesNotExist:
            return JsonResponse({'mensaje': 'Producto no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400) 

    return JsonResponse({'error': 'Metodo no permitido'}, status=405)