// esta funcion al recargar la pagina llama la funcion cargarUsuarios()
//y muestra la tabla de registro
$(document).ready(function () {
  cargarUsuarios();
});

// funcion que se conecta al backend y muestra el registro de usuario que esta en la base de datos
function cargarUsuarios() {
  var requestOptions = {
    method: 'GET'
  };
  // conectamos con el backend a traves de la url usando fetch
  // fetch significa" buscar" es  para hacer llamadas  simples en Js a una ApI
  fetch("http://localhost:8081/paciente/",
    requestOptions
  ).then(function (res) {
    return res.text();
  }).then(function (data) {

    let response = {};

    try {
      response = JSON.parse(data);
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Oooops!'
      })
      return;
    }
    // estamos creando la tabla de registro de pacientes
    let listadoHtml = ''

    for (let usuario of response) {
      let botonEliminar = "<a href=\"#\" onclick='eliminarUsuario(" + JSON.stringify(usuario) + ")' class=\"btn btn-danger btn-circle btn-sm\"><i class=\"fas fa-trash\"></i></a>";

      let usuarioHtml = '  <tr><td>' + usuario.nombre + '</td><td>' + usuario.rut + '</td><td>'
        + usuario.direccion + '</td><td>' + usuario.telefono + '</td><td>' + usuario.email + '</td><td>' + botonEliminar + '</td></tr>'

      listadoHtml += usuarioHtml
    }
    document.querySelector("#usuarios tbody").outerHTML = listadoHtml;

  }.bind(this));
}


// funcion eliminar usando el id donde se clickea en el boton de la tabla
function eliminarUsuario(usuario) {
  Swal.fire({
    title: 'Estas seguro que desea eliminar al pendejo (' + usuario.nombre + ')?',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var requestOptions = {
        method: 'DELETE'
      };

      fetch("http://localhost:8081/paciente/" + usuario.id,
        requestOptions
        // 
      ).then(function (res) {
        return res.text();
        // 
      }).then(function (data) {

        let response = {};

        try {
          response = JSON.parse(data);
        } catch (e) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ooops!'
          })
          return;
        }

        if (response.estado === 'ok') {

          cargarUsuarios();

          Swal.fire({
            icon: 'success',
            title: '',
            html: response.mensaje
          })

        } else {

          var mensaje = "Error en la solicitud, intente mas tarde.";

          if (response.mensaje) mensaje = response.mensaje;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje
          })
        }

      }.bind(this));

    } else if (result.isDenied) {

      Swal.fire('Changes are not saved', '', 'info')

    }
  })

}