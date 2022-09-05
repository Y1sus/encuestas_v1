var clicPregunta = 0;
var cantidadPreguntas = 0;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encuesta_id = urlParams.get("encuesta_id");
const usuario_id = urlParams.get("usuario_id");

var preguntas = [];

// console.log("usuario_id : ", usuario_id, " encuesta_id : ", encuesta_id);

// var obtenerPreguntas = () => {
//   console.log("encuesta => ",encuesta_id)

//   data = {
//     action: "obtenerPreguntas",
//     encuesta_id:encuesta_id,
//   };
//   $.post("./api/preguntas.php", data, (response) => {
//     //   Date.prototype.addHours = function (h) {
//     //     this.setTime(this.getTime() + h * 60 * 60 * 1000);
//     //     return this;
//     //   };
//     var response = JSON.parse(response);
//     if (response.status === "ok") {
//       console.log(response.data)
//       // createTr(response.data, encuesta_nombre);
//     } else {
//       console.log("No se pudieron obtener las preguntas");
//     }
//   });
// };

var crearSeccionPregunta = (preguntaObj, hidden) => {
  var { pregunta_id, pregunta_descripcion } = preguntaObj;
  // hidden = false;
  var seccionCompleta = `
    <section class="" ${hidden} id="pregunta${pregunta_id}">
        <img class="logoAmasa" src="images/LOGO_AMASA.png" alt="" />
        <header class="container">
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column">
              <b style="font-size: 17px">${pregunta_descripcion} </b>
              <div class="alinearHorizontal">
                <button
                  class="list-group-item"
                  value="${pregunta_id}.6"
                  onclick="agregarPregunta(this.value);"
                  style="border: 0"
                >
                  <img
                    src="images/happy.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value);" class="list-group-item" value="${pregunta_id}.5" style="border: 0">
                  <img
                    src="images/middlehappy.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value);" class="list-group-item" value="${pregunta_id}.3" style="border: 0">
                  <img
                    src="images/indiferente.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value);" class="list-group-item" value="${pregunta_id}.1" style="border: 0">
                  <img
                    src="images/triste.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value);" class="list-group-item" value="${pregunta_id}.4" style="border: 0">
                  <img
                    src="images/enojado.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
              </div>
              <em
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                assumenda adipisci harum iure, animi repellendus accusantium
                saepe, repudiandae itaque qui error necessitatibus dignissimos
                expedita, voluptatum fugit sint tempora cupiditate quis!</em
              >
            </div>
          </div>
        </header>
      </section>`;

  return seccionCompleta;
};

var obtenerPreguntas = async () => {
  var data = {
    action: "obtenerPreguntas",
    encuesta_id,
  };
  await $.post("./api/preguntas.php", data, (response) => {
    response = JSON.parse(response);
    if (response.status === "ok") {
      cantidadPreguntas = response.data.length;
      if(cantidadPreguntas > 0){
        console.log(cantidadPreguntas)
        preguntas = response.data;
        crearPregunta();
      }else{
        crearNoHayPreguntas();
      }
      //   response.data.map((pregunta) => {
      //     if (cont == 1) hidden = "";
      //     else hidden = "hidden";
      //     // console.log();
      //     seccionCompleta += crearSeccionPregunta(pregunta, hidden);
      //     cont++;
      //   });
      //   var seccionTerminar = `
      //       <section class="h-100" hidden id="gracias">
      //         <header class="container h-100">
      //           <div class="d-flex align-items-center justify-content-center h-100">
      //             <div class="d-flex flex-column">
      //               <!-- <ul class="list-group list-group-horizontal " > -->
      //               <h2 class="mb-5">Muchas Gracias por tu opinión</h2>
      //               <button
      //                 type="button"
      //                 onclick="continuar()"
      //                 class="btn btn-primary"
      //               >
      //                 Continuar
      //               </button>
      //             </div>
      //           </div>
      //         </header>
      //       </section>
      // `;

      //   seccionCompleta += seccionTerminar;
      //   document.getElementById("containerSecciones").innerHTML = seccionCompleta;
    }
  });
};
obtenerPreguntas();

var crearPregunta = () => {
  var seccionCompleta = `
    <section class="" id="${preguntas[clicPregunta].pregunta_id}">
        <img class="logoAmasa" src="images/LOGO_AMASA.png" alt="" />
        <header class="container">
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column">
              <b style="font-size: 17px">${preguntas[clicPregunta].pregunta_descripcion} </b>
              <div class="alinearHorizontal">
                <button
                  class="list-group-item"
                  value="6"
                  onclick="agregarPregunta(this.value, '${preguntas[clicPregunta].pregunta_id}');"
                  style="border: 0"
                >
                  <img
                    src="images/happy.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value, '${preguntas[clicPregunta].pregunta_id}');" class="list-group-item" value="5" style="border: 0">
                  <img
                    src="images/middlehappy.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value, '${preguntas[clicPregunta].pregunta_id}');" class="list-group-item" value="3" style="border: 0">
                  <img
                    src="images/indiferente.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value, '${preguntas[clicPregunta].pregunta_id}');" class="list-group-item" value="1" style="border: 0">
                  <img
                    src="images/triste.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
                <button onclick="agregarPregunta(this.value, '${preguntas[clicPregunta].pregunta_id}');" class="list-group-item" value="4" style="border: 0">
                  <img
                    src="images/enojado.png"
                    width="160px"
                    class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </button>
              </div>
              <em
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                assumenda adipisci harum iure, animi repellendus accusantium
                saepe, repudiandae itaque qui error necessitatibus dignissimos
                expedita, voluptatum fugit sint tempora cupiditate quis!</em
              >
            </div>
          </div>
        </header>
      </section>`;
  document.getElementById("containerSecciones").innerHTML = seccionCompleta;
};

var agregarPregunta = (respuesta, pregunta) => {
  var data = {
    action: "responderPregunta",
    pregunta,
    respuesta,
  };
  $.post("./api/preguntas.php", data, (response) => {
    // console.log(response);
  });

  // pasar a la siguiente pregunta
  nextQuestion();

};

var nextQuestion = () => {
  clicPregunta++;
  if (clicPregunta < cantidadPreguntas) {
    crearPregunta();
  } else {
    continuar();
  }
};


var crearNoHayPreguntas = () =>{
  var seccionTerminar = ` 
    <img class="logoAmasa" src="images/LOGO_AMASA.png" alt="" />
      <section class="h-100" id="gracias">
        <header class="container h-100">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="d-flex flex-column">
              <!-- <ul class="list-group list-group-horizontal " > -->
              <h2 class="mb-5">No hay preguntas para esta encuesta</h2>
              <h3 class="mb-5">Póngase en contacto con el administrador</h3>
              <h3 class="mb-5" style='text-align:center;'>Gracias</h3>
            </div>
          </div>
        </header>
      </section>
    `;
  document.getElementById("containerSecciones").innerHTML = seccionTerminar;
  // document.getElementById("gracias").setAttribute("hidden", "");
  // document.getElementById("pregunta1").removeAttribute("hidden");
  clicPregunta = 0;
}
var continuar = () => {
  var seccionTerminar = ` 
      <img class="logoAmasa" src="images/LOGO_AMASA.png" alt="" />
      <section class="h-100" id="gracias">
        <header class="container h-100">
          <div class="d-flex align-items-center justify-content-center h-100">
            <div class="d-flex flex-column">
              <!-- <ul class="list-group list-group-horizontal " > -->
              <h2 class="mb-5">Muchas Gracias por tu opinión</h2>
              <button
                type="button"
                onclick="crearPregunta()"
                class="btn btn-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        </header>
      </section>
    `;
  document.getElementById("containerSecciones").innerHTML = seccionTerminar;
  clicPregunta = 0;
};

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
