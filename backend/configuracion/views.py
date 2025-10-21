# configuracion/views.py
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Empresa, ParametroSistema
from .serializers import EmpresaSerializer, ParametroSistemaSerializer

class EmpresaView(generics.RetrieveUpdateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Retorna la primera empresa o crea una vacía
        empresa, created = Empresa.objects.get_or_create(
            id=1,
            defaults={
                'nombre': 'Mi Empresa',
                'ruc': '0000000000',
                'telefono': '',
                'email': '',
                'direccion': ''
            }
        )
        return empresa

class ParametroSistemaView(generics.RetrieveUpdateAPIView):
    queryset = ParametroSistema.objects.all()
    serializer_class = ParametroSistemaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Retorna o crea parámetros por defecto
        parametro, created = ParametroSistema.objects.get_or_create(
            clave='configuracion_general',
            defaults={
                'valor': '{}',
                'descripcion': 'Configuración general del sistema'
            }
        )
        return parametro

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_parametros(request):
    parametros = ParametroSistema.objects.all()
    data = {p.clave: p.valor for p in parametros}
    return Response(data)