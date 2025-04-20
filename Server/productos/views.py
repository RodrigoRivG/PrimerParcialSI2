from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Productos

# Create your views here.

# Esta lista es para la vista del cliente
@csrf_exempt
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
@csrf_exempt
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
@csrf_exempt
def updateProduct(request, id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            n_precio = data.get('precio')
            n_stock = data.get('stock')

            producto = Productos.objects.get(id=id)

            if n_precio is not None:
                producto.precio = n_precio
            if n_stock is not None:
                producto.stock = n_stock

            producto.save()

            return JsonResponse({'mensaje': 'El producto a sido actualizado'}, status=200)

        except Producto.DoesNotExist:
            return JsonResponse({'mensaje': 'Producto no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400) 

    return JsonResponse({'error': 'Metodo no permitido'}, status=405)