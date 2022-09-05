
<?php

$server = 'DESKTOP-EQKVO3V\SQLEXPRESS';
$databaseName = "encuesta";
$uid = "amasa_consultas";
$pwd = "1234";

try {
    $conn = new PDO("sqlsrv:Server=$server;Database=$databaseName", $uid, $pwd);
    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
} catch (\Throwable $th) {
    die(print_r($th, true));
}


// $serverName = 'DESKTOP-EQKVO3V\SQLEXPRESS'; //serverName\instanceName

// // Puesto que no se han especificado UID ni PWD en el array  $connectionInfo,
// // La conexión se intentará utilizando la autenticación Windows.
// $connectionInfo = [
//     'Database' => 'encuesta',
//     'UID' => 'amasa_consultas',
//     'PWD' => '1234',
// ];
// $test = "Variable de prueba de otro archivo";

// $conn = sqlsrv_connect($serverName, $connectionInfo);

// if (!$conn) {
//     echo 'Conexión no se pudo establecer.<br />';
//     die(print_r(sqlsrv_errors(), true));
// }

?>
