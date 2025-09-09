document.addEventListener('DOMContentLoaded', () => {

    const registroForm = document.getElementById('registroForm');
    const loginForm = document.getElementById('loginForm');
    
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const mainTitle = document.querySelector('.titulo-principal');
    const subTitle = document.querySelector('.texto-secundario');


    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');


    function showError(input, message) {
        const parent = input.parentElement;
        const errorSpan = parent.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }


    showRegisterBtn.addEventListener('click', () => {
        loginFormContainer.classList.remove('active');
        registerFormContainer.classList.add('active');
        mainTitle.textContent = '¡Únete a la Familia Dulce!';
        subTitle.textContent = 'Regístrate para recibir promociones y sorpresas.';
    });

    showLoginBtn.addEventListener('click', () => {
        registerFormContainer.classList.remove('active');
        loginFormContainer.classList.add('active');
        mainTitle.textContent = '¡Bienvenido de nuevo!';
        subTitle.textContent = 'Inicia sesión para continuar.';
    });

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (!loginEmailInput.value.includes('@')) {
                showError(loginEmailInput, 'Por favor, ingresa un correo electrónico válido.');
                isValid = false;
            }

            if (loginPasswordInput.value.length < 8) {
                showError(loginPasswordInput, 'La contraseña debe tener al menos 8 caracteres.');
                isValid = false;
            }

            if (isValid) {
                window.location.href = 'test.html';
            }
        });
    }
});