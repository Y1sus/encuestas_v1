<?php

header('Access-Control-Allow-Origin: * ');
header(
    'Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin'
);
header('Access-Control-Allow-Methods: *');

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'agregarPregunta') {
        agregarPregunta($_POST['pregunta'], $_POST['encuesta_id']);
    } else if ($_POST['action'] == 'obtenerPreguntas') {
        obtenerPreguntas($_POST['encuesta_id']);
    } else if ($_POST['action'] == 'responderPregunta') {
        responderPregunta($_POST['pregunta'], $_POST['respuesta']);
    } else if ($_POST['action'] == 'obtenerPreguntasAdmin') {
        obtenerPreguntasAdmin($_POST['encuesta_id']);
    } else if ($_POST['action'] == 'actualizarPregunta') {
        actualizarPregunta($_POST['pregunta_id'], $_POST['pregunta_descripcion']);
    } else if ($_POST['action'] == 'eliminarPregunta') {
        eliminarPregunta($_POST['pregunta_id']);
    }
}

function agregarPregunta($pregunta, $encuesta_id) {
    include_once('database.php');
    $query = 'INSERT into preguntas (pregunta_descripcion) values (?)';
    $stm = $conn->prepare($query);
    $stm->execute(array($pregunta));
    $lastIdPregunta = $conn->lastInsertId();
    // $res = $stm->rowCount();
    if ($stm) {
        $query = 'INSERT into encuesta_pregunta (encuesta_id, pregunta_id) values (?,?)';
        $stm = $conn->prepare($query)->execute(array($encuesta_id, $lastIdPregunta));
        if ($stm) {
            echo json_encode(array("status" => "ok", "message" => "Record Successfull"));
        } else {
            echo json_encode(array("status" => "fail", "message" => "No se pudo guardar la pregunta"));
        }
    } else {
        echo json_encode(array("status" => "fail", "message" => "No se pudo guardar la pregunta"));
    }
}

function actualizarPregunta($pregunta_id, $pregunta_descripcion) {
    include_once('database.php');
    $query = 'UPDATE preguntas set pregunta_descripcion = ?, updated_at = GETDATE() where pregunta_id = ? and deleted=1';
    $result = $conn->prepare($query)->execute(array($pregunta_descripcion, $pregunta_id));

    if ($result === false)
        die(print_r($conn->errorInfo(), true));
    else
        echo json_encode(array("status" => "ok", "message" => "Record Updated"));
}

function eliminarPregunta($pregunta_id) {
    include_once('database.php');
    $query = 'UPDATE preguntas set deleted = 0, deleted_at = GETDATE() where pregunta_id = ?';
    $result = $conn->prepare($query)->execute(array($pregunta_id));

    if ($result === false)
        die(print_r($conn->errorInfo(), true));
    else
        echo json_encode(array("status" => "ok", "message" => "Record Deleted"));
}

function responderPregunta($pregunta, $respuesta) {
    include_once('database.php');
    $query = 'INSERT into dbo.pregunta_valor(pregunta_id, valor_id) values (?,?)';
    $result = $conn->prepare($query);
    $result->execute(array($pregunta, $respuesta));

    if ($result === false) {
        die(print_r($conn->errorInfo(), true));
    } else {
        echo json_encode(array("status" => "ok", "message" => "Record Successfull"));
    }
}

function obtenerPreguntas($encuesta_id) {
    include_once('database.php');
    $query = 'SELECT preguntas.* from encuesta_pregunta
            join encuestas on encuestas.encuesta_id = encuesta_pregunta.encuesta_id
            join preguntas on preguntas.pregunta_id = encuesta_pregunta.pregunta_id
            where encuestas.encuesta_id = ? and preguntas.deleted = 1';
    $result = $conn->prepare($query);
    $result->execute(array($encuesta_id));

    $data = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($data, $row);
        // echo json_encode($row);
    }
    echo json_encode(array("status" => "ok", "data" => $data));
}

function obtenerPreguntasAdmin($encuesta_id) {
    include_once('database.php');
    $query = 'SELECT preguntas.* from encuesta_pregunta
            join encuestas on encuestas.encuesta_id = encuesta_pregunta.encuesta_id
            join preguntas on preguntas.pregunta_id = encuesta_pregunta.pregunta_id
            where encuestas.encuesta_id = ? and preguntas.deleted = 1';
    $result = $conn->prepare($query);
    $result->execute(array($encuesta_id));
    if ($result) {
        #Fetching Data by object
        $data = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
            // echo json_encode($row);
        }
        echo json_encode(array("status" => "ok", "data" => $data));
    }
}
