document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const passwordInput = document.getElementById('password');
    const codigoDescuentoInput = document.getElementById('codigoDescuento');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let isValid = true;

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (nombreInput.value.trim().split(' ').length < 2) {
            showError(nombreInput, 'Por favor, ingresa tu nombre completo (nombre y apellido).');
            isValid = false;
        }

        if (emailInput.value.endsWith('@duocuc.cl')) {

        } else if (!emailInput.value.includes('@')) {
            showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
            isValid = false;
        }

        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        if (isNaN(edad)) {
            showError(fechaNacimientoInput, 'Por favor, ingresa una fecha de nacimiento válida.');
            isValid = false;
        } else if (edad >= 50) {

        }

        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        }

        if (codigoDescuentoInput.value && codigoDescuentoInput.value.toUpperCase() !== 'FELICES50') {
            showError(codigoDescuentoInput, 'El código de descuento no es válido.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
        if (isValid) {
            window.location.href = 'index.html';
        }
    });

    function showError(input, message) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
});