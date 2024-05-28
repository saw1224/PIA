$(document).ready(function () {
    console.log("hola desde jquery");

    // Cargar datos al cargar la página
    loadCitas();

    // Función para cargar citas
    function loadCitas() {
        $.ajax({
            url: 'http://localhost:8080/Cita',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#table-body3').empty();
                data.forEach(function (cita) {
                    let tableRow = `
                        <tr>
                            <td>${cita.id}</td>
                            <td>${cita.nombre}</td>
                            <td>${cita.apellidoPaterno}</td>
                            <td>${cita.apellidoMaterno}</td>
                            <td>${cita.fechaReservacion}</td>
                            <td>${cita.correo}</td>
                            <td>${cita.telefono}</td>
                            <td>${cita.sintomas}</td>
                            <td>${cita.consultorio.id}</td>
                            <td>
                                <button class="btn btn-primary btn-edit" data-id="${cita.id}" data-bs-toggle="modal" data-bs-target="#editModal3">Editar</button>
                                <button class="btn btn-danger btn-delete" data-id="${cita.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    $('#table-body3').append(tableRow);
                });

                // Añadir eventos de click para botones de editar y eliminar
                $('.btn-edit').click(function () {
                    let id = $(this).data('id');
                    loadCitaData(id);
                });

                $('.btn-delete').click(function () {
                    let id = $(this).data('id');
                    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
                        deleteCita(id);
                    }
                });
            },
            error: function (error) {
                console.error("Error al realizar la petición:", error);
                alert("Error al cargar las citas. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }

    // Función para cargar datos de una cita específica en el modal de edición
    function loadCitaData(id) {
        $.ajax({
            url: `http://localhost:8080/Cita/${id}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#edit-id3').val(data.id);
                $('#edit-Nombre3').val(data.nombre);
                $('#edit-apellidoPaterno3').val(data.apellidoPaterno);
                $('#edit-apellidoMaterno3').val(data.apellidoMaterno);
                $('#edit-fechaYHorareservacion3').val(data.fechaReservacion);
                $('#edit-correo3').val(data.correo);
                $('#edit-telefono3').val(data.telefono);
                $('#edit-sintomas3').val(data.sintomas);
            },
            error: function (error) {
                console.error("Error al cargar datos de la cita:", error);
                alert("Error al cargar los datos de la cita. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }

    // Función para crear una nueva cita
    $('#createForm3').submit(function (event) {
        event.preventDefault();
        let newCita = {
            nombre: $('#name3').val(),
            apellidoPaterno: $('#apellidoPaterno3').val(),
            apellidoMaterno: $('#apellidomaterno3').val(),
            fechaReservacion: $('#fechaYHorareservacion3').val(),
            correo: $('#correo3').val(),
            telefono: $('#telefono3').val(),
            sintomas: $('#sintomas3').val(),
            consultorio: {
                id: $('#idConsultorio3').val()
            }
        };

        $.ajax({
            url: `http://localhost:8080/Cita/${newCita.consultorio.id}/Cita`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newCita),
            success: function () {
                $('#createModal3').modal('hide');
                $('#createForm3')[0].reset(); // Limpiar el formulario
                loadCitas();
            },
            error: function (error) {
                console.error("Error al crear la cita:", error);
                alert("Error al crear la cita. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    });

    // Función para actualizar una cita existente
    $('#editForm3').submit(function (event) {
        event.preventDefault();
        let updatedCita = {
            id: $('#edit-id3').val(),
            nombre: $('#edit-Nombre3').val(),
            apellidoPaterno: $('#edit-apellidoPaterno3').val(),
            apellidoMaterno: $('#edit-apellidoMaterno3').val(),
            fechaReservacion: $('#edit-fechaYHorareservacion3').val(),
            correo: $('#edit-correo3').val(),
            telefono: $('#edit-telefono3').val(),
            sintomas: $('#edit-sintomas3').val(),
            consultorio: {
                id: $('#idConsultorio3').val()
            }
        };

        $.ajax({
            url: `http://localhost:8080/Cita/${updatedCita.id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedCita),
            success: function () {
                $('#editModal3').modal('hide');
                loadCitas();
            },
            error: function (error) {
                console.error("Error al actualizar la cita:", error);
                alert("Error al actualizar la cita. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    });

    // Función para eliminar una cita
    function deleteCita(id) {
        $.ajax({
            url: `http://localhost:8080/Cita/${id}`,
            method: 'DELETE',
            success: function () {
                console.log("Cita eliminada exitosamente");
                loadCitas();
            },
            error: function (error) {
                console.error("Error al eliminar la cita:", error);
                alert("Error al eliminar la cita. Por favor, inténtelo de nuevo más tarde.");
            }
        });
    }
});
