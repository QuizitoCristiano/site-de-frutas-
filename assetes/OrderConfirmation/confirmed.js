

document.addEventListener("DOMContentLoaded", function () {
  // Obter os dados armazenados no localStorage
  const dadosArmazenados = localStorage.getItem('dadosCliente');
  const dadosCliente = JSON.parse(dadosArmazenados);

  // Atualizar o DOM com os dados do cliente
  document.getElementById("andar").textContent = dadosCliente.andar;
  document.getElementById("apartamento").textContent = dadosCliente.apartamento;
  document.getElementById("bloco").textContent = dadosCliente.bloco;
  document.getElementById("cpf").textContent = dadosCliente.cpf;
  document.getElementById("email").textContent = dadosCliente.email;
  document.getElementById("endereco").textContent = dadosCliente.endereco;
  document.getElementById("formaPagamento").textContent = dadosCliente.formaPagamento;
  document.getElementById("nomeCompleto").textContent = dadosCliente.nomeCompleto;
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
      elemento.parentElement.style.display = 'none';
    }
  }



  const carrinhoLocalStorage = localStorage.getItem('carrinho');
  if (carrinhoLocalStorage) {
    const carrinho = JSON.parse(carrinhoLocalStorage);

    // Agora você pode usar o carrinho na página Waiting.html conforme necessário
    // Por exemplo, exibindo os itens na seção de detalhes do pedido
    const resumoDoPedido = document.getElementById('orderItems');

    carrinho.forEach((produto) => {
      const item = document.createElement('li');
      item.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
      resumoDoPedido.appendChild(item);
    });
  }

  const resumoDoPedidoTotal = document.getElementById('resumoDoPedidoTotal');
  const total = parseFloat(localStorage.getItem('total')) || 0; // Recupera o total do localStorage

  resumoDoPedidoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;




});








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
  localStorage.removeItem('carrinho');
  localStorage.removeItem('total');

  const loader = document.querySelector('.contante_laoder');
  loader.style.display = 'flex';

  setTimeout(() => {
    // Use window.location.href diretamente sem a variável loader
    loader.style.display = 'none';
    window.location.href = '../../index.html';
  }, 2000);
}





function confirmarPedido() {
  // Exibir mensagem ao usuário
  alert("Seu pedido foi confirmado!");
  sessionStorage.setItem("mensagemConfirmacao", "Seu pedido foi confirmado!");

  // Oferecer mais opções ao atendente
;
}






