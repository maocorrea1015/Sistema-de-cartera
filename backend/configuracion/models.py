# configuracion/models.py
from django.db import models

class Empresa(models.Model):
    nombre = models.CharField(max_length=100)
    ruc = models.CharField(max_length=20)
    telefono = models.CharField(max_length=15)
    email = models.EmailField()
    direccion = models.TextField()
    logo = models.ImageField(upload_to='empresa/', null=True, blank=True)
    
    class Meta:
        db_table = 'empresa'
        verbose_name_plural = 'Empresa'
    
    def __str__(self):
        return self.nombre

class ParametroSistema(models.Model):
    clave = models.CharField(max_length=50, unique=True)
    valor = models.TextField()
    descripcion = models.TextField(blank=True)
    
    class Meta:
        db_table = 'parametros_sistema'
    
    def __str__(self):
        return self.clave
    