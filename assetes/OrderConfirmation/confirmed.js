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






// function confirmarPedido() {
//   var statusOption = document.getElementById("statusUpdateOptions").value;
//   var sendNotification = document.getElementById("sendNotification").checked;
//   var preparationTimeOption = document.getElementById("preparationTimeOptions").value;
//   var selectedHour = document.getElementById("selectedHour").value;

//   var preparationTimeDiv = document.querySelector(".preparationTimeDiv");
//   var notificationsDiv = document.querySelector(".notificationsDiv");
//   var statusOptionsDiv = document.querySelector(".statusOptionsDiv");

//   preparationTimeDiv.classList.remove("error", "success");
//   notificationsDiv.classList.remove("error", "success");
//   statusOptionsDiv.classList.remove("error", "success");

//   if ((statusOption === "" && !sendNotification) || preparationTimeOption === "" || selectedHour === "") {
//       alert("Por favor, preencha todas as opções e selecione um horário.");

//       preparationTimeDiv.classList.add("error");
//       notificationsDiv.classList.add("error");
//       statusOptionsDiv.classList.add("error");
//   } else {
//       console.log("Status do pedido: " + statusOption);

//       if (sendNotification) {
//           console.log("Notificação ao cliente enviada.");
//       }

//       console.log("Tempo estimado de preparo: " + preparationTimeOption);

//       // Calcular a hora estimada de entrega
//       var horaAtual = new Date().getHours();
//       var horaPreparo = parseInt(preparationTimeOption) + parseInt(selectedHour);
//       var horaEntrega = Math.min(20, horaAtual + horaPreparo);

//       console.log("Hora estimada de entrega: " + horaEntrega + ":00");

//       alert("Pedido confirmado com sucesso!\nHora estimada de entrega: " + horaEntrega + ":00");

//       preparationTimeDiv.classList.add("success");
//       notificationsDiv.classList.add("success");
//       statusOptionsDiv.classList.add("success");
//   }
// }



// function confirmarPedido() {
//   var statusOption = document.getElementById("statusUpdateOptions").value;
//   var sendNotification = document.getElementById("sendNotification").checked;
//   var preparationTimeOption = document.getElementById("preparationTimeOptions").value;
//   var selectedPreparationHour = document.getElementById("selectedPreparationHour");
//   var selectedDeliveryHour = document.getElementById("selectedDeliveryHour");

//   var preparationTimeDiv = document.querySelector(".preparationTimeDiv");
//   var notificationsDiv = document.querySelector(".notificationsDiv");
//   var statusOptionsDiv = document.querySelector(".statusOptionsDiv");

//   preparationTimeDiv.classList.remove("error", "success");
//   notificationsDiv.classList.remove("error", "success");
//   statusOptionsDiv.classList.remove("error", "success");

//   if (
//       (statusOption === "" && !sendNotification) ||
//       preparationTimeOption === "" ||
//       selectedPreparationHour.value === "" ||
//       selectedDeliveryHour.value === ""
//   ) {
//       alert("Por favor, preencha todas as opções e selecione os horários.");

//       preparationTimeDiv.classList.add("error");
//       notificationsDiv.classList.add("error");
//       statusOptionsDiv.classList.add("error");
//       selectedDeliveryHour.classList.add("error");
//       selectedPreparationHour.classList.add("error");

//   } else {
//       console.log("Status do pedido: " + statusOption);

//       if (sendNotification) {
//           console.log("Notificação ao cliente enviada.");
//       }

//       console.log("Tempo estimado de preparo: " + preparationTimeOption);

//       // Calcular a hora estimada de entrega
//       var horaAtual = new Date().getHours();
//       var horaPreparo = parseInt(preparationTimeOption) + parseInt(selectedPreparationHour.value);
//       var horaEntrega = Math.min(20, horaAtual + horaPreparo);

//       console.log("Hora estimada de entrega: " + horaEntrega + ":00");

//       // Adicionar a lógica para calcular a hora estimada de entrega com base na hora selecionada para a entrega
//       var horaEstimadaEntrega = parseInt(selectedDeliveryHour.value);

//       console.log("Hora estimada de entrega (baseada na seleção do cliente): " + horaEstimadaEntrega + ":00");

//       alert("Pedido confirmado com sucesso!\nHora estimada de entrega (baseada na seleção do cliente): " + horaEstimadaEntrega + ":00");

//       preparationTimeDiv.classList.add("success");
//       notificationsDiv.classList.add("success");
//       statusOptionsDiv.classList.add("success");
//       selectedDeliveryHour.classList.add("success");
//       selectedPreparationHour.classList.add("success");
//   }
// }


function confirmarPedido() {
  var statusOption = document.getElementById("statusUpdateOptions").value;
  var sendNotification = document.getElementById("sendNotification").checked;
  var preparationTimeOption = document.getElementById("preparationTimeOptions").value;
  var selectedPreparationHour = document.getElementById("selectedPreparationHour");
  var selectedDeliveryHour = document.getElementById("selectedDeliveryHour");

  var preparationTimeDiv = document.querySelector(".preparationTimeDiv");
  var notificationsDiv = document.querySelector(".notificationsDiv");
  var statusOptionsDiv = document.querySelector(".statusOptionsDiv");

  preparationTimeDiv.classList.remove("error", "success");
  notificationsDiv.classList.remove("error", "success");
  statusOptionsDiv.classList.remove("error", "success");

  if (
      (statusOption === "" && !sendNotification) ||
      preparationTimeOption === "" ||
      selectedPreparationHour.value === "" ||
      selectedDeliveryHour.value === ""
  ) {
      alert("Por favor, preencha todas as opções e selecione os horários.");

      preparationTimeDiv.classList.add("error");
      notificationsDiv.classList.add("error");
      statusOptionsDiv.classList.add("error");
      selectedDeliveryHour.classList.add("error");
      selectedPreparationHour.classList.add("error");

  } else {
      console.log("Status do pedido: " + statusOption);

      if (sendNotification) {
          console.log("Notificação ao cliente enviada.");
      }

      console.log("Tempo estimado de preparo: " + preparationTimeOption);

      // Calcular a hora estimada de entrega
      var horaAtual = new Date().getHours();
      var horaPreparo = parseInt(preparationTimeOption) + parseInt(selectedPreparationHour.value);
      var horaEntrega = Math.min(20, horaAtual + horaPreparo);

      console.log("Hora estimada de entrega: " + horaEntrega + ":00");

      // Adicionar a lógica para calcular a hora estimada de entrega com base na hora selecionada para a entrega
      var horaEstimadaEntrega = parseInt(selectedDeliveryHour.value);

      console.log("Hora estimada de entrega (baseada na seleção do cliente): " + horaEstimadaEntrega + ":00");

      alert("Pedido confirmado com sucesso!\nHora estimada de entrega (baseada na seleção do cliente): " + horaEstimadaEntrega + ":00");

      preparationTimeDiv.classList.add("success");
      notificationsDiv.classList.add("success");
      statusOptionsDiv.classList.add("success");
      selectedDeliveryHour.classList.add("success");
      selectedPreparationHour.classList.add("success");

      // Salvar informações do pedido no localStorage
      salvarPedidoNoLocalStorage(statusOption, sendNotification, preparationTimeOption, horaEntrega);
  }
}

function salvarPedidoNoLocalStorage(status, notificacao, preparo, entrega) {
  var pedido = {
      status: status,
      notificacao: notificacao,
      preparo: preparo,
      entrega: entrega
  };

  // Converte o objeto em uma string JSON e salva no localStorage
  localStorage.setItem('pedido', JSON.stringify(pedido));
}

function exibirEstadoPedido() {
  // Recupera as informações do pedido do localStorage
  var pedidoSalvo = localStorage.getItem('pedido');

  if (pedidoSalvo) {
      // Converte a string JSON de volta para um objeto
      var pedido = JSON.parse(pedidoSalvo);

      // Exibe as informações do pedido (você pode personalizar isso conforme necessário)
      alert('Status do Pedido: ' + pedido.status +
          '\nNotificação ao Cliente: ' + (pedido.notificacao ? 'Sim' : 'Não') +
          '\nTempo de Preparo Estimado: ' + pedido.preparo +
          '\nHora Estimada de Entrega: ' + pedido.entrega + ':00');
  } else {
      alert('Nenhum pedido encontrado no localStorage.');
  }
}