# reportes/views.py - Versión completa corregida
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum, Count, Q, F
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from django.db import models
from clientes.models import Cliente
from facturas.models import Factura
from pagos.models import Pago

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resumen_general(request):
    hoy = timezone.now().date()
    
    # Totales
    total_cartera = Factura.objects.aggregate(
        total=Sum('saldo_pendiente')
    )['total'] or 0
    
    total_recuperado = Pago.objects.aggregate(
        total=Sum('monto')
    )['total'] or 0
    
    facturas_vencidas = Factura.objects.filter(
        fecha_vencimiento__lt=hoy,
        estado__in=['pendiente', 'parcial']
    ).aggregate(
        total=Sum('saldo_pendiente')
    )['total'] or 0
    
    # Conteos
    total_clientes = Cliente.objects.count()
    clientes_morosos = Cliente.objects.filter(estado='moroso').count()
    facturas_pendientes = Factura.objects.filter(estado__in=['pendiente', 'parcial']).count()
    
    return Response({
        'total_cartera': float(total_cartera),
        'total_recuperado': float(total_recuperado),
        'facturas_vencidas': float(facturas_vencidas),
        'total_clientes': total_clientes,
        'clientes_morosos': clientes_morosos,
        'facturas_pendientes': facturas_pendientes,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resumen_cliente(request, cliente_id):
    try:
        cliente = Cliente.objects.get(id=cliente_id)
        
        facturas_cliente = Factura.objects.filter(cliente=cliente)
        total_deuda = facturas_cliente.aggregate(
            total=Sum('saldo_pendiente')
        )['total'] or 0
        
        pagos_cliente = Pago.objects.filter(factura__cliente=cliente).aggregate(
            total=Sum('monto')
        )['total'] or 0
        
        facturas_vencidas = facturas_cliente.filter(
            estado='vencida'
        ).count()
        
        return Response({
            'cliente': cliente.nombre,
            'total_deuda': float(total_deuda),
            'total_pagado': float(pagos_cliente),
            'facturas_vencidas': facturas_vencidas,
            'total_facturas': facturas_cliente.count(),
        })
    except Cliente.DoesNotExist:
        return Response({'error': 'Cliente no encontrado'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ingresos_mensuales(request):
    # Ingresos de los últimos 12 meses
    doce_meses = timezone.now() - timedelta(days=365)
    
    ingresos = Pago.objects.filter(
        fecha_pago__gte=doce_meses
    ).annotate(
        mes=TruncMonth('fecha_pago')
    ).values('mes').annotate(
        total=Sum('monto')
    ).order_by('mes')
    
    return Response(list(ingresos))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reportes_mora(request):
    hoy = timezone.now().date()
    
    # Facturas vencidas por rangos de días
    facturas_vencidas = Factura.objects.filter(
        fecha_vencimiento__lt=hoy,
        estado__in=['pendiente', 'parcial']
    )
    
    # Calcular días vencidos manualmente
    facturas_con_dias = []
    for factura in facturas_vencidas:
        dias_vencido = (hoy - factura.fecha_vencimiento).days
        facturas_con_dias.append({
            'factura': factura,
            'dias_vencido': dias_vencido
        })
    
    # Agrupar por rangos
    rango_1_30 = [f for f in facturas_con_dias if 1 <= f['dias_vencido'] <= 30]
    rango_31_60 = [f for f in facturas_con_dias if 31 <= f['dias_vencido'] <= 60]
    rango_61_90 = [f for f in facturas_con_dias if 61 <= f['dias_vencido'] <= 90]
    rango_91_mas = [f for f in facturas_con_dias if f['dias_vencido'] > 90]
    
    def calcular_total(facturas_list):
        return sum(float(f['factura'].saldo_pendiente) for f in facturas_list)
    
    return Response({
        'rango_1_30': {
            'cantidad': len(rango_1_30),
            'monto_total': calcular_total(rango_1_30)
        },
        'rango_31_60': {
            'cantidad': len(rango_31_60),
            'monto_total': calcular_total(rango_31_60)
        },
        'rango_61_90': {
            'cantidad': len(rango_61_90),
            'monto_total': calcular_total(rango_61_90)
        },
        'rango_91_mas': {
            'cantidad': len(rango_91_mas),
            'monto_total': calcular_total(rango_91_mas)
        },
        'total_mora': {
            'cantidad': len(facturas_con_dias),
            'monto_total': calcular_total(facturas_con_dias)
        }
    })