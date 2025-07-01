<?php
// 🔍 Test endpoint para diagnosticar problemas con Resend
// URL: /api/test-resend.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Información de diagnóstico
$diagnostico = [
    'timestamp' => date('c'),
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'unknown',
        'server_name' => $_SERVER['SERVER_NAME'] ?? 'unknown'
    ],
    'curl_available' => function_exists('curl_init'),
    'json_available' => function_exists('json_encode'),
    'file_permissions' => is_writable('.') ? 'writable' : 'readonly'
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Test básico de conectividad
    echo json_encode([
        'status' => 'success',
        'message' => '✅ PHP endpoint funcionando correctamente',
        'diagnostico' => $diagnostico
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Test de llamada a Resend API
        $RESEND_API_KEY = 're_JKNs7iyA_PyFAaLEAFZXBRR7ttTttQFPs';
        $RESEND_ENDPOINT = 'https://api.resend.com/emails';
        
        // Test payload mínimo
        $test_payload = [
            'from' => 'CEP Formación <noreply@cepcomunicacion.com>',
            'to' => ['agency.solaria@gmail.com'],
            'subject' => '🔍 TEST RESEND API - ' . date('H:i:s'),
            'html' => '<p>Test de conectividad Resend API desde endpoint PHP</p><p>Timestamp: ' . date('c') . '</p>'
        ];
        
        // Configurar cURL
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $RESEND_ENDPOINT,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($test_payload),
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $RESEND_API_KEY,
                'Content-Type: application/json'
            ],
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_VERBOSE => false
        ]);
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curl_error = curl_error($ch);
        $curl_info = curl_getinfo($ch);
        curl_close($ch);
        
        $response_data = json_decode($response, true);
        
        if ($curl_error) {
            throw new Exception('cURL Error: ' . $curl_error);
        }
        
        echo json_encode([
            'status' => $http_code >= 200 && $http_code < 300 ? 'success' : 'error',
            'message' => $http_code >= 200 && $http_code < 300 ? '✅ Resend API funcionando' : '❌ Resend API falló',
            'diagnostico' => $diagnostico,
            'resend_test' => [
                'http_code' => $http_code,
                'response' => $response_data,
                'curl_info' => [
                    'url' => $curl_info['url'],
                    'content_type' => $curl_info['content_type'],
                    'total_time' => $curl_info['total_time']
                ]
            ]
        ]);
        
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => '❌ Error en test: ' . $e->getMessage(),
            'diagnostico' => $diagnostico
        ]);
    }
    exit;
}

// Método no permitido
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?> 