document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const emailInput = document.getElementById('email');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const passwordInput = document.getElementById('password');
    const codigoDescuentoInput = document.getElementById('codigoDescuento');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (emailInput.value.endsWith('@duocuc.cl')) {
            // No se necesitan validaciones adicionales aquí, se maneja en el backend
            // La lógica de la torta gratis es un beneficio, no una validación de campo
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
            // El descuento se aplica en el backend
            // La validación solo verifica que sea un campo válido
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
    });

    function showError(input, message) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
});