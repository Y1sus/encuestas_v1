<?php

header('Access-Control-Allow-Origin: * ');
header(
    'Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin'
);
header('Access-Control-Allow-Methods: *');

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'agregarPregunta') {
        agregarPregunta($_POST['pregunta']);
    } else if ($_POST['action'] == 'obtenerPreguntas') {
        obtenerPreguntas();
    } else if ($_POST['action'] == 'responderPregunta') {
        responderPregunta($_POST['pregunta'], $_POST['respuesta']);
    } else if ($_POST['action'] == 'obtenerPreguntasAdmin') {
        obtenerPreguntasAdmin($_POST['encuesta_id']);
    }else if ($_POST['action'] == 'actualizarPregunta'){
        actualizarPregunta($_POST['pregunta_id'], $_POST['pregunta_descripcion']);
    }else if ($_POST['action'] == 'eliminarPregunta'){
        eliminarPregunta($_POST['pregunta_id']);
    } 
}

function agregarPregunta($pregunta) {
    include_once()
    echo json_encode(['message' => 'recibido', 'data' => $pregunta]);
}

function actualizarPregunta ($pregunta_id, $pregunta_descripcion){
    include_once('database.php');
    $query = 'UPDATE preguntas set pregunta_descripcion = ?, updated_at = GETDATE() where pregunta_id = ? and deleted=1';
    $result = sqlsrv_prepare($conn, $query, array($pregunta_descripcion, $pregunta_id));

    if (sqlsrv_execute($result) === false)
        die(print_r(sqlsrv_errors(), true));
    else    
        echo json_encode(array("status" => "ok", "message" => "Record Updated"));

    sqlsrv_close($conn);
}

function eliminarPregunta ($pregunta_id){
    include_once('database.php');
    $query = 'UPDATE preguntas set deleted = 0, deleted_at = GETDATE() where pregunta_id = ?';
    $result = sqlsrv_prepare($conn, $query, array($pregunta_id));

    if(sqlsrv_execute($result) === false)
        die(print_r(sqlsrv_errors(), true));
    else
        echo json_encode(array("status" => "ok", "message" => "Record Deleted"));

    sqlsrv_close($conn);
}

function responderPregunta($pregunta, $respuesta) {
    include_once('database.php');
    $query = 'INSERT into dbo.pregunta_valor(pregunta_id, valor_id) values (?,?)';
    $result = sqlsrv_prepare($conn, $query, array($pregunta, $respuesta));

    if (sqlsrv_execute($result) === false) {
        die(print_r(sqlsrv_errors(), true));
    } else {
        echo json_encode(array("status" => "ok", "message" => "Record Successfull"));
    }
    sqlsrv_close($conn);
}

function obtenerPreguntas() {
    include_once('database.php');
    $query = 'SELECT * FROM preguntas where deleted = 1';
    $result = sqlsrv_query($conn, $query);

    if ($result === false) {
        die(print_r(sqlsrv_errors(), true));
    }
    #Fetching Data by object
    $data = [];
    while ($row = sqlsrv_fetch_object($result)) {
        array_push($data, $row);
        // echo json_encode($row);
    }
    echo json_encode($data);

    sqlsrv_close($conn);
}

function obtenerPreguntasAdmin($encuesta_id) {
    include_once('database.php');
    $query = 'SELECT preguntas.* from encuesta_pregunta
            join encuestas on encuestas.encuesta_id = encuesta_pregunta.encuesta_id
            join preguntas on preguntas.pregunta_id = encuesta_pregunta.pregunta_id
            where encuestas.encuesta_id = ? and preguntas.deleted = 1';
    $result = sqlsrv_query($conn, $query, array($encuesta_id));

    if ($result === false) {
        die(print_r(sqlsrv_errors(), true));
    }
    #Fetching Data by object
    $data = [];
    while ($row = sqlsrv_fetch_object($result)) {
        array_push($data, $row);
        // echo json_encode($row);
    }
    echo json_encode(array("status" => "ok", "data" => $data));

    sqlsrv_close($conn);
}
