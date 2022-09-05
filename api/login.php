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
    $params = array($email, $hashPass);
    $options =  array("Scrollable" => SQLSRV_CURSOR_KEYSET);
    $result = sqlsrv_query($conn, $query, $params, $options);

    $usuario = sqlsrv_num_rows($result);

    $row = sqlsrv_fetch_object($result);
    

    if ($usuario === false) {
        die(print_r(sqlsrv_errors(), true));
    } else {
        if ($usuario > 0)
            echo json_encode(array("status" => "ok", "data" => $row));
        else
            echo json_encode(array("status" => "fail", "message" => "No se encuentra el usuario"));
    }
    sqlsrv_close($conn);
}
