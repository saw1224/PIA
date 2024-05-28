$(document).ready(function () {
    // Cargar usuarios al cargar la página
    loadUsuarios();

    function loadUsuarios() {
        $.ajax({
            url: 'http://localhost:8080/trabajadores',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#table-body4').empty();
                data.forEach(function (usuario) {
                    let tableRow = `
                        <tr>
                            <td>${usuario.id}</td>
                            <td>${usuario.nombre}</td>
                            <td>${usuario.apellidomaterno}</td>
                            <td>${usuario.apellidopaterno}</td>
                            <td>${usuario.usuarios}</td>
                            <td>${usuario.password}</td>
                            <td>${usuario.descripcion}</td>

                            <td>
                                <button class="btn btn-primary btn-edit" data-id="${usuario.id}" data-bs-toggle="modal" data-bs-target="#editModal4">Editar</button>
                                <button class="btn btn-danger btn-delete" data-id="${usuario.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    $('#table-body4').append(tableRow);
                });

                // Añadir eventos de click para botones de editar y eliminar
                $('.btn-edit').click(function () {
                    let id = $(this).data('id');
                    loadUsuarioData(id);
                });

                $('.btn-delete').click(function () {
                    let id = $(this).data('id');
                    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
                        deleteUsuario(id);
                    }
                });
            },
            error: function (error) {
                console.error("Error al realizar la petición:", error);
                alert("Error al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }

    function loadUsuarioData(id) {
        $.ajax({
            url: `http://localhost:8080/trabajadores/${id}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#edit-id4').val(data.idT);
                $('#edit-name4').val(data.nombre);
                $('#edit-apellidomaterno4').val(data.apellidomaterno);
                $('#edit-apellidoPaterno4').val(data.apellidopaterno);
                $('#edit-usuario4').val(data.usuarios);
                $('#edit-Password4').val(data.password);
                $('#edit-Descripcion4').val(data.descripcion);

            },
            error: function (error) {
                console.error("Error al cargar datos del usuario:", error);
                alert("Error al cargar los datos del usuario. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }

    $('#createForm4').submit(function (event) {
        event.preventDefault();
        let newUsuario = {
            nombre: $('#name4').val(),
            apellidoMaterno: $('#apellidomaterno4').val(),
            apellidoPaterno: $('#apellidoPaterno4').val(),
            usuario: $('#usuario4').val(),
            contraseña: $('#Password4').val(),
            descripcion: $('#Descripcion4').val(),
        };

        $.ajax({
            url: 'http://localhost:8080/trabajadores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUsuario),
            success: function () {
                $('#createModal4').modal('hide');
                $('#createForm4')[0].reset();
                loadUsuarios();
            },
            error: function (error) {
                console.error("Error al crear el usuario:", error);
                alert("Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    });

    $('#editForm4').submit(function (event) {
        event.preventDefault();
        let updatedUsuario = {
            idTrabajador: $('#edit-id4').val(),
            nombre: $('#edit-name4').val(),
            apellidoMaterno: $('#edit-apellidomaterno4').val(),
            apellidoPaterno: $('#edit-apellidoPaterno4').val(),
            usuario: $('#edit-usuario4').val(),
            contraseña: $('#edit-Password4').val(),
            descripcion: $('#edit-Descripcion4').val(),
            rol: $('#edit-rol4').val()
        };

        $.ajax({
            url: `http://localhost:8080/trabajadores/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedUsuario),
            success: function () {
                $('#editModal4').modal('hide');
                loadUsuarios();
            },
            error: function (error) {
                console.error("Error al actualizar el usuario:", error);
                alert("Error al actualizar el usuario. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    });

    function deleteUsuario(id) {
        $.ajax({
            url: `http://localhost:8080/trabajadores/${id}`,
            method: 'DELETE',
            success: function () {
                console.log("Usuario eliminado exitosamente");
                loadUsuarios();
            },
            error: function (error) {
                console.error("Error al eliminar el usuario:", error);
                alert("Error al eliminar el usuario. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }
});
