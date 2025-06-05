<?php
require_once 'database.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard Investigaciones</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Investigaciones</a>
  </div>
</nav>
<div class="container my-4">
  <h1 class="mb-4">Panel Principal</h1>
  <div class="row g-4">
    <div class="col-md-6 col-lg-4">
      <a href="payments.php" class="text-decoration-none">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Pagos</h5>
            <p class="card-text">Gestiona los pagos de asistentes e investigadores.</p>
          </div>
        </div>
      </a>
    </div>
    <div class="col-md-6 col-lg-4">
      <a href="assistants.php" class="text-decoration-none">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Asistentes</h5>
            <p class="card-text">Registra y actualiza los asistentes por investigación.</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
