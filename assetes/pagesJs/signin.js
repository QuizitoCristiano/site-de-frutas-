

function clearError(errorId) {
    document.getElementById(errorId).textContent = '';
}



function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    let user = {}

    // Implemente sua lógica de validação aqui
    var isValid = true;

    if (email === '') {
        document.getElementById('emailError').textContent = 'O e-mail é obrigatório.';
        isValid = false;
    }

    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 6 caracteres.';
        isValid = false;
    }

    // Recuperar os dados do localStorage
    var storedUsuarios = localStorage.getItem('usuarios');

    // Verificar se há dados no localStorage
    if (storedUsuarios) {
        // Converter os dados de JSON para objeto
        var listaDeUsuarios = JSON.parse(storedUsuarios);

        // Implemente a lógica de verificação aqui, por exemplo:
        var usuarioEncontrado = listaDeUsuarios.find(function (usuario) {
            user = usuario;
            return usuario.email === email && usuario.password === password;

        });



        if (usuarioEncontrado) {
            // Os dados do usuário são válidos, faça o que for necessário
            localStorage.setItem('isUserLoged', JSON.stringify(user));
            const loader = document.querySelector('.contante_laoder')
            loader.style.display = 'flex'
            alert(`Olá ${email}! Seja Bem-vindo!`);
            // Redirecione para a página home ou faça o que for necessário após o login
            setTimeout(() => {
                loader.style.display = 'none'
                window.location.href = '../../index.html';
            }, 3000);

        } else {
            // Os dados do usuário não correspondem, trate conforme necessário
            alert('E-mail ou senha inválidos. Por favor, tente novamente.');
        }
    } else {
        // Não há dados no localStorage, o usuário não está cadastrado
        alert('Usuário não encontrado. Faça o cadastro antes de fazer o login.');
    }

    console.log(usuarioEncontrado);
    
}



