# Plataforma de Investigaciones - Módulo PHP

Este directorio contiene un ejemplo básico de dashboard escrito en PHP. Utiliza Bootstrap para el diseño responsive y PDO para la conexión a MySQL.

## Estructura
- `php/database.php` – Conexión a la base de datos (usa variables definidas en `.env`).
- `php/dashboard.php` – Pantalla principal con accesos a pagos y asistentes.
- `php/assistants.php` – Muestra asistentes registrados (ejemplo estático).
- `php/payments.php` – Listado de pagos (ejemplo estático).

## Uso rápido
1. Copia el contenido de `php/` a tu hosting en SiteGround.
2. Crea un archivo `.env` en la raíz con los datos de la base de datos:
   ```
   DB_HOST=localhost
   DB_USER=usuario
   DB_PASS=contraseña
   DB_NAME=investigaciones
   ```
3. Accede a `dashboard.php` desde el navegador para ver el panel inicial.

Este módulo es un punto de partida que puedes ampliar con lógica de negocio real para manejar investigadores, asistentes y pagos.
