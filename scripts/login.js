function validateEmail(email) {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

var login = () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email !== "" && email !== null) {
    if (password !== "" && password !== null) {
      if (validateEmail(email)) {
        var data = {
          action: "login",
          email,
          password,
        };
        $.post("./api/login.php", data, (response) => {
          //   Date.prototype.addHours = function (h) {
          //     this.setTime(this.getTime() + h * 60 * 60 * 1000);
          //     return this;
          //   };

          var response = JSON.parse(response);
          console.log(response.data);
          if (response.status === "ok") {
            sessionStorage.setItem("AuthenticationState", "Authenticated");
            sessionStorage.setItem("usuario_id", response.data.usuario_id);
            // sessionStorage.setItem(
            //   "AutheticationExpires",
            //   Date.now.addHours(1)
            // );
            window.open("./index.html", "_self");
            // window.location.href = "http://localhost/encuesta/index.html";
            // console.log("Usted está logueado");
          } else {
            console.log("No se encuentra registrado");
          }
        });
      } else {
        document.getElementById(
          "emailMensaje"
        ).innerHTML = `<span>Ingese un email valido</span> `;
      }
    } else {
      document.getElementById(
        "passwordMensaje"
      ).innerHTML = `<span>Este campo no puede ir vacio</span> `;
    }
  } else {
    document.getElementById(
      "emailMensaje"
    ).innerHTML = `<span>Este campo no puede ir vacio</span> `;
  }
};

var logout = () => {
    sessionStorage.clear();
    window.location.href = "login.html";
};

var limpiarMensajeEmail = () => {
  const email = document.getElementById("emailMensaje");
  if (email.hasChildNodes()) email.removeChild(email.firstChild);
};
var limpiarMensajePassword = () => {
  const email = document.getElementById("passwordMensaje");
  if (email.hasChildNodes()) email.removeChild(email.firstChild);
};
