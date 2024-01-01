function clearError(errorId) {
    var errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.style.color = 'red';
}

function checkPasswordStrength() {
    // Implemente a lógica de verificação da força da senha, se necessário
}

function validateForm() {
    // Limpar mensagens de erro
    clearErrors();

    // Obter valores dos campos
    var fullName = document.getElementById('fullName').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    // Validar campos
    if (fullName.trim() === '') {
        displayError('fullNameError', 'Por favor, digite seu nome completo.');
    }

    if (password.length < 6) {
        displayError('passwordError', 'A senha deve ter pelo menos 6 dígitos.');
    }

    if (password !== confirmPassword) {
        displayError('confirmPasswordError', 'As senhas não coincidem.');
    }

    if (email.trim() === '' || !isValidEmail(email)) {
        displayError('emailError', 'Por favor, digite um e-mail válido.');
    }

    if (cpf.trim() === '' || !validarCPF(cpf)) {
        displayError('cpfError', 'Por favor, digite um CPF válido.');
    }




    if (fullName.trim() !== '' &&
        password.length >= 6 &&
        password === confirmPassword &&
        email.trim() !== '' &&
        isValidEmail(email) &&
        cpf.trim() !== '' &&
        validarCPF(cpf)) {
        // Obter a lista de usuários do localStorage
        var listaDeUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Adicionar o novo usuário à lista
        var novoUsuario = {
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            cpf: cpf
        };

        listaDeUsuarios.push(novoUsuario);

        // Atualizar a lista de usuários no localStorage
        localStorage.setItem('usuarios', JSON.stringify(listaDeUsuarios));

        // Se todos os campos estão corretos, você pode decidir redirecionar para a página de login ou home
        setTimeout(() => {
            window.location.href = './signin.html';
        }, 2000);
    }


}


function adicionarUsuariosSalvos() {
    const listaDeUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    for (let usuario of listaDeUsuarios) {
        criaUsuario(usuario);
    }
}

function criaUsuario(usuario) {
    // Crie um novo elemento de parágrafo (p)
    var novoParagrafo = document.createElement('p');

    // Defina o conteúdo do parágrafo com os dados do usuário
    novoParagrafo.textContent = `Nome: ${usuario.fullName}, Email: ${usuario.email}, CPF: ${usuario.cpf}`;

    // Adicione o parágrafo ao corpo do documento ou a outro elemento desejado
    // document.body.appendChild(novoParagrafo);
}

// ...

// Chame a função para adicionar usuários salvos quando a página carregar
adicionarUsuariosSalvos();







function isValidEmail(email) {
    // Adicione sua própria lógica de validação de e-mail, se necessário
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

function validarCPF(cpf) {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Calcular o primeiro dígito verificador
    let total = 0;
    for (let i = 0; i < 9; i++) {
        total += parseInt(cpf[i]) * (10 - i);
    }
    let resto = total % 11;
    let digito1 = resto > 1 ? 11 - resto : 0;

    // Calcular o segundo dígito verificador
    total = 0;
    for (let i = 0; i < 10; i++) {
        total += parseInt(cpf[i]) * (11 - i);
    }
    resto = total % 11;
    let digito2 = resto > 1 ? 11 - resto : 0;

    // Verificar se os dígitos verificadores estão corretos
    return (parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2);
}

function clearErrors() {
    var errorElements = document.getElementsByClassName('error');
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].textContent = '';
    }
}
