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

// Lógica de pesquisa ao clicar no botão "Pesquisar"
document.getElementById("searchButton").addEventListener("click", function () {
  var searchValue = document.getElementById("frutaInput").value;
  // Execute a ação de pesquisa com o valor inserido no campo de entrada aqui
  // Por exemplo, você pode redirecionar para uma página de resultados de pesquisa ou realizar uma solicitação AJAX.
});

const container = document.querySelector(".Produtos-container");
const carrinho = [];

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(productIndex) {
  const produto = produtos[productIndex];
  carrinho.push({ ...produto, quantidade: 1 });
  atualizarCarrinho();
  console.log(carrinho);
}

function atualizarCarrinho() {
  const listaItensCarrinho = document.getElementById("lista-itens-carrinho");
  listaItensCarrinho.innerHTML = "";

  carrinho.forEach((produto, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${produto.nome} - R$ ${produto.preco.toFixed(2)}
      <button onclick="aumentarQuantidade(${index})">+</button>
      <button onclick="diminuirQuantidade(${index})">-</button>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
      Quantidade: ${produto.quantidade}
    `;
    listaItensCarrinho.appendChild(listItem);
  });
}

function aumentarQuantidade(index) {
  carrinho[index].quantidade++;
  atualizarCarrinho();
}

function diminuirQuantidade(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    // Remover o item do carrinho se a quantidade for 1 ou menos
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
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

// por que os clientes nos amam?

const dadosDosCartoes = [
  {
    imagem: "./img/Pimentao.png",
    titulo: "Pimentão",
    quantidade: "22 Item",
    cor: "#fef4ea",
  },
  {
    imagem: "./img/Abobrinha.png",
    titulo: "Abobrinha ",
    quantidade: "15 Item",
    cor: "#eeeef9",
  },
  {
    imagem: "./img/lecumes.png",
    titulo: "Lecumes ",
    quantidade: "10 Item",
    cor: '#faeaea',
  },
  {
    imagem: "./img/batata-doce.png",
    titulo: "Batata-Doce",
    quantidade: "8 Item",
    cor: "#eeeef9",
  },
  {
    imagem: "./img/tomate1.png",
    titulo: "Tomate",
    quantidade: "30 Item",
    cor: "purple",
  },
  {
    imagem: "./img/Cenoura1.png",
    titulo: "Cenoura",
    quantidade: "12 Item",
    cor: "#fef4ea",
  },
 
];

const cartoesContainer = document.getElementById('categoria-container');

dadosDosCartoes.map((cartao) => {
  const div = document.createElement("div");
  div.className = `box box1 ${cartao.cor}`;
  div.innerHTML = `
    <img src="${cartao.imagem}" alt="" />
    <h2>${cartao.titulo}</h2>
    <span>${cartao.quantidade}</span>
    <i class="bx bx-right-arrow-alt"></i>
  `;
  cartoesContainer.appendChild(div);
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
    sugestoes.appendChild(li);
  });

  if (resultados.length > 0) {
    sugestoes.style.display = "block";
  } else {
    sugestoes.style.display = "none";
  }
}
