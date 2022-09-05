<?php
header('Access-Control-Allow-Origin: * ');
header(
    'Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin'
);
header('Access-Control-Allow-Methods: *');

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'login') {
        login($_POST['email'], $_POST['password']);
    }
}

function login($email, $password) {
    $hashPass = md5($password);
    include_once('database.php');
    $query = 'SELECT usuario_id FROM usuarios where email=? and password=? and deleted=1';

    $result = $conn->prepare($query);
    $result->execute(array($email, $hashPass));

    if ($result === false) {
        die(print_r($conn->errorInfo(), true));
    }

    $data = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($data, $row);
    }
    echo json_encode(array("status" => "ok", "data" => $data));
}
