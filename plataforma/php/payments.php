<?php
require_once 'database.php';

// Example placeholder payments; replace with DB data.
$payments = [
    ['mes' => 'Enero', 'monto' => 100],
    ['mes' => 'Febrero', 'monto' => 100]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pagos</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container my-4">
  <h1 class="mb-4">Registro de Pagos</h1>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Mes</th>
        <th>Monto</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($payments as $p): ?>
      <tr>
        <td><?php echo htmlspecialchars($p['mes']); ?></td>
        <td>$<?php echo number_format($p['monto'], 2); ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <a href="dashboard.php" class="btn btn-secondary">Volver</a>
</div>
</body>
</html>
