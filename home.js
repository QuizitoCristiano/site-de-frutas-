// Frutas


const produtos = [
    {
      nome: "Angeloni",
      img: "./image/Angilone.png",
    
    },
    {
      nome: "Muffato",
      img: "./image/muffato3.png",
   
    },
    {
      nome: "Verde Mais",
      img: "./image/Verdemais.png",
  
    },
    {
      nome: "Komprão",
      img: "./image/Komprao.png",

    },
    {
      nome: "Atacadão",
      img: "./image/Atacadao1.png",
  
    },
    {
      nome: " Pague Menos",
      img: "./image/gilassi.png",
      
    },
   
    
]


const container = document.querySelector(".Produtos-container");
produtos.forEach((produto, index) => {
    const productCardHTML = `
      <div class="box">
        <img src="${produto.img}" alt="" />
        <h2>${produto.nome}</h2>
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