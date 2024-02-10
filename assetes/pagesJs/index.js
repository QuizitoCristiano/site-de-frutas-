// // Verificar se o usuário não está logado
// if (localStorage.getItem('token') == null) {
//     // Verificar se o usuário está cadastrado
//     var storedUserData = localStorage.getItem('userData');

//     if (storedUserData) {
//         // Usuário cadastrado, recuperar os dados
//         var userData = JSON.parse(storedUserData);

//         // Verificar se o usuário já está logado para evitar redirecionamento contínuo
//         if (localStorage.getItem('userLogado') == null) {
//             // Exibir a mensagem de boas-vindas
//             // Defina o usuário logado
//             localStorage.setItem('userLogado', JSON.stringify({ nome: userData.fullName }));

//             // Redirecionar para a página principal ou home (dependendo do seu fluxo)
//             window.location.href = '../../index.html';
//         }
//     } else {
//         // Usuário não cadastrado, redirecionar para a página de login
//         alert("Você precisa estar logado para acessar esta página");
//         window.location.href = "./assetes/pagesHtmal/signin.html";
//     }
// } else {
//     // Usuário já está logado, redirecionar para a página principal ou home
//     window.location.href = '../../index.html';
// }
let user = localStorage.getItem('isUserLoged');


// Verificar se o usuário não está logado
if (user) {
    // Verificar se o usuário está cadastrado
    window.location.href = '../../index.html';
} else {
    // Usuário já está logado, redirecionar para a página principal ou home
    window.location.href = '../../index.html';
}
