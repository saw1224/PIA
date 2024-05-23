$(document).ready(function() {
    console.log("hola desde jquery");

    // Cargar datos al cargar la página
    loadDepartments();

    // Función para cargar departamentos
    function loadDepartments() {
        $.ajax({
            url: 'http://localhost:8080/Departamento',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#table-body1').empty();
                data.forEach(function(departamento) {
                    let tableRow = `
                        <tr>
                            <td>${departamento.id}</td>
                            <td>${departamento.nombre}</td>
                            <td>${departamento.descripcion}</td>
                            <td><img src="${departamento.imagen}" alt="${departamento.nombre}" style="width: 50px; height: 50px;"></td>
                            <td>
                                <button class="btn btn-primary btn-edit" data-id="${departamento.id}" data-bs-toggle="modal" data-bs-target="#editModal1">Editar</button>
                                <button class="btn btn-danger btn-delete" data-id="${departamento.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    $('#table-body1').append(tableRow);
                });

                // Añadir eventos de click para botones de editar y eliminar
                $('.btn-edit').click(function() {
                    let id = $(this).data('id');
                    loadDepartmentData(id);
                });

                $('.btn-delete').click(function() {
                    let id = $(this).data('id');
                    deleteDepartment(id);
                });
            },
            error: function(error) {
                console.error("Error al realizar la petición:", error);
            }
        });
    }

    // Función para cargar datos de un departamento específico en el modal de edición
    function loadDepartmentData(id) {
        $.ajax({
            url: `http://localhost:8080/Departamento/${id}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#edit-id1').val(data.id);
                $('#edit-NombreDepartamento1').val(data.nombre);
                $('#edit-DescripciónDepartamento1').val(data.descripcion);
                $('#edit-imagen1').val(data.imagen);
            },
            error: function(error) {
                console.error("Error al cargar datos del departamento:", error);
            }
        });
    }

    // Función para crear un nuevo departamento
    $('#createForm1').submit(function(event) {
        event.preventDefault();
        let newDepartment = {
            nombre: $('#NombreDepartamento1').val(),
            descripcion: $('#DescripciónDepartamento1').val(),
            imagen: $('#imagen1').val()
        };

        $.ajax({
            url: 'http://localhost:8080/Departamento',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDepartment),
            success: function() {
                $('#createModal1').modal('hide');
                loadDepartments();
            },
            error: function(error) {
                console.error("Error al crear el departamento:", error);
            }
        });
    });

    // Función para editar un departamento existente
    $('#editForm1').submit(function(event) {
        event.preventDefault();
        let id = $('#edit-id1').val();
        let updatedDepartment = {
            nombre: $('#edit-NombreDepartamento1').val(),
            descripcion: $('#edit-DescripciónDepartamento1').val(),
            imagen: $('#edit-imagen1').val()
        };

        console.log("Datos a enviar:", updatedDepartment); // Mensaje de depuración

        $.ajax({
            url: `http://localhost:8080/Departamento/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedDepartment),
            success: function() {
                console.log("Departamento actualizado exitosamente");
                $('#editModal1').modal('hide');
                loadDepartments();
            },
            error: function(error) {
                console.error("Error al editar el departamento:", error);
                console.log("Error details:", error.responseText); // Mostrar detalles del error
            }
        });
    });

    // Función para eliminar un departamento
    function deleteDepartment(id) {
        $.ajax({
            url: `http://localhost:8080/Departamento/${id}`,
            method: 'DELETE',
            success: function() {
                console.log("Departamento eliminado exitosamente");
                loadDepartments();
            },
            error: function(error) {
                console.error("Error al eliminar el departamento:", error);
            }
        });
    }
});
