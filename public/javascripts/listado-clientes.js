$(function() {

  moment.locale("es");
  //Para mostrar mensajes al usuario
  function mensaje(mensaje,tipo){
    $("#mensaje").removeClass("alert-danger alert-success");
    $("#mensaje").addClass("alert-"+tipo);
    $("#mensaje").html(mensaje);
    $("#mensaje").fadeIn( 1500, "linear", function(){
      $("#mensaje").fadeOut(2000, "linear");
    });
  }

  $.ajax({
    type: "post",
    url: "/clientes/listar",
    dataType: "json",
    success: function(res) {
      if (!res.error){
        console.log(res.lista);

        var cols = [
          {
            "data": null,
            "render": function(client){
              return moment(client.creation_date).format("D MMM YYYY, HH:mm")
            }
          },
          { "data": null,
            "render": function (client) {
                return (client.last_name? " " + client.last_name : "") + " " + client.name;
            }
          },
          {"data":"email"},
          {"data":"phone_number"}
        ];

        $("#tbl-clientes").DataTable({
          "data": res.lista,
          "columns": cols,
          "language": {
            "url": "/javascripts/dataTables.Spanish.json"
          }
        });
      }
      else {
        mensaje("Lo sentimos, hubo un error.", "danger");
      }
    },
    error: function(err) {
      mensaje("Lo sentimos, hubo un error.", "danger");
    }
  });



});
