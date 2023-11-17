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
      <i class="bx bx-heart" onclick="trocarIconDeFrutas(this)"></i>
    </div>
  `;
  container.innerHTML += productCardHTML;


});

// Função para trocar o ícone do coração;
function trocarIconDeFrutas(el) {
  if (el.classList.contains('bx-heart')) {
    el.classList.remove('bx-heart');
    el.classList.add('bxs-heart');
  } else {
    el.classList.remove('bxs-heart');
    el.classList.add('bx-heart');
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

// Função para trocar o ícone do coração
function trocarIcone(element) {
  if (element.classList.contains('bx-heart')) {
    element.classList.remove('bx-heart');
    element.classList.add('bxs-heart');
  } else {
    element.classList.remove('bxs-heart');
    element.classList.add('bx-heart');
  }
}

// por que os clientes nos amam?


document.addEventListener('DOMContentLoaded', function () {
  var openModalBtn = document.getElementById('openModalBtn');
  var modal = document.getElementById('myModal');
  var fecharModalClicado = document.getElementById('fechar-modal');

  // Abrir o modal ao clicar no botão
  openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  fecharModalClicado.addEventListener('click', function (e) {
    modal.style.display = 'none';
  })
  // Fechar o modal ao clicar no botão de fechar ou fora dele
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

});







function validarCliente() {
  // Obtendo os valores dos campos
  const bloco = document.getElementById('bloco').value;
  const andar = document.getElementById('andar').value;
  const apartamento = document.getElementById('apartamento').value;
  const NomeElemento = document.querySelector('#Nome');

  if (NomeElemento.value === '') {
    NomeElemento.style.border = '1px solid red'; 
  }
  // Validando os campos (exemplo simples)
  if (bloco.trim() === '' && andar.trim() === '' && apartamento.trim() === '') {
    // Adiciona uma classe CSS para alterar a cor dos campos
    document.getElementById('bloco').classList.add('campo-vazio');
    document.getElementById('andar').classList.add('campo-vazio');
    document.getElementById('apartamento').classList.add('campo-vazio');

    alert('Por favor, preencha pelo menos um campo.');
    return;
  }


 
  // Adicione aqui sua lógica de validação adicional, se necessário

  // Se pelo menos um campo estiver preenchido, faça algo, como enviar os dados para o servidor
  alert('Cliente validado com sucesso!');
  // Aqui você pode adicionar a lógica para enviar os dados para o servidor ou realizar outras ações
}











// Customer Review Elements
const dadosDosClientes = [
  {
    nome: 'Quizito Cristiano',
    customerImage: "./image/sol.jpg",
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `

  },
  {
    nome: 'Rafael T.',
    customerImage: "./image/quizito2.jpeg",
    message: `
    A Delicacty é a minha salvação quando estou sem tempo para ir ao
    supermercado. Eles entregam tão rapidamente que nunca fico sem
    frutas e legumes frescos em casa. E os descontos são uma grande
    ajuda para o orçamento.
    `

  },

  {
    nome: 'Sandro',
    customerImage: "./image/mamae.jpeg",
    message: `
    Os produtos da Delicacty são tão frescos que parece que acabei de
    colhê-los eu mesmo. A entrega rápida é um grande benefício,
    especialmente quando estou ocupado. Os descontos também são muito
    apreciados!
    `

  },

  {
    nome: 'Pedro Henrique',
    customerImage: "./image/nascerd-o-sol.jpg",
    message: `
    Nunca encontrei uma loja online que entregasse tão rapidamente
    quanto a Delicacty. Além disso, os produtos são de alta qualidade, e
    os descontos regulares são um bônus adicional que economiza meu
    dinheiro.
    `

  },

  {
    nome: 'Mariana Dos Santos',
    customerImage: "./image/Quizito.jpeg",
    message: `
    A Delicacty sempre me surpreende com a qualidade impecável dos
    produtos. Os legumes são frescos e as frutas são deliciosas. Além
    disso, a entrega rápida é um grande diferencial. Mal posso esperar
    para fazer meu próximo pedido!
    `

  },
  {
    nome: 'Temótio Luiz',
    customerImage: "./image/temotio.jpeg",
    message: `
    A Delicacty é a minha opção número um para alimentos frescos. A
    qualidade é impecável, a entrega é super rápida, e os descontos
    frequentes me fazem voltar sempre. Uma loja incrível!
    `

  },



]

const myCustomers = document.querySelector('.customers-container');

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























// Função para abrir o modal
function finalizar(e) {
  abrirNovoModal.classList.add("showNewModal");
}

// Função para fechar o modal
function fecharModal() {
  abrirNovoModal.classList.remove("showNewModal");
}

// Event listener para controlar cliques
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('finalizar-compra')) {
    finalizar(e); // Abrir o modal
  } else if (e.target.classList.contains("bx-x")) {
    fecharModal(); // Fechar o modal
  } else if (e.target.classList.contains("enviar")) {
    // Aqui você pode adicionar a lógica para o botão "Enviar" se necessário
    fecharModal(); // Fechar o modal após enviar
  }
});





