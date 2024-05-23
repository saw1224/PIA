$(document).ready(function() {
    console.log("hola desde jquery");
    $.ajax({
        url: 'http://localhost:8080/trabajadores', // URL de tu API
        method: 'GET', // Método HTTP para la petición
        dataType: 'json', // Tipo de datos que se espera recibir
        success: function(data) { // Función que se ejecuta si la petición es exitosa
            $('#departments-container').empty(); // Limpiar el contenedor

            data.forEach(function(trabajadores) { // Iterar sobre los datos recibidos
                let trabajadoresCard = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${trabajadores.nombre}</h5>
                                <h5 class="card-title">${trabajadores.apellidopaterno}</h5>
                                <h5 class="card-title">${trabajadores.apellidomaterno}</h5>
                                <p class="card-text">${trabajadores.descripcion}</p>
                            </div>
                        </div>
                    </div>
                `;
                $('#trabajadores-container').append(trabajadoresCard); // Añadir las tarjetas al contenedor
            });
        },
        error: function(error) { // Función que se ejecuta si hay un error en la petición
            console.error("Error al realizar la petición:", error);
        }
    });
});