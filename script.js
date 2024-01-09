const myAvatar = document.querySelector(".isNoAvatar");
const profileEditForm = document.getElementById("profileEditForm");
const profile = document.querySelector(".profile");
let isLoged = JSON.parse(localStorage.getItem("isUserLoged")) || {};
const listaDeUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let photoURL = "";
const fullName = isLoged.fullName ? isLoged.fullName.trim() : "";
const clicado = document.querySelector(".profileIgmAvatar");

function showEditForm() {
  if (profileEditForm.style.display === "flex") {
    profileEditForm.style.display = "none";
  } else {
    profileEditForm.style.display = "flex";
  }
}
document.addEventListener("click", (e) => {
  // console.log(e.target.classList)
  const profileDinamic = e.target.classList.value === "profileIgmAvatar";
  const profileIsNoAvatar = e.target.classList.value === "isNoAvatar";
  const profileDefault = e.target.classList.value === "profile";
  if (profileDinamic || profileIsNoAvatar || profileDefault) {
    showEditForm();
  }
});

function loadAvatar() {
  if (isLoged.avatar) {
    myAvatar.innerHTML = `<img class="profileIgmAvatar" src="${isLoged.avatar}" alt="Avatar">`;
    myAvatar.style.display = "flex";
    profile.style.display = "none";
  } else if (fullName) {
    const names = fullName.split(" ");

    if (names.length >= 2) {
      const firstLetter = names[0].charAt(0);
      const secondLetter = names[1].charAt(0);

      myAvatar.innerHTML = firstLetter + secondLetter;
      profile.style.display = "none";
      myAvatar.style.display = "flex";
    } else {
      const firstLetterOfFirstName = fullName.charAt(0);

      myAvatar.innerHTML = firstLetterOfFirstName;
      profile.style.display = "none";
      myAvatar.style.display = "flex";
    }
  }
}

loadAvatar(); // Chamar a função ao carregar a página

const avatarInput = document.getElementById("avatar");
avatarInput.addEventListener("change", handleAvatarChange);

function handleAvatarChange() {
  const file = avatarInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      myAvatar.innerHTML = `<img class="profileIgmAvatar" src="${imageSrc}" alt="Avatar">`;
      myAvatar.style.display = "flex";
      profile.style.display = "none";
      photoURL = imageSrc;
    };
    reader.readAsDataURL(file);
  }
}

function saveProfileChanges() {
  if (!photoURL) {
    alert("por favor selecione uma foto!!");
    return false;
  }
  const userInUsers = listaDeUsuarios.filter(
    (item) => item.email === isLoged.email
  );
  if (userInUsers.length > 0) {
    const indexToRemove = listaDeUsuarios.findIndex(
      (item) => item.email === isLoged.email
    );

    if (indexToRemove !== -1) {
      listaDeUsuarios.splice(indexToRemove, 1);

      const updatedUser = { ...userInUsers[0], avatar: photoURL };
      listaDeUsuarios.push(updatedUser);
      localStorage.setItem("usuarios", JSON.stringify(listaDeUsuarios));
      localStorage.setItem("isUserLoged", JSON.stringify(updatedUser));
      console.log("Usuário removido com sucesso e atualizado");
    } else {
      console.log("Usuário não encontrado");
    }
  } else {
    console.log("Usuário não encontrado");
  }

  showEditForm();
}

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
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
      <div class="WrapperProducts">
        <div class="produtoName">
         ${produto.nome} 
        </div>

        <div class="produtoPreco">
         R$ ${produto.preco ? produto.preco.toFixed(2) : "N/A"}
        </div>
      </div>

      <div class="Amount">
       <p>Quantidade: ${produto.quantidade}</p>
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
    var itensCarrinho = document.querySelectorAll(".Minha-lista-carrinho li");
    return itensCarrinho.length > 0;
  }

  // Abrir o modal ao clicar no botão "Finalizar Compra"
  openModalBtn.addEventListener("click", function () {
    // Fechar o carrinho antes de abrir o modal
    document.querySelector(".carrinho").style.display = "none";
   

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

function finalizarCompra() {
  // Verifique se o carrinho está vazio
  if (carrinho.length === 0) {
    alert("Adicione itens ao carrinho antes de finalizar a compra.");
    return;
  }

  // Calcule o total de todos os produtos no carrinho
  const carrinhoTotal = carrinho.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);

  // Armazene o carrinho no localStorage para acessar na próxima página
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Armazene o total no localStorage
  localStorage.setItem("total", carrinhoTotal);

  // Redirecione para a página Waiting.html
  // setTimeout(() => {
  //   window.location.href = './assetes/WaitingForConfirmation/Waiting.html';
  // }, 2000);
}

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
