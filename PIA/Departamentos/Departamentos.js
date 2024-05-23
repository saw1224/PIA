$(document).ready(function() {
        console.log("hola desde jquery");
        $.ajax({
            url: 'http://localhost:8080/Departamento', // URL de tu API
            method: 'GET', // Método HTTP para la petición
            dataType: 'json', // Tipo de datos que se espera recibir
            success: function(data) { // Función que se ejecuta si la petición es exitosa
                $('#departments-container').empty(); // Limpiar el contenedor
    
                data.forEach(function(departamento) { // Iterar sobre los datos recibidos
                    let departmentCard = `
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${departamento.imagen}" class="card-img-top card-img-small" alt="${departamento.nombre}">
                                <div class="card-body">
                                    <h5 class="card-title">${departamento.nombre}</h5>
                                    <p class="card-text">${departamento.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#departments-container').append(departmentCard); // Añadir las tarjetas al contenedor
                });
            },
            error: function(error) { // Función que se ejecuta si hay un error en la petición
                console.error("Error al realizar la petición:", error);
            }
        });
    });