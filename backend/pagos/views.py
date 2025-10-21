# pagos/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Pago
from .serializers import PagoSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['metodo_pago', 'factura']
    ordering_fields = ['fecha_pago', 'monto']
    
    @action(detail=False, methods=['get'])
    def factura_pagos(self, request, factura_id=None):
        pagos = Pago.objects.filter(factura_id=factura_id)
        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data)