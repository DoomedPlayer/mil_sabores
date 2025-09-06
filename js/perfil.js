document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('perfilForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const telefonoInput = document.getElementById('telefono');
    const direccionInput = document.getElementById('direccion');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        document.querySelectorAll('small').forEach(el => el.textContent = '');

        if (nombreInput.value.trim().split(' ').length < 2) {
            showError(nombreInput, 'Por favor, ingresa tu nombre completo (nombre y apellido).');
            isValid = false;
        }

        if (fechaNacimientoInput.value.trim() === '') {
            showError(fechaNacimientoInput, 'La fecha de nacimiento es obligatoria.');
            isValid = false;
        }

        if (telefonoInput.value.trim() !== '' && !isValidPhone(telefonoInput.value)) {
            showError(telefonoInput, 'El formato del teléfono no es válido. Debe contener 9 dígitos.');
            isValid = false;
        }

        if (isValid) {
            window.location.href = 'index.html';
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const small = document.createElement('small');
        small.textContent = message;
        formGroup.appendChild(small);
    }

    function isValidPhone(phone) {
        const re = /^\d{9}$/;
        return re.test(String(phone));
    }
});