var obtenerPreguntas = () => {
  var encuesta_id = sessionStorage.getItem("encuesta_id");
  var encuesta_nombre = sessionStorage.getItem("encuesta_nombre");
  var data = {
    action: "obtenerPreguntasAdmin",
    encuesta_id,
  };
  $.post("./api/preguntas.php", data, (response) => {
    //   Date.prototype.addHours = function (h) {
    //     this.setTime(this.getTime() + h * 60 * 60 * 1000);
    //     return this;
    //   };
    var response = JSON.parse(response);
    if (response.status === "ok") {
      createTr(response.data, encuesta_nombre);
    } else {
      console.log("No se pudieron obtener las preguntas");
    }
  });
};

var showModalAgregar = () => {
  createModalAgregarPregunta();
  $("#modalAgregar").modal();
}

var createModalAgregarPregunta = () =>{
  var modal = `
        <div class="modal fade" role="dialog" id="modalAgregar">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Agregar Pregunta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <table class="table table-borderless " >
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="form-group row justify-content-center">
                                            <label for="txtDesc" class="col-sm-1-12 col-form-label">Descripción </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group row justify-content-center">
                                            <div class="col-sm-1-12">
                                                <textarea class="form-control"  id="txtDescAdd" name="txtDesc" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="agregarPregunta();">Agregar</button>
                </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalAgregarPregunta").innerHTML = modal;
}

var agregarPregunta = () => {
  var pregunta = document.getElementById("txtDescAdd").value;
  var encuesta_id = sessionStorage.getItem("encuesta_id"); 
  var data = {
    action:'agregarPregunta',
    pregunta,
    encuesta_id
  }

  if(pregunta !== ""){
    $.post('./api/preguntas.php', data, (response) => {
      response = JSON.parse(response);
      console.log(response);
      if(response.status === "ok"){
        window.location.reload();
      }else{
        console.log("No se pudo agregar la pregunta");
      }
    })
  }
}


var createTr = (data, encuesta_nombre) => {
  var tr = "";
  var cont = 1;
  data.map((pregunta) => {
    var { pregunta_id, pregunta_descripcion, created_at } = pregunta;
    tr += `
        <tr>
            <td scope="row">${cont}</td>
            <td>${pregunta_descripcion}</td>
            <td>${created_at}</td>
            <th>
                <i type="button" class="fa fa-edit mr-3" style="color:#AEB404;" onclick="showModalEditarPregunta('${pregunta_descripcion}','${pregunta_id}')"></i>
                <i type="button" class="fa fa-trash mr-3" style="color:red;" onclick="showModalEliminar('${pregunta_id}')"></i>
            </th>
        </tr>
    `;
    cont++;
  });
  document.getElementById(
    "nombreEncuesta"
  ).innerHTML = `<h3>${encuesta_nombre}</h3>`;
  document.getElementById("dataTr").innerHTML = tr;
};

var showModalEditarPregunta =(pregunta_descripcion, pregunta_id)=>{
  createModalEditarPregunta(pregunta_descripcion, pregunta_id);
  $("#modalEditar").modal();
}

var createModalEditarPregunta = (pregunta_descripcion, pregunta_id) => {
  var modal = `
        <div class="modal fade" role="dialog" id="modalEditar">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Editar Pregunta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <table class="table table-borderless " >
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="form-group row justify-content-center">
                                            <label for="txtDesc" class="col-sm-1-12 col-form-label">Descripción </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group row justify-content-center">
                                            <div class="col-sm-1-12">
                                                <textarea class="form-control"  id="txtDesc" name="txtDesc" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="actualizarPregunta(${pregunta_id});">Actualizar</button>
                </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalEditarPregunta").innerHTML = modal;
  document.getElementById("txtDesc").value = pregunta_descripcion;
  
}

var actualizarPregunta = (pregunta_id) => {
  var pregunta_descripcion = document.getElementById("txtDesc").value;
  var data = {
    action: "actualizarPregunta", 
    pregunta_id,
    pregunta_descripcion
  };

  if(pregunta_descripcion !== ""){
    $.post("./api/preguntas.php", data, (response) => {
      response = JSON.parse(response);
      if (response.status === "ok") {
        window.location.reload();
      }else{
        console.log("No se pudo actualizar la pregunta")
      }
    })
  }

}

var showModalEliminar = (pregunta_id) => {
  var modal = `
    <div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="fa fa-exclamation-triangle" style="color:red ;"></i> Eliminar Pregunta <i class="fa fa-exclamation-triangle" style="color:red ;"></i></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body row justify-content-center">
                        <h5>¿Seguro que desea eliminar la pregunta?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="eliminarPregunta('${pregunta_id}')"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalEliminarPregunta").innerHTML = modal;
  $("#modalEliminar").modal();
};



var eliminarPregunta = (pregunta_id) => {
  var data = {
    action: "eliminarPregunta", 
    pregunta_id
  }
  $.post("./api/preguntas.php", data, (response) => {
    var response = JSON.parse(response);
    if (response.status === "ok") {
      window.location.reload();
      // $("#modalEditar").modal("hide");
      // createTr(response.data);
    } else {
      console.log("No se pudo eliminar la pregunta");
    }
  });
} 


var validateSession = () => {
  //Is the user authenticated?
  // console.log("session => ", sessionStorage.getItem("AuthenticationState"))
  if (sessionStorage.getItem("AuthenticationState") === null) {
    window.open("./login.html", "_self");
  }
  //Is their authentication token still valid?
  // else if (
  //   Date.now > new Date(sessionStorage.getItem("AuthenticationExpires"))
  // ) {
  //   window.open("AccessDenied.html", "_self");
  // } else {
  //   //The user is authenticated and the authentication has not expired.
  // }
};
