# clientes/models.py
from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('moroso', 'Moroso'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    identificacion = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=15)
    direccion = models.TextField()
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='activo')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'clientes'
    
    def __str__(self):
        return f"{self.nombre} ({self.identificacion})"