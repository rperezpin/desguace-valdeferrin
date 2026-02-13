/******************* API CAT-e *******************/
var loader = 0;

$(function () {
    $.ajaxSetup({
        complete: function () { showloader(-1); }
    });
    ObtenerPieza();
});

function ObtenerPieza() {
    var id = $.url().param('id');
    var url = apiUrl + 'V1/Busqueda/GetPieza/' + id;
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: url,
        crossDomain: true,
        beforeSend: setHeader,
        success: function (data) {
            if (data != null)
                PintarPieza(data);
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

function PintarPieza(item) {
    var vehiculo = item.Marca
    if (item.Modelo != null) vehiculo += " " + item.Modelo;
    if (item.Version != null) vehiculo += " " + item.Version;
    $("#Vehiculo").text(vehiculo);
    $("#Motor").text(item.Motor);
    $("#Anio").text(item.Anio);
    $("#Kms").text(item.Kms != 0 ? item.Kms : "-");
    $("#Color").text(item.Color != "" ? item.Color : "-");
    $("#Descripcion").text(item.Pieza);
    $("#Fabricante").text(item.Fabricante != "" ? item.Fabricante : "-");
    $("#ReferenciaOEM").text(item.ReferenciaOEM != "" ? item.ReferenciaOEM : "-");
    $("#ReferenciaIAM").text(item.ReferenciaIAM != "" ? item.ReferenciaIAM : "-");
    $("#Cantidad").text(item.Cantidad != "" ? item.Cantidad : "-");
    $("#Garantia").text(item.Garantia != "" ? item.Garantia : "-");
    $("#EstadoFisico").text(item.EstadoFisico != "" ? item.EstadoFisico : "-");
    $("#Importe").text(item.Importe != "" ? item.Importe : "(Preguntar)");
    $("#ImporteIVA").text(item.ImporteIVA != "" ? item.ImporteIVA : "(Preguntar)");
    $("#IdPiezaAlmacen").text( item.IdPiezaAlmacen );
    $("#Observaciones").html( item.Observaciones );
    if (item.Peso != null) {
        if (item.Observaciones != "")
            $("#Observaciones").html($("#Observaciones").html() + "<br />")
        $("#Observaciones").html($("#Observaciones").html() + "Peso: " + item.Peso + " kg.");
    }
    if (item.Fotos != null)
        $.each(item.Fotos, function (key, foto) {
            $("<img>").attr("src", "data:image/png;base64," + foto).appendTo("#Fotos");
        });

}
