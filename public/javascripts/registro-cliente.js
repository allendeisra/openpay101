$(function() {
  //Muestra mensaje de confirmación o error
  function mensaje(mensaje,tipo){
    $("#mensaje").removeClass("alert-danger alert-success");
    $("#mensaje").addClass("alert-"+tipo);
    $("#mensaje").html(mensaje);
    $("#mensaje").fadeIn( 1500, "linear", function(){
      $("#mensaje").fadeOut(2000, "linear");
    });
  }
  $('body').on("blur", "input", function(){
    $(this).val($(this).val().trim()).trigger("change");
  });

  $('#frm-registro').on("submit", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var client = {
      "name": $("#name").val(),
      "last_name": $("#last_name").val(),
      "email": $("#email").val(),
      "phone_number":$("#phone_number").val(),
    }
    client.address = {
      "line1": $("#dir1").val(),
      "line2": $("#dir2").val(),
      "line3": $("#dir3").val(),
      "city": $("#city").val(),
      "state": $("#state").val(),
      "postal_code": $("#postal_code").val(),
      "country_code": 'MX'
    };
    client.email = client.email.toLowerCase();

    console.log(client);
    //Ajax con la magia para el registro
    $.ajax({
      type: "post",
      url: "/clientes/registrar",
      data: JSON.stringify(client),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(res) {
        if (!res.error){
          mensaje("Cliente registrado", "success");
          $('#frm-registro')[0].reset();
        }
        else {
          mensaje("Lo sentimos, hubo un error.", "danger");
        }
      },
      error: function(err) {
        mensaje("Lo sentimos, hubo un error.", "danger");
      }
    });
    return false;
  });

});
