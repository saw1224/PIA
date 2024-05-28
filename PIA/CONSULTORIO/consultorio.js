$(document).ready(function() {
    console.log("hola desde jquery");
    $.ajax({
        url: 'http://localhost:8080/Consultorio', // URL de tu API
        method: 'GET', // Método HTTP para la petición
        dataType: 'json', // Tipo de datos que se espera recibir
        success: function(data) { // Función que se ejecuta si la petición es exitosa
            $('#consultorio-container').empty(); // Limpiar el contenedor


            data.forEach(function(consultorio) { // Iterar sobre los datos recibidos
                let consultorioCard = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${consultorio.numeroConsultorio}</h5>
                                <h5 class="card-title">${consultorio.nombreDoctor}</h5>
                            </div>
                        </div>
                    </div>
                `;
                $('#consultorio-container').append(consultorioCard); // Añadir las tarjetas al contenedor
            });
        },
        error: function(error) { // Función que se ejecuta si hay un error en la petición
            console.error("Error al realizar la petición:", error);
        }
    });
});