var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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
  const tagCarinho = document.querySelector('.counter')
  const produto = produtosArray[productIndex];
  carrinho.push({ ...produto, quantidade: 1, isVegetable });
  atualizarCarrinho();
  calcularTotal();
  tagCarinho.innerHTML = carrinho.length && 
  `${carrinho.length}`;
}

function atualizarCarrinho() {
  listaItensCarrinho.innerHTML = "";

  carrinho.forEach((produto, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${produto.nome} - R$ ${produto.preco ? produto.preco.toFixed(2) : "N/A"}
      <button onclick="aumentarQuantidade(${index})">+</button>
      <button onclick="diminuirQuantidade(${index})">-</button>
      <i class='bx bxs-trash-alt' id="trash-alt" onclick="removerDoCarrinho(${index})"></i>
      Quantidade: ${produto.quantidade}
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
      <i class="bx bx-heart"></i>
    </div>
  `;
  container.innerHTML += productCardHTML;
});

produtoLegumes.forEach((myVegetableProducts, index) => {
  const productCardHTML = `
    <div class="wrapper">
      <img src="${myVegetableProducts.img}" alt="" />
      <h2>${myVegetableProducts.nome}</h2>
      <h3 class="price">R$: ${myVegetableProducts.preco.toFixed(
        2
      )} <span>kg</span></h3>
      <i class="bx bx-cart-alt" onclick="adicionarAoCarrinho(${index}, true)"></i>
      <i class="bx bx-heart"></i>
    </div>
  `;
  mayContainer.innerHTML += productCardHTML;
});

// por que os clientes nos amam?

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
    backgroundColor: "purple",
  },
  {
    imagem: "./img/Cenoura1.png",
    titulo: "Cenoura",
    quantidade: "12 Item",
    backgroundColor: "red !important",
  },
];

const cartoesContainer = document.getElementById("categoria-container");

dadosDosCartoes.map((cartao) => {
  const div = document.createElement("div");
  div.className = `box box1 ${cartao.backgroundColor}`;
  div.innerHTML = `
    <img src="${cartao.imagem}" alt="" />
    <h2>${cartao.titulo}</h2>
    <span>${cartao.quantidade}</span>
    <i class="bx bx-right-arrow-alt"></i>
  `;
  cartoesContainer.appendChild(div);
});
