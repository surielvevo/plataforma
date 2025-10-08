# Plataforma

## Calculadora de mantenimiento por línea de comandos

Para replicar el cálculo de mantenimiento del script Tkinter en entornos sin interfaz gráfica, se incluye un pequeño programa de consola.

### Ejecución rápida

```bash
python scripts/maintenance_calculator.py --km-actual 15250 --km-proximo 20000 --km-reciente 1200
```

Si omites alguno de los argumentos, la herramienta te pedirá el dato por consola.

### Salida de ejemplo

```text
Kilometraje total actual: 16450 km
✅ Faltan 3550 km para el próximo mantenimiento.
```
