# clientes/serializers.py
from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.get_full_name', read_only=True)
    
    class Meta:
        model = Cliente
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'fecha_actualizacion')