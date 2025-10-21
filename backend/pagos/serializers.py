# pagos/serializers.py
from rest_framework import serializers
from .models import Pago
from facturas.serializers import FacturaSerializer

class PagoSerializer(serializers.ModelSerializer):
    factura_info = FacturaSerializer(source='factura', read_only=True)
    registrado_por_nombre = serializers.CharField(source='registrado_por.get_full_name', read_only=True)
    
    class Meta:
        model = Pago
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'registrado_por')
    
    def validate(self, data):
        factura = data['factura']
        monto = data['monto']
        
        if monto <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a cero.")
        
        if monto > factura.saldo_pendiente:
            raise serializers.ValidationError(
                f"El monto excede el saldo pendiente. Saldo actual: ${factura.saldo_pendiente}"
            )
        
        return data
    
    def create(self, validated_data):
        validated_data['registrado_por'] = self.context['request'].user
        return super().create(validated_data)