<?php
// Simple database connection using PDO
$dotenv = parse_ini_file(__DIR__ . '/../.env');
$host = $dotenv['DB_HOST'] ?? 'localhost';
$user = $dotenv['DB_USER'] ?? 'root';
$pass = $dotenv['DB_PASS'] ?? '';
$name = $dotenv['DB_NAME'] ?? 'investigaciones';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>
