# facturas/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from .models import Factura
from .serializers import FacturaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'cliente']
    search_fields = ['numero_factura', 'cliente__nombre']
    ordering_fields = ['fecha_emision', 'fecha_vencimiento', 'monto_total']
    
    @action(detail=False, methods=['get'])
    def vencidas(self, request):
        hoy = timezone.now().date()
        facturas = Factura.objects.filter(
            fecha_vencimiento__lt=hoy,
            estado__in=['pendiente', 'parcial']
        )
        serializer = self.get_serializer(facturas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_vencer(self, request):
        hoy = timezone.now().date()
        proxima_semana = hoy + timezone.timedelta(days=7)
        facturas = Factura.objects.filter(
            fecha_vencimiento__range=[hoy, proxima_semana],
            estado__in=['pendiente', 'parcial']
        )
        serializer = self.get_serializer(facturas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def cliente_facturas(self, request, cliente_id=None):
        facturas = Factura.objects.filter(cliente_id=cliente_id)
        serializer = self.get_serializer(facturas, many=True)
        return Response(serializer.data)