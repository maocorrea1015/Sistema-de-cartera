# pagos/models.py
from django.db import models
from facturas.models import Factura

class Pago(models.Model):
    METODO_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('transferencia', 'Transferencia'),
        ('tarjeta', 'Tarjeta'),
        ('cheque', 'Cheque'),
    ]
    
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, related_name='pagos')
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    metodo_pago = models.CharField(max_length=15, choices=METODO_PAGO_CHOICES)
    referencia = models.CharField(max_length=100, blank=True)
    fecha_pago = models.DateField()
    registrado_por = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'pagos'
        ordering = ['-fecha_pago']
    
    def __str__(self):
        return f"Pago ${self.monto} - {self.factura.numero_factura}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Actualizar saldo pendiente de la factura
        self.factura.saldo_pendiente -= self.monto
        self.factura.actualizar_estado()