# facturas/models.py
from django.db import models
from clientes.models import Cliente

class Factura(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('parcial', 'Pago Parcial'),
        ('pagada', 'Pagada'),
        ('vencida', 'Vencida'),
    ]
    
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='facturas')
    numero_factura = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField()
    monto_total = models.DecimalField(max_digits=12, decimal_places=2)
    saldo_pendiente = models.DecimalField(max_digits=12, decimal_places=2)
    fecha_emision = models.DateField()
    fecha_vencimiento = models.DateField()
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='pendiente')
    creado_por = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'facturas'
        ordering = ['-fecha_emision']
    
    def __str__(self):
        return f"Factura {self.numero_factura} - {self.cliente.nombre}"
    
    def actualizar_estado(self):
        from django.utils import timezone
        hoy = timezone.now().date()
        
        if self.saldo_pendiente == 0:
            self.estado = 'pagada'
        elif self.saldo_pendiente < self.monto_total and self.saldo_pendiente > 0:
            self.estado = 'parcial'
        elif hoy > self.fecha_vencimiento and self.saldo_pendiente > 0:
            self.estado = 'vencida'
        else:
            self.estado = 'pendiente'
        self.save()