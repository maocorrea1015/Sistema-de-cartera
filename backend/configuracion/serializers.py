# configuracion/serializers.py
from rest_framework import serializers
from .models import Empresa, ParametroSistema

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class ParametroSistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParametroSistema
        fields = '__all__'