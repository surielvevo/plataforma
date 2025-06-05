<?php
require_once 'database.php';

// Placeholder for retrieving assistants. Replace with actual DB queries.
$assistants = [
    ['name' => 'Ejemplo Uno', 'meses' => 4],
    ['name' => 'Ejemplo Dos', 'meses' => 8]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Asistentes</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container my-4">
  <h1 class="mb-4">Listado de Asistentes</h1>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Meses Asignados</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($assistants as $a): ?>
      <tr>
        <td><?php echo htmlspecialchars($a['name']); ?></td>
        <td><?php echo (int)$a['meses']; ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <a href="dashboard.php" class="btn btn-secondary">Volver</a>
</div>
</body>
</html>
