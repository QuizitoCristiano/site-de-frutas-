// Simule dados do pedido
const orderItems = ["Maçãs (2kg)", "Bananas (1kg)", "Tomates (500g)"];




// Atualize o DOM com os dados simulados
document.getElementById("orderItems").innerHTML = orderItems.map(item => `<li>${item}</li>`).join('');

// Adicione lógica adicional conforme necessário


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
    });