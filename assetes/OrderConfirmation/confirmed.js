document.addEventListener("DOMContentLoaded", function () {
  // Obter os dados armazenados no localStorage
  const dadosArmazenados = localStorage.getItem("dadosCliente");
  const dadosCliente = JSON.parse(dadosArmazenados);

  // Atualizar o DOM com os dados do cliente
  document.getElementById("andar").textContent = dadosCliente.andar;
  document.getElementById("apartamento").textContent = dadosCliente.apartamento;
  document.getElementById("bloco").textContent = dadosCliente.bloco;
  document.getElementById("cpf").textContent = dadosCliente.cpf;
  document.getElementById("email").textContent = dadosCliente.email;
  document.getElementById("endereco").textContent = dadosCliente.endereco;
  document.getElementById("nomeCompleto").textContent =
    dadosCliente.nomeCompleto;
  document.getElementById("telefone").textContent = dadosCliente.telefone;

  // Exibir dados dinamicamente
  exibirDado("andar", dadosCliente.andar);
  exibirDado("bloco", dadosCliente.bloco);
  exibirDado("apartamento", dadosCliente.apartamento);

  // Função para exibir dados dinamicamente
  function exibirDado(elementId, dado) {
    const elemento = document.getElementById(elementId);
    if (dado !== undefined && dado !== null && dado.trim() !== "") {
      elemento.textContent = dado;
    } else {
      // Ocultar o parágrafo se o dado não estiver disponível
      elemento.parentElement.style.display = "none";
    }
  }

  const carrinhoLocalStorage = localStorage.getItem("carrinho");
  if (carrinhoLocalStorage) {
    const carrinho = JSON.parse(carrinhoLocalStorage);

    
    const resumoDoPedido = document.getElementById("orderItems");

    // carrinho.forEach((produto) => {
    //   const item = document.createElement("li");
    //   item.textContent = `${produto.nome} - Quantidade: ${
    //     produto.quantidade
    //   } - Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
    //   resumoDoPedido.appendChild(item);
    // });


    carrinho.forEach((produto) => {
      const item = document.createElement("li");
    
     
      const nomeElement = document.createElement("div");
      nomeElement.textContent = ` Nome: ${produto.nome}`;
      nomeElement.classList.add("produtoNome")
      item.appendChild(nomeElement);

      const precoElement = document.createElement("div");
      precoElement.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
      precoElement.classList.add("preco");
      item.appendChild(precoElement);

      const totalElement = document.createElement("div");
      totalElement.textContent = `Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
      totalElement.classList.add("produtoTota");
      item.appendChild(totalElement);
    
      const quantidadeElement = document.createElement("div");
      quantidadeElement.textContent = `Quantidade: ${produto.quantidade}`;
      quantidadeElement.classList.add("quantidade"); 
      item.appendChild(quantidadeElement);
    
    
      // Adicionar o item à lista
      resumoDoPedido.appendChild(item);
    });
    
  }

  const resumoDoPedidoTotal = document.getElementById("resumoDoPedidoTotal");
  const total = parseFloat(localStorage.getItem("total")) || 0;

  resumoDoPedidoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

  const dadosDoCliente = localStorage.getItem("dadosCliente");
  let dadosClienteObj;
  
  try {
    dadosClienteObj = JSON.parse(dadosDoCliente);
  } catch (error) {
    console.error("Erro ao analisar dadosCliente:", error);
  }
  
  const formaPagamento = dadosClienteObj && dadosClienteObj.formaPagamento;
  
  const formaDePagamento = document.getElementById("formaDePagamento");
  formaDePagamento.textContent = `Forma de Pagamento: ${
    formaPagamento || "Não especificada"
  }`;
});


const tempoPreparoElement = document.getElementById("tempoPreparo");

// Defina o tempo estimado de preparo em segundos (por exemplo, 10 minutos)
const tempoEstimadoPreparoSegundos = 600;

// Atualize o temporizador a cada segundo
const temporizador = setInterval(() => {
  if (tempoEstimadoPreparoSegundos > 0) {
    tempoEstimadoPreparoSegundos--;
    const minutos = Math.floor(tempoEstimadoPreparoSegundos / 60);
    const segundos = tempoEstimadoPreparoSegundos % 60;
    tempoPreparoElement.textContent = `Tempo estimado de preparo: ${minutos}:${segundos}`;
  } else {
    clearInterval(temporizador);
    tempoPreparoElement.textContent = "Seu pedido está pronto!";
  }
}, 1000);





function rejeitarPedido() {
  // Verificar se há itens no carrinho
  // const carrinhoArmazenado = localStorage.getItem('carrinho');
  // if (!carrinhoArmazenado || JSON.parse(carrinhoArmazenado).length === 0) {
  //   // Exibir mensagem de erro se o carrinho estiver vazio
  //   alert("Não é possível cancelar o pedido sem itens. Adicione itens ao carrinho para cancelar.");
  //   return;
  // }

  // Simulação de ação ao clicar no botão de cancelamento
  alert("Pedido foi cancelado com sucesso!");

  // Limpar o carrinho e total do localStorage
  localStorage.removeItem("carrinho");
  localStorage.removeItem("total");
  localStorage.removeItem("dadosCliente");
  const loader = document.querySelector(".contante_laoder");
  loader.style.display = "flex";

  setTimeout(() => {
    // Use window.location.href diretamente sem a variável loader
    loader.style.display = "none";
    window.location.href = "../../index.html";
  }, 2000);
}

function confirmarPedido() {
  // Exibir mensagem ao usuário
  alert("Seu pedido foi confirmado!");
  sessionStorage.setItem("mensagemConfirmacao", "Seu pedido foi confirmado!");

  // Oferecer mais opções ao atendente
}
