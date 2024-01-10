
document.addEventListener('DOMContentLoaded', function () {
  const carrinhoLocalStorage = localStorage.getItem('carrinho');

  if (carrinhoLocalStorage) {
      const carrinho = JSON.parse(carrinhoLocalStorage);
      const detalhesPedido = document.getElementById('detalhes-pedido');
      const formaPagamentoElement = document.getElementById('forma-pagamento'); // Add an element with id 'forma-pagamento' in your HTML

      // carrinho.forEach((produto) => {
      //     const item = document.createElement('li');
      //     item.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
      //     detalhesPedido.appendChild(item);

      // });
      // Source

      carrinho.forEach((produto) => {
        const item = document.createElement('li');
      
   
        const nomeElement = document.createElement('div');
        nomeElement.textContent = ` ${produto.nome}`;
        nomeElement.classList.add('nomeProduto'); 
        item.appendChild(nomeElement);

        const totalElement = document.createElement('div');
        totalElement.textContent = `Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
        totalElement.classList.add('totalProduto');
        item.appendChild(totalElement);
      
        const quantidadeElement = document.createElement('div');
        quantidadeElement.textContent = `Quantidade: ${produto.quantidade}`;
        quantidadeElement.classList.add('quantidadeProduto'); 
        item.appendChild(quantidadeElement);
      
        detalhesPedido.appendChild(item);
      });
      




   











      const totalElement = document.getElementById('total');
      const total = parseFloat(localStorage.getItem('total')) || 0;
      totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
      totalElement.classList.add("PrecoTotal");

      // Retrieve and display the payment method
      const formaPagamento = localStorage.getItem('formaPagamento');
      formaPagamentoElement.textContent = `Forma de Pagamento: ${formaPagamento || 'Não especificada'}`;
  }


  var pedidoSalvo = localStorage.getItem('pedido');

  if (pedidoSalvo) {
      var pedido = JSON.parse(pedidoSalvo);

      // Atualizar parágrafos ou elementos na tela com as informações do pedido
      document.getElementById('statusParagraph').innerText = 'Status do Pedido: ' + pedido.status;
      document.getElementById('notificationParagraph').innerText = 'Notificação ao Cliente: ' + (pedido.notificacao ? 'Sim' : 'Não');
      document.getElementById('preparationParagraph').innerText = 'Tempo de Preparo Estimado: ' + pedido.preparo;
      document.getElementById('deliveryParagraph').innerText = 'Hora Estimada de Entrega: ' + pedido.entrega + ':00';
  } else {
      alert('Nenhum pedido encontrado no localStorage.');
  }

});


function cancelarPedido() {

//     const carrinhoArmazenado = localStorage.getItem('carrinho');
//   if (!carrinhoArmazenado || JSON.parse(carrinhoArmazenado).length === 0) {
//     // Exibir mensagem de erro se o carrinho estiver vazio
//     alert("Não é possível cancelar o pedido sem itens. Adicione itens ao carrinho para cancelar.");
//     return;
//   }

    // Simulação de ação ao clicar no botão de cancelamento
    alert("Pedido cancelado com sucesso!");

    localStorage.removeItem('carrinho');
    localStorage.removeItem('total');

    const loader = document.querySelector('.contante_laoder')
    loader.style.display = 'flex';

    setTimeout(() => {
        // Use window.location.href diretamente sem a variável loader
       
        loader.style.display = 'none';
        window.location.href = '../../index.html';
    }, 2000);
}


  // Recuperar a mensagem de confirmação da sessionStorage
  var mensagemConfirmacao = sessionStorage.getItem("mensagemConfirmacao");

  // Verificar se há uma mensagem de confirmação
  if (mensagemConfirmacao) {
    // Exibir a mensagem ao usuário
    alert(mensagemConfirmacao);

    // Limpar a sessionStorage após exibir a mensagem (opcional)
    sessionStorage.removeItem("mensagemConfirmacao");
  } else {
    // Se não houver mensagem de confirmação, redirecionar de volta para a página do pedido
  }





// Simulação de atualização de status a cada 5 segundos
setInterval(() => {
    const statusMessage = document.getElementById('status-message');
    const orderNumber = document.getElementById('order-number');
    const confirmationTime = document.getElementById('confirmation-time');

    // Atualização fictícia do status
    statusMessage.innerText = 'Seu pedido foi confirmado e está em preparo.';
    orderNumber.innerText = '654321';
    confirmationTime.innerText = '20 minutos';
}, 5000);





function confirmarPedido() {
  // ... seu código atual

  // Salvar informações do pedido no localStorage
  salvarPedidoNoLocalStorage(statusOption, sendNotification, preparationTimeOption, horaEntrega);

  // Atualizar parágrafos na tela com as informações do pedido
  atualizarParagrafos();
}

function salvarPedidoNoLocalStorage(status, notificacao, preparo, entrega) {
  var pedido = {
      status: status,
      notificacao: notificacao,
      preparo: preparo,
      entrega: entrega
  };

  localStorage.setItem('pedido', JSON.stringify(pedido));
}

function exibirEstadoPedido() {
  var pedidoSalvo = localStorage.getItem('pedido');

  if (pedidoSalvo) {
      var pedido = JSON.parse(pedidoSalvo);

      // Atualizar parágrafos na tela com as informações do pedido
      atualizarParagrafos(pedido);
  } else {
      alert('Nenhum pedido encontrado no localStorage.');
  }
}


