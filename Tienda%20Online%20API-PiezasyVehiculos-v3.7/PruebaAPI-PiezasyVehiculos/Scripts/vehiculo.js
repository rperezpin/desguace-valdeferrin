/******************* API CAT-e *******************/
var loader = 0;

$(function () {
    $.ajaxSetup({
        complete: function () { showloader(-1); }
    });
    ObtenerVehiculo();
});

function ObtenerVehiculo() {
    var id = $.url().param('id');
    var url = apiUrl + 'V1/Vehiculos/GetVehiculo/' + id;
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: url,
        crossDomain: true,
        beforeSend: setHeader,
        success: function (data) {
            if (data != null)
                PintarVehiculo(data);
        },
        error: function (jqXHR, textStatus, err) {
            alert("ERROR(1): " + err);
        }
    });
}

function setHeader(xhr) {
    showloader(1);
    xhr.setRequestHeader('Authorization', 'Basic ' + apiKey);
    xhr.withCredentials = true;
}

function showloader(cont) {
    loader = loader + cont;
    if (loader < 1)
        $('#loader').fadeOut("fast");
    else
        $('#loader').fadeIn("fast");
}

function PintarVehiculo(item) {
    var vehiculo = item.Marca
    if (item.Modelo != null) vehiculo += " " + item.Modelo;
    if (item.Version != null) vehiculo += " " + item.Version;
    $("#Vehiculo").text(vehiculo);
    $("#Motor").text(item.Motor != null ? item.Motor : "-");
    $("#FechaMatriculacion").text(item.FechaMatriculacion != null ? item.FechaMatriculacion : "-");
    $("#Kms").text(item.Kms != null ? item.Kms : "-");
    $("#Color").text(item.Color != null && item.Color != "" ? item.Color : "-");
    $("#Matricula").text(item.Matricula != "" ? item.Matricula : "-");
    $("#Bastidor").text(item.Bastidor != "" ? item.Bastidor : "-");
    $("#Combustible").text(item.Combustible != null && item.Combustible != "" ? item.Combustible : "-");
    $("#Carroceria").text(item.Carroceria != null && item.Carroceria != "" ? item.Carroceria : "-");
    $("#Estado").text(item.Estado != null ? item.Estado : "-");
    $("#Precio").text(item.Precio != null ? parseFloat(Math.round(item.Precio * 100) / 100).toFixed(2).toString().replace(".", ",") + " €" : "(Preguntar)");
    $("#IdVehiculo").text(item.IdVehiculo);
    $("#Observaciones").text(item.Observaciones != null ? item.Observaciones : "");
    if (item.Fotos != null)
        $.each(item.Fotos, function (key, foto) {
            $("<img>").attr("src", "data:image/png;base64," + foto).appendTo("#Fotos");
        });

}
