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
                    deleteCita(id);
                });
            },
            error: function (error) {
                console.error("Error al realizar la petición:", error);
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
            sintomas: $('#sintomas3').val()
        };

        $.ajax({
            url: 'http://localhost:8080/Cita',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newCita),
            success: function () {
                $('#createModal3').modal('hide');
                loadCitas();
            },
            error: function (error) {
                console.error("Error al crear la cita:", error);
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
            }
        });
    }
});
