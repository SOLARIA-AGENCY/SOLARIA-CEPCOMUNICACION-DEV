<?php
// 📧 Endpoint Resend para CEP Formación - Hostinger Compatible
// Fecha: Julio 2025
// Función: Envío de emails vía Resend API desde backend PHP

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Configuración Resend
$RESEND_API_KEY = 're_JKNs7iyA_PyFAaLEAFZXBRR7ttTttQFPs';
$RESEND_ENDPOINT = 'https://api.resend.com/emails';

try {
    // Leer datos del POST
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // Validar campos requeridos
    $required_fields = ['to', 'subject', 'html'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // Preparar payload para Resend
    $email_payload = [
        'from' => $data['from'] ?? 'CEP Formación <noreply@cepcomunicacion.com>',
        'to' => $data['to'],
        'subject' => $data['subject'],
        'html' => $data['html']
    ];
    
    // Log para debugging
    error_log('📧 Resend API Call - Subject: ' . $data['subject']);
    
    // Configurar cURL para Resend API
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $RESEND_ENDPOINT,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($email_payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $RESEND_API_KEY,
            'Content-Type: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception('cURL error: ' . $error);
    }
    
    $response_data = json_decode($response, true);
    
    if ($http_code >= 200 && $http_code < 300) {
        // Éxito
        error_log('✅ Resend API Success - ID: ' . ($response_data['id'] ?? 'unknown'));
        
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully via Resend',
            'provider' => 'resend',
            'id' => $response_data['id'] ?? null,
            'timestamp' => date('c')
        ]);
    } else {
        // Error de Resend API
        throw new Exception('Resend API error: ' . ($response_data['message'] ?? 'Unknown error') . ' (HTTP ' . $http_code . ')');
    }
    
} catch (Exception $e) {
    error_log('❌ Resend API Error: ' . $e->getMessage());
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'provider' => 'resend',
        'timestamp' => date('c')
    ]);
}
?> 