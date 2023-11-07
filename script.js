var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const menuIcon = document.querySelector('#menu-icon');

const navbar = document.querySelector('.navbar');


menuIcon.addEventListener('click', function() {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

window.onscroll = () => {
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}






// Abra o modal ao clicar no ícone de pesquisa
document.getElementById("openModal").addEventListener("click", function() {
  document.getElementById("searchModal").style.display = "block";
});

// Feche o modal quando o botão "Fechar" (X) é clicado
document.getElementById("closeModal").addEventListener("click", function() {
  document.getElementById("searchModal").style.display = "none";
});

// Feche o modal se o usuário clicar fora da área do modal
window.addEventListener("click", function(event) {
  var modal = document.getElementById("searchModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
});

// Lógica de pesquisa ao clicar no botão "Pesquisar"
document.getElementById("searchButton").addEventListener("click", function() {
  var searchValue = document.getElementById("frutaInput").value;
  // Execute a ação de pesquisa com o valor inserido no campo de entrada aqui
  // Por exemplo, você pode redirecionar para uma página de resultados de pesquisa ou realizar uma solicitação AJAX.
});






// Array de URLs de imagens para os cartões de produtos
const productImages = [
  './image/Maracuja.png',
  './image/pessego1.png',
  './image/legumes.jpg',
  ' ./image/batata.png',
  './image/senoura.png ',
  './image/uva.png ',
  './image/papaia.png',
  './image/cereja.jpg',
  './image/lecumes.png',
  './image/frutas2.png'

  // Adicione mais URLs de imagens conforme necessário
];

// Número desejado de cartões a serem criados (neste caso, 10)
const numberOfCards = 10;

// Elemento no qual você deseja inserir os cartões
const container = document.querySelector('.Produtos-container');

for (let i = 0; i < numberOfCards; i++) {
  // Use o operador de módulo (%) para alternar entre as imagens
  const imageUrl = productImages[i % productImages.length];

  const productCardHTML = `
    <div class="box">
      <img src="${imageUrl}" alt="" />
      <h2>
        Frutas orgânicas <br />'
        frescas 250g
      </h2>
      <h3 class="price">R$: 7.99 <span>kg</span></h3>
      <i class="bx bx-cart-alt"></i>
      <i class="bx bx-heart"></i>
      <span class="discount">-25%</span>
    </div>
  `;

  container.innerHTML += productCardHTML;
}


// por que os clientes nos amam?


{/* <input type="text" id="frutaInput" oninput="sugerirFrutas()">
<ul id="frutaSugestoes"></ul> */}


const frutas = [
  'Maçã', 'Banana', 'Laranja', 'Uva', 'Morango',
  'Abacaxi', 'Pera', 'Manga', 'Melancia', 'Kiwi',
  'Cereja', 'Limão', 'Limão-siciliano', 'Pêssego',
  'Framboesa', 'Amora', 'Mirtilo', 'Caju', 'Maracujá', 'Goiaba'
];

function sugerirFrutas() {
  const input = document.getElementById('frutaInput').value.toLowerCase();
  const sugestoes = document.getElementById('frutaSugestoes');
  sugestoes.innerHTML = '';

  if (input.length === 0) {
    sugestoes.style.display = 'none';
    return;
  }

  const resultados = frutas.filter(fruta => fruta.toLowerCase().includes(input));
  resultados.forEach(resultado => {
    const li = document.createElement('li');
    li.textContent = resultado;
    sugestoes.appendChild(li);
  });

  if (resultados.length > 0) {
    sugestoes.style.display = 'block';
  } else {
    sugestoes.style.display = 'none';
  }
}

