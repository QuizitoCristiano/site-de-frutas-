

const myAvatar = document.querySelector('.isNoAvatar');
const profileEditForm = document.querySelector('.profileEditForm');
const profile = document.querySelector('.profile');
const isLoged = JSON.parse(localStorage.getItem('isUserLoged'));
const fullName = isLoged.fullName.trim();

myAvatar.addEventListener('click', () => {
  profileEditForm.classList.add('active');
});

function closeProfileEditForm() {
  profileEditForm.classList.remove('active');
}

// Dividir os nomes usando o espaço como separador
const names = fullName.split(' ');

// Verificar se há pelo menos dois nomes
if (names.length >= 2 && !isLoged.avatar) {
  // Pegar a primeira e a segunda letra dos dois nomes
  const firstLetter = names[0].charAt(0);
  const secondLetter = names[1].charAt(0);

  myAvatar.innerHTML = firstLetter + secondLetter;
  profile.style.display = 'none';
  myAvatar.style.display = 'flex';
} else if (!isLoged.avatar) {
  // Se houver apenas um nome ou nenhum, use a primeira letra do primeiro nome
  const firstLetterOfFirstName = fullName.charAt(0);

  myAvatar.innerHTML = firstLetterOfFirstName;
  profile.style.display = 'none';
  myAvatar.style.display = 'flex';
}

// Restante do seu código
const avatarInput = document.getElementById('avatar');
avatarInput.addEventListener('change', handleAvatarChange);

function handleAvatarChange() {
  const file = avatarInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      myAvatar.innerHTML = `<img class="profileIgmAvatar" src="${imageSrc}" alt="Avatar">`;
      myAvatar.style.display = 'flex';
      profile.style.display = 'none';

      // Salvar a imagem no localStorage com uma chave apropriada
      localStorage.setItem('userAvatar', imageSrc);
    };
    reader.readAsDataURL(file);
  }
}

function saveProfileChanges() {
  // Lógica para salvar as alterações, como atualizar o localStorage ou enviar para um servidor
  alert('Alterações salvas com sucesso!');
}







const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener("click", function () {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});
window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};
// Abra o modal ao clicar no ícone de pesquisa
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("searchModal").style.display = "block";
});

// Feche o modal quando o botão "Fechar" (X) é clicado
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("searchModal").style.display = "none";
});

// Feche o modal se o usuário clicar fora da área do modal
window.addEventListener("click", function (event) {
  var modal = document.getElementById("searchModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// // Lógica de pesquisa ao clicar no botão "Pesquisar"
document.getElementById("searchButton").addEventListener("click", function () {
  var searchValue = document.getElementById("frutaInput").value;
  // Execute a ação de pesquisa com o valor inserido no campo de entrada aqui
  // Por exemplo, você pode redirecionar para uma página de resultados de pesquisa ou realizar uma solicitação AJAX.
});

let sacola = document.querySelector(".carrinho");
function motrarSacola(event) {
  sacola.classList.add("show");
}
function fecharSacola(e) {
  sacola.classList.remove("show");
}
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("bxs-cart")) {
    motrarSacola(event);
  } else if (event.target.classList.contains("bx-x")) {
    fecharSacola();
  }
});

const frutas = [
  // Frutas
  "Maçã",
  "Banana",
  "Laranja",
  "Uva",
  "Morango",
  "Abacaxi",
  "Pera",
  "Manga",
  "Melancia",
  "Kiwi",
  "Cereja",
  "Limão",
  "Limão-siciliano",
  "Pêssego",
  "Framboesa",
  "Amora",
  "Mirtilo",
  "Caju",
  "Maracujá",
  "Goiaba",
  // Legumes
  "Abobrinha",
  "Alface",
  "Batata",
  "Cenoura",
  "Cebola",
  "Espinafre",
  "Brócolis",
  "Abóbora",
  "Pepino",
  "Tomate",
  "Pimentão",
  "Couve",
  "Repolho",
  "Beterraba",
  "Milho",
  "Ervilha",
  "Rúcula",
  "Aspargos",
  "Aipo",
  "Nabo",
];

function sugerirFrutas() {
  const input = document.getElementById("frutaInput").value.toLowerCase();
  const sugestoes = document.getElementById("frutaSugestoes");
  sugestoes.innerHTML = "";

  if (input.length === 0) {
    sugestoes.style.display = "none";
    return;
  }

  const resultados = frutas.filter((fruta) =>
    fruta.toLowerCase().includes(input)
  );
  resultados.forEach((resultado) => {
    const li = document.createElement("li");
    li.textContent = resultado;
    li.addEventListener("click", () => {
      adicionarAoCarrinho(frutas.indexOf(resultado));
      sugestoes.style.display = "none";
      // Adiciona esta linha para esconder as sugestões ao adicionar ao carrinho
    });
    sugestoes.appendChild(li);
  });

  if (resultados.length > 0) {
    sugestoes.style.display = "block";
  } else {
    sugestoes.style.display = "none";
  }
}

const container = document.querySelector(".Produtos-container");
const mayContainer = document.querySelector(".Produtos-legumes");
const listaItensCarrinho = document.querySelector(".Minha-lista-carrinho");
const totalCarrinhoElement = document.querySelector(".total-carrinho"); // Adicione um elemento para exibir o total
const carrinho = [];
// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(productIndex, isVegetable = false) {
  const produtosArray = isVegetable ? produtoLegumes : produtos;
  const tagCarinho = document.querySelector(".counter");
  const produto = produtosArray[productIndex];
  carrinho.push({ ...produto, quantidade: 1, isVegetable });
  atualizarCarrinho();
  calcularTotal();
  tagCarinho.innerHTML = carrinho.length && `${carrinho.length}`;
  console.log(carrinho);
}



function atualizarCarrinho() {
  listaItensCarrinho.innerHTML = "";

  carrinho.forEach((produto, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="carinhoItem">

    <div class="priceQuantity">
    <div>
    ${produto.nome} - R$ ${produto.preco ? produto.preco.toFixed(2) : "N/A"}
    </div>

    <div>
    Quantidade: ${produto.quantidade}
    </div>
    </div>
  
    <div class="wrapperIncrease">
        <div class="iconRemuveItem">
            <i class='bx bxs-trash-alt' id="trash-alt" onclick="removerDoCarrinho(${index})"></i>
        </div>

        <div class="increaseAndDecrease">
            <button onclick="aumentarQuantidade(${index})">+</button>
            <button onclick="diminuirQuantidade(${index})">-</button>
        </div>
    </div>

    
  </div>

      
    `;
    listaItensCarrinho.appendChild(listItem);


  });
}
function aumentarQuantidade(index) {
  carrinho[index].quantidade++;
  atualizarCarrinho();
  calcularTotal();
}

function diminuirQuantidade(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    // Remover o item do carrinho se a quantidade for 1 ou menos
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
  calcularTotal();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
  calcularTotal();
}

function calcularTotal() {
  let total = 0;

  carrinho.forEach((produto) => {
    total += produto.preco * produto.quantidade;
  });
  totalCarrinhoElement.textContent = `Total: R$ ${total.toFixed(2)}`;



}

// Inicialização: Adicione produtos à página
produtos.forEach((produto, index) => {
  const productCardHTML = `
    <div class="box">
      <img src="${produto.img}" alt="" />
      <h2>${produto.nome}</h2>
      <h3 class="price">R$: ${produto.preco.toFixed(2)} <span>kg</span></h3>
      <i class="bx bx-cart-alt" onclick="adicionarAoCarrinho(${index})"></i>
      <i class="bx bx-heart" onclick="trocarIconDeFrutas(this)"></i>
    </div>
  `;
  container.innerHTML += productCardHTML;
});

// Função para trocar o ícone do coração;
function trocarIconDeFrutas(el) {
  if (el.classList.contains("bx-heart")) {
    el.classList.remove("bx-heart");
    el.classList.add("bxs-heart");
  } else {
    el.classList.remove("bxs-heart");
    el.classList.add("bx-heart");
  }
}

// Função para trocar o ícone do coração
function trocarIcone(element) {
  if (element.classList.contains("bx-heart")) {
    element.classList.remove("bx-heart");
    element.classList.add("bxs-heart");
  } else {
    element.classList.remove("bxs-heart");
    element.classList.add("bx-heart");
  }
}

produtoLegumes.forEach((myVegetableProducts, index) => {
  const productCardHTML = `
    <div class="wrapper">
      <img src="${myVegetableProducts.img}" alt="" />
      <h2>${myVegetableProducts.nome}</h2>
      <h3 class="price">R$: ${myVegetableProducts.preco.toFixed(
    2
  )} <span>kg</span></h3>
      <i class="bx bx-cart-alt" onclick="adicionarAoCarrinho(${index}, true)"></i>
      <i class="bx bx-heart" onclick="trocarIcone(this)"></i>
     
    </div>
  `;
  mayContainer.innerHTML += productCardHTML;
});




document.addEventListener("DOMContentLoaded", function () {
  var openModalBtn = document.getElementById("openModalBtn");
  var modal = document.getElementById("myModal");
  var fecharModalClicado = document.getElementById("fechar-modal");

  // Função para abrir ou fechar o modal
  function toggleModal() {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  }

  // Função para verificar se o carrinho está vazio
  function verificarCarrinho() {
    var itensCarrinho = document.querySelectorAll('.Minha-lista-carrinho li');
    return itensCarrinho.length > 0;
  }

  // Abrir o modal ao clicar no botão "Finalizar Compra"
  openModalBtn.addEventListener("click", function () {
    // Fechar o carrinho antes de abrir o modal
    document.querySelector('.carrinho').style.display = "none";

    if (verificarCarrinho()) {
      toggleModal();
    } else {
      // Carrinho está vazio, alertar o usuário
      alert("Adicione itens ao carrinho para continuar a navegação no site.");
    }
  });

  // Fechar o modal ao clicar no botão dentro do modal
  fecharModalClicado.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Fechar o modal ao clicar fora dele
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});



function validarNomeCompleto() {
  const nomeCompletoInput = document.getElementById("nomeCompleto");
  const nomeCompleto = nomeCompletoInput.value.trim();

  if (nomeCompleto === "") {
    nomeCompletoInput.classList.add("campo-vazio");
  } else {
    nomeCompletoInput.classList.remove("campo-vazio");
  }
}

function validarNomeCompleto() {
  const nomeCompletoInput = document.getElementById("nomeCompleto");
  const nomeCompleto = nomeCompletoInput.value.trim();

  // Verifique se o campo está vazio ou não contém apenas letras
  if (nomeCompleto === "" || !/^[a-zA-Z\s]+$/.test(nomeCompleto)) {
    nomeCompletoInput.classList.add("campo-vazio");
    alert("Por favor, insira um nome válido.");
  } else {
    nomeCompletoInput.classList.remove("campo-vazio");
  }
}

function validarCamposDeBloco() {
  const bloco = document.getElementById("bloco");
  const andar = document.getElementById("andar");
  const apartamento = document.getElementById("apartamento");

  // Remove as classes existentes
  bloco.classList.remove("campo-vazio", "campo-preenchido");
  andar.classList.remove("campo-vazio", "campo-preenchido");
  apartamento.classList.remove("campo-vazio", "campo-preenchido");

  const valorBloco = bloco.value.trim();
  const valorAndar = andar.value.trim();
  const valorApartamento = apartamento.value.trim();

  // Verifica se pelo menos um dos campos foi preenchido
  if (valorBloco !== "" || valorAndar !== "" || valorApartamento !== "") {
    // Se pelo menos um campo foi preenchido, adiciona a classe campo-preenchido a todos os campos
    bloco.classList.add("campo-preenchido");
    andar.classList.add("campo-preenchido");
    apartamento.classList.add("campo-preenchido");
  } else {
    // Se nenhum campo foi preenchido, adiciona a classe campo-vazio a todos os campos
    bloco.classList.add("campo-vazio");
    andar.classList.add("campo-vazio");
    apartamento.classList.add("campo-vazio");

    alert("Por favor, preencha pelo menos um campo.");
  }
}

/*
function validarCelular() {
  const celularInput = document.getElementById("Celular");
  const celular = celularInput.value.trim();
  let valor = telefoneInput.value.replace(/\D/g, '');

  // Padrão esperado: (XX) XXXXX-XXXX ou XX XXXXX-XXXX
  if (valor.length >= 2) {
    valor = `(+${valor.slice(0, 2)}) ${valor.slice(2)}`;
  }

  if (valor.length >= 11) {
    valor = `${valor.slice(0, 10)}-${valor.slice(10)}`;
  }
}





function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula os dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos calculados são iguais aos dígitos do CPF
  return (
    digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10))
  );
}

function validarCliente() {
  const cpfInput = document.getElementById("cpf");
  const cpf = cpfInput.value.trim();

  validarNomeCompleto();
  validarCelular();
  validarCamposDeBloco();
  if (!validarCPF(cpf)) {
    cpfInput.classList.add("campo-vazio");
    alert("CPF inválido. Por favor, verifique.");
    return;
  }

 
  

  // alert("CPF válido! Continue com a finalização da compra.");


}*/

// Customer Review Elements
const dadosDosClientes = [
  {
    nome: "Quizito Cristiano",
    customerImage: "./image/sol.jpg",
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `,
  },
  {
    nome: "Rafael T.",
    customerImage: "./image/quizito2.jpeg",
    message: `
    A Delicacty é a minha salvação quando estou sem tempo para ir ao
    supermercado. Eles entregam tão rapidamente que nunca fico sem
    frutas e legumes frescos em casa. E os descontos são uma grande
    ajuda para o orçamento.
    `,
  },

  {
    nome: "Sandro",
    customerImage: "./image/mamae.jpeg",
    message: `
    Os produtos da Delicacty são tão frescos que parece que acabei de
    colhê-los eu mesmo. A entrega rápida é um grande benefício,
    especialmente quando estou ocupado. Os descontos também são muito
    apreciados!
    `,
  },

  {
    nome: "Pedro Henrique",
    customerImage: "./image/nascerd-o-sol.jpg",
    message: `
    Nunca encontrei uma loja online que entregasse tão rapidamente
    quanto a Delicacty. Além disso, os produtos são de alta qualidade, e
    os descontos regulares são um bônus adicional que economiza meu
    dinheiro.
    `,
  },

  {
    nome: "Mariana Dos Santos",
    customerImage: "./image/Quizito.jpeg",
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `,
  },
  {
    nome: "Temótio Luiz",
    customerImage: "./image/temotio.jpeg",
    message: `
    A Delicacty é a minha opção número um para alimentos frescos. A
    qualidade é impecável, a entrega é super rápida, e os descontos
    frequentes me fazem voltar sempre. Uma loja incrível!
    `,
  },
];

const myCustomers = document.querySelector(".customers-container");

dadosDosClientes.map((cardDosCliente) => {
  const newDiv = document.createElement("div");

  newDiv.innerHTML = `
  






    <div class="box">
        <i class="bx bxs-quote-alt-left"></i>

        <div class="stares">
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star-helf"></i>
        </div>
        <p>${cardDosCliente.message}</p>
        <div class="review-profile">
        <img src="${cardDosCliente.customerImage}" alt="" />
        <h3>${cardDosCliente.nome}</h3>
        </div>
      </div>
  `;

  myCustomers.appendChild(newDiv);
});

// Product Card Elements
const dadosDosCartoes = [
  {
    imagem: "./img/Pimentao.png",
    titulo: "Pimentão",
    quantidade: "22 Item",
    backgroundColor: "#fef4ea",
  },
  {
    imagem: "./img/Abobrinha.png",
    titulo: "Abobrinha ",
    quantidade: "15 Item",
    backgroundColor: "#eeeef9",
  },
  {
    imagem: "./img/lecumes.png",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    backgroundColor: "#faeaea",
  },
  {
    imagem: "./img/batata-doce.png",
    titulo: "Batata-Doce",
    quantidade: "8 Item",
    backgroundColor: "#eeeef9",
  },
  {
    imagem: "./img/tomate1.png",
    titulo: "Tomate",
    quantidade: "30 Item",
    backgroundColor: "#e1fed3",
  },
  {
    imagem: "./img/Cenoura1.png",
    titulo: "Cenoura",
    quantidade: "12 Item",
    backgroundColor: "#e4fada ",
  },

  {
    imagem: "./img/alho.jpg",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    backgroundColor: "#fad2f5",
  },
  {
    imagem: "./img/feijoa-Vermelo.png",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    backgroundColor: "#ebf7f5",
  },
  {
    imagem: "./img/broccoli1.png",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    backgroundColor: "#c8ccc8",
  },
  {
    imagem: "./img/piripire.jpg",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    backgroundColor: "#dee2ff",
  },
];

const cartoesContainer = document.getElementById("categoria-container");

dadosDosCartoes.map((cartao) => {
  const div = document.createElement("div");
  div.className = `box box1`;
  div.style.backgroundColor = cartao.backgroundColor; // Apply background color

  div.innerHTML = `
    <img src="${cartao.imagem}" alt="" />
    <h2>${cartao.titulo}</h2>
    <span>${cartao.quantidade}</span>
    <i class="bx bx-right-arrow-alt"></i>
  `;
  cartoesContainer.appendChild(div);
});






// Seletor específico para o modal
const novoModal = document.getElementById("seuModalId"); // Substitua "seuModalId" pelo ID real do seu modal

// Função para abrir o modal
function abrirModal() {
  novoModal.classList.add("showNewModal");
}

// Função para fechar o modal
function fecharModal() {
  novoModal.classList.remove("showNewModal");
}

// Event listener para controlar cliques
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("abrir-modal")) {
    e.preventDefault(); // Evitar comportamento padrão de links
    abrirModal(); // Abrir o modal
  } else if (e.target.classList.contains("fechar-modal")) {
    fecharModal(); // Fechar o modal
  } else if (e.target.classList.contains("enviar-formulario")) {
    // Lógica para enviar o formulário, se necessário
    fecharModal(); // Fechar o modal após enviar
  }
});

// Exemplo de como abrir o modal quando necessário (pode ser chamado em outro lugar do seu código)
abrirModal(); // Remova esta linha se não quiser abrir o modal automaticamente


function validarCliente() {
  // Limpar mensagens de erro
  clearErrors();

  // Obter valores dos campos
  var nomeCompleto = document.getElementById('nomeCompleto').value;
  var celular = document.getElementById('Celular').value;
  var endereco = document.querySelector('.Endereco').value;
  var cpf = document.getElementById('cpf').value;
  var bloco = document.getElementById('bloco').value;
  var andar = document.getElementById('andar').value;
  var apartamento = document.getElementById('apartamento').value;
  var mensagem = document.querySelector('.mydivBoxTx textarea').value;

  // Validar campos
  if (nomeCompleto.trim() === '') {
    displayError('nomeCompletoError', 'Por favor, digite seu nome completo.');
  }

  // Adicione aqui mais validações conforme necessário...

  if (cpf.trim() === '' || !validarCPF(cpf)) {
    displayError('cpfError', 'Por favor, digite um CPF válido.');
  }

  // Validar bloco, andar e apartamento (garantir que apenas uma opção foi preenchida)
  var opcoesPreenchidas = [bloco, andar, apartamento].filter(Boolean);
  if (opcoesPreenchidas.length !== 1) {
    displayError('blocoAndarAptoError', 'Preencha exatamente um campo entre Bloco, Andar e Apartamento.');
  }
}

function isValidEmail(email) {
  // Adicione sua própria lógica de validação de e-mail, se necessário
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
  return parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2;
}

function displayError(elementId, message) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.color = 'red';
}

function clearErrors() {
  var errorElements = document.getElementsByClassName('error');
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }
}

// Restante do código...







function validateForm() {
  // Limpar mensagens de erro
  clearErrors();

  // Obter valores dos campos
  var fullName = document.getElementById('fullName').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var email = document.getElementById('email').value;

  var showPasswordButton = document.querySelector('.show-password-button');
  var visibilityIcon = document.querySelector('.bxs-low-vision');

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
}

function isValidEmail(email) {
  // Adicione sua própria lógica de validação de e-mail, se necessário
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  var errorElements = document.getElementsByClassName('error');
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }
} function validateForm() {
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
}

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

function clearError(elementId) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
}

function clearErrors() {
  var errorElements = document.getElementsByClassName('error');
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }
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
  if (parseInt(cpf[9]) === digito1 && parseInt(cpf[10]) === digito2) {
    return true;
  } else {
    return false;
  }
}





