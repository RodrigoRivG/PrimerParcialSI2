from django.db import models

class Usuarios(models.Model):
    nombre = models.CharField(max_length=55)
    correo = models.CharField(unique=True, max_length=50)
    password = models.TextField()
    rol = models.CharField(max_length=10)

    class Meta:
        managed = True
        db_table = 'usuarios'


