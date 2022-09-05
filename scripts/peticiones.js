var clicPregunta = 0;

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

var obtenerPreguntas = () => {
  var data = {
    action: "obtenerPreguntas",
  };
  $.post("./api/preguntas.php", data, (response) => {
    var seccionCompleta = "";
    var cont = 1;
    var hidden = "hidden";
    JSON.parse(response).map((pregunta) => {
      if (cont == 1) hidden = "";
      else hidden = "hidden";
      // console.log();
      seccionCompleta += crearSeccionPregunta(pregunta, hidden);
      cont++;
    });
    var seccionTerminar = ` 
          <section class="h-100" hidden id="gracias">
            <header class="container h-100">
              <div class="d-flex align-items-center justify-content-center h-100">
                <div class="d-flex flex-column">
                  <!-- <ul class="list-group list-group-horizontal " > -->
                  <h2 class="mb-5">Muchas Gracias por tu opinión</h2>
                  <button
                    type="button"
                    onclick="continuar()"
                    class="btn btn-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </header>
          </section>
    `;

    seccionCompleta += seccionTerminar;
    document.getElementById("containerSecciones").innerHTML = seccionCompleta;
  });
};

obtenerPreguntas();

var agregarPregunta = (value) => {
  var pregunta = value.split(".")[0];
  var respuesta = value.split(".")[1];

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
  if (clicPregunta == 1) {
    document.getElementById("pregunta1").setAttribute("hidden", "");
    document.getElementById("pregunta2").removeAttribute("hidden");
  } else if (clicPregunta == 2) {
    document.getElementById("pregunta2").setAttribute("hidden", "");
    document.getElementById("pregunta3").removeAttribute("hidden");
  } else if (clicPregunta == 3) {
    document.getElementById("pregunta3").setAttribute("hidden", "");
    document.getElementById("pregunta4").removeAttribute("hidden");
  } else if (clicPregunta == 4) {
    document.getElementById("pregunta4").setAttribute("hidden", "");
    document.getElementById("pregunta5").removeAttribute("hidden");
  } else if (clicPregunta == 5) {
    document.getElementById("pregunta5").setAttribute("hidden", "");
    document.getElementById("gracias").removeAttribute("hidden");
  }
};

var continuar = () => {
  document.getElementById("gracias").setAttribute("hidden", "");
  document.getElementById("pregunta1").removeAttribute("hidden");
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
