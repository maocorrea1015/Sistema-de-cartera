# facturas/serializers.py
from rest_framework import serializers
from .models import Factura
from clientes.serializers import ClienteSerializer

class FacturaSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    dias_vencimiento = serializers.SerializerMethodField()
    
    class Meta:
        model = Factura
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'creado_por', 'saldo_pendiente')
    
    def get_dias_vencimiento(self, obj):
        from django.utils import timezone
        hoy = timezone.now().date()
        if obj.fecha_vencimiento < hoy and obj.estado != 'pagada':
            return (hoy - obj.fecha_vencimiento).days
        return 0
    
    def create(self, validated_data):
        validated_data['creado_por'] = self.context['request'].user
        validated_data['saldo_pendiente'] = validated_data['monto_total']
        return super().create(validated_data)