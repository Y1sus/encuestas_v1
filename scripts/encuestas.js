var showModalEditar = (encuesta_id, nombre_encuesta, descripcion_encuesta) => {
  createModalEditarEncuesta(encuesta_id, nombre_encuesta, descripcion_encuesta);
  $("#modalEditar").modal();
};

var createModalEditarEncuesta = (
  encuesta_id,
  nombre_encuesta,
  descripcion_encuesta
) => {
  var modal = `
        <div class="modal fade" role="dialog" id="modalEditar">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Detalles Encuesta</h5>
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
                                            <label for="txtNombre" class="col-sm-1-12 col-form-label">Nombre</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="form-group row justify-content-center" >
                                            <div class="col-sm-1-12">
                                                <input type="text" value="${nombre_encuesta}" class="form-control" name="txtNombre" id="txtNombre" placeholder=""/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
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
                    <button type="button" class="btn btn-primary" onclick="actualizarEncuesta(${encuesta_id});">Actualizar</button>
                </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalEditarEncuesta").innerHTML = modal;
  document.getElementById("txtDesc").value = descripcion_encuesta;
};

var showModalAgregarEncuesta = () => {
  createModalAgregarEncuesta();
  $("#modalAgregar").modal();
};

var createModalAgregarEncuesta = () => {
  var modal = `
        <div class="modal fade" role="dialog" id="modalAgregar">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Agregar Encuesta</h5>
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
                                        <label for="txtDesc" class="col-sm-1-12 col-form-label">Nombre: </label>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group row justify-content-center">
                                        <div class="col-sm-1-12">
                                            <input class="form-control"  id="txtNombreAdd" name="txtDesc" rows="3"></input>
                                        </div>
                                    </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                    <div class="form-group row justify-content-center">
                                        <label for="txtDesc" class="col-sm-1-12 col-form-label">Descripción: </label>
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
                    <button type="button" class="btn btn-primary" onclick="agregarEncuesta();">Agregar</button>
                </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalAgregarEncuesta").innerHTML = modal;
};

var agregarEncuesta = () => {
  var usuario_id = sessionStorage.getItem("usuario_id");
  var nombre_encuesta = document.getElementById("txtNombreAdd").value;
  var descripcion_encuesta = document.getElementById("txtDescAdd").value;

  var data = {
    action: "agregarEncuesta",
    usuario_id,
    nombre_encuesta,
    descripcion_encuesta,
  };

  if (usuario_id !== null) {
    if (nombre_encuesta !== "" && descripcion_encuesta !== "") {
      $.post("./api/encuestas.php", data, (response) => {
        response = JSON.parse(response);
        if (response.status == "ok") {
          window.location.reload();
        }
      });
    }
  }
};

var obtenerEncuestas = () => {
  var usuario_id = sessionStorage.getItem("usuario_id");
  var data = {
    action: "obtenerEncuestas",
    usuario_id,
  };
  $.post("./api/encuestas.php", data, (response) => {
    //   Date.prototype.addHours = function (h) {
    //     this.setTime(this.getTime() + h * 60 * 60 * 1000);
    //     return this;
    //   };

    var response = JSON.parse(response);
    if (response.status === "ok") {
      createTr(response.data);
    } else {
      console.log("No se pudieron obtener las encuestas");
    }
  });
};

var createTr = (data) => {
  var tr = "";
  data.map((encuesta) => {
    var { encuesta_id, nombre_encuesta, descripcion_encuesta, created_at } =
      encuesta;
    tr += `
        <tr>
            <td scope="row">${encuesta_id}</td>
            <td>${nombre_encuesta}</td>
            <td>${created_at}</td>
            <th>
                <i type="button" class="fa fa-edit mr-3" style="color:#AEB404;" onclick="showModalEditar('${encuesta_id}', '${nombre_encuesta}', '${descripcion_encuesta}')"></i>
                <i type="button" class="fa fa-trash mr-3" style="color:red;" onclick="showModalEliminar('${encuesta_id}')"></i>
                <i type="button" class="fa fa-share mr-3" onclick="copiarEnlace('${encuesta_id}');" style="color:blue;" ></i>
                <i type="button" class="fa fa-eye" onclick="mostrarDetallesEncuesta('${encuesta_id}', '${nombre_encuesta}')"></i>
            </th>
        </tr>
    `;
  });

  document.getElementById("dataTr").innerHTML = tr;
};

var actualizarEncuesta = (encuesta_id) => {
  var nombre_encuesta = document.getElementById("txtNombre").value;
  var descripcion_encuesta = document.getElementById("txtDesc").value;
  var data = {
    action: "actualizarEncuesta",
    encuesta_id,
    nombre_encuesta,
    descripcion_encuesta,
  };
  if (nombre_encuesta !== "" && descripcion_encuesta !== "") {
    $.post("./api/encuestas.php", data, (response) => {
      var response = JSON.parse(response);
      if (response.status === "ok") {
        window.location.reload();
        // $("#modalEditar").modal("hide");
        // createTr(response.data);
      } else {
        console.log("No se pudieron obtener las encuestas");
      }
    });
  }
};

var showModalEliminar = (encuesta_id) => {
  var modal = `
    <div class="modal fade" id="modalEliminar" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><i class="fa fa-exclamation-triangle" style="color:red ;"></i> Eliminar Encuesta <i class="fa fa-exclamation-triangle" style="color:red ;"></i></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body row justify-content-center">
                        <h5>¿Seguro que desea eliminar la encuesta?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="eliminarEncuesta('${encuesta_id}')"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.getElementById("modalEliminarEncuesta").innerHTML = modal;
  $("#modalEliminar").modal();
};

var eliminarEncuesta = (encuesta_id) => {
  var data = {
    action: "eliminarEncuesta",
    encuesta_id,
  };
  $.post("./api/encuestas.php", data, (response) => {
    var response = JSON.parse(response);
    if (response.status === "ok") {
      window.location.reload();
      // $("#modalEditar").modal("hide");
      // createTr(response.data);
    } else {
      console.log("No se pudieron obtener las encuestas");
    }
  });
};

var mostrarDetallesEncuesta = (encuesta_id, encuesta_nombre) => {
  sessionStorage.setItem("encuesta_id", encuesta_id);
  sessionStorage.setItem("encuesta_nombre", encuesta_nombre);
  window.location.href = "adminpreguntas.html";
};

var copiarEnlace = (encuesta_id) => {
  var url = 'http://localhost/encuesta/encuesta.html?encuesta_id='+ encuesta_id + '&usuario_id=' + sessionStorage.getItem('usuario_id');
  var aux = document.createElement("input");
  aux.setAttribute("value", url);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  alert('Link copiado al portapapeles');
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
