<?php
header('Access-Control-Allow-Origin: * ');
header(
    'Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin'
);
header('Access-Control-Allow-Methods: *');

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'agregarEncuesta') {
        agregarEncuesta($_POST['nombre_encuesta'], $_POST['descripcion_encuesta'], $_POST['usuario_id']);
    } else if ($_POST['action'] == 'obtenerEncuestas') {
        obtenerEncuestas($_POST['usuario_id']);
    } else if ($_POST['action'] == 'actualizarEncuesta') {
        actualizarEncuesta($_POST['encuesta_id'], $_POST['nombre_encuesta'], $_POST['descripcion_encuesta']);
    } else if ($_POST['action'] == 'eliminarEncuesta') {
        eliminarEncuesta($_POST['encuesta_id']);
    }
}

function agregarEncuesta($nombre_encuesta, $descripcion_encuesta, $usuario_id) {
    include_once('database.php');
    $query = 'INSERT into encuestas (nombre_encuesta, descripcion_encuesta) values (?,?)';
    $result = $conn->prepare($query)->execute(array($nombre_encuesta, $descripcion_encuesta));


    if ($result == false) {
        die(print_r($conn->errorInfo(), true));
    }
    $lastId = $conn->lastInsertId();

    $query = 'INSERT into usuario_encuesta (usuario_id, encuesta_id) values (?,?)';
    $res = $conn->prepare($query)->execute(array($usuario_id, $lastId));
    if ($res == false) {
        die(print_r($conn->errorInfo(), true));
    }

    echo json_encode(array("status" => "ok", "message" => "Record Successfull"));
}

function obtenerEncuestas($usuario_id) {

    include_once('database.php');
    $query = 'SELECT encuestas.encuesta_id, encuestas.nombre_encuesta, encuestas.descripcion_encuesta,encuestas.created_at from usuario_encuesta
                join encuestas on encuestas.encuesta_id = usuario_encuesta.encuesta_id
                join usuarios on usuarios.usuario_id = usuario_encuesta.usuario_id
                where usuarios.usuario_id =? and encuestas.deleted=1';

    $result = $conn->prepare($query);
    $result->execute(array($usuario_id));

    if ($result === false) {
        die(print_r($conn->errorInfo(), true));
    }
    #Fetching Data by object
    $data = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($data, $row);
    }
    echo json_encode(array("status" => "ok", "data" => $data));
}

function actualizarEncuesta($encuesta_id, $nombre_encuesta, $descripcion_encuesta) {
    include_once('database.php');
    $query = 'UPDATE encuestas set nombre_encuesta=?,descripcion_encuesta=?, updated_at = getdate() 
                where encuestas.encuesta_id =? and encuestas.deleted=1';

    $result = $conn->prepare($query)->execute(array($nombre_encuesta, $descripcion_encuesta, $encuesta_id));

    if ($result === false) {
        die(print_r($conn->errorInfo(), true));
    }
    #Fetching Data by object
    echo json_encode(array("status" => "ok", "Message" => "Encuesta Actualizada"));
}

function eliminarEncuesta($encuesta_id) {
    include_once('database.php');
    $query = 'UPDATE encuestas set deleted=0, deleted_at = getdate() 
                where encuestas.encuesta_id = ?';

    $result = $conn->prepare($query)->execute(array($encuesta_id));

    if ($result === false) {
        die(print_r($conn->errorInfo(), true));
    }
    #Fetching Data by object
    echo json_encode(array("status" => "ok", "Message" => "Encuesta Eliminada"));
}
