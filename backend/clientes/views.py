# clientes/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cliente
from .serializers import ClienteSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from facturas.models import Factura
from facturas.serializers import FacturaSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'identificacion', 'email']
    filterset_fields = ['estado']
    ordering_fields = ['nombre', 'fecha_creacion']
    
    @action(detail=True, methods=['get'])
    def facturas(self, request, pk=None):
        cliente = self.get_object()
        facturas = Factura.objects.filter(cliente=cliente)
        serializer = FacturaSerializer(facturas, many=True)
        return Response(serializer.data)