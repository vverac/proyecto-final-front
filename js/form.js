// capturamos por id submit el boton
const submit = document.querySelector('#submit');
//
const crear = async () => {
  // capturamos todos los valores que se escriben en los input
  let nombre = document.getElementById("nombre").value
  let rut = document.getElementById("rut").value
  let telefono = document.getElementById("telefono").value
  let direccion = document.getElementById("direccion").value
  let email = document.getElementById("email").value
  // document.getElementById("myForm").reset();

  // conectamos con el backend a traves de la url usando fetch
  // fetch significa" buscar" es  para hacer llamadas  simples en Js a una ApI
  fetch('http://localhost:8081/paciente', {
    // usamos metodo POST (que es para crear)
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // envio en formato json
    body: JSON.stringify({
      nombre: nombre,
      rut: rut,
      telefono: telefono,
      direccion: direccion,
      email: email

    })
    // comienzo de las validaciones
  }).then(function (res) {
    return res.text();

  }).then(function (data) {

    let response = {};

    try {
      response = JSON.parse(data);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ooops!',
      })
      return;
    }

    if (response.estado === 'ok') {

      document.getElementById("myForm").reset();

      /* Swal.fire({
         icon: 'success',
         title: '',
         html: response.mensaje
       })*/

      swal({
        title: "",
        text: response.mensaje,
        icon: "success",
      });

    } else if (response.estado === 'info') {
      /*Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: response.mensaje
      })*/

      swal({
        title: "",
        text: response.mensaje,
        icon: "error",
      });

    } else {
      /* Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: response.mensaje
       })*/

      swal({
        title: "",
        text: response.mensaje,
        icon: "error",
      });
    }

  }.bind(this));


}
//escucha click del boton y ejecuta funcion crear
submit.addEventListener('click', crear);