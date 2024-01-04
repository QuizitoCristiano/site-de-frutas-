document.addEventListener('DOMContentLoaded', function () {

    const carrinhoLocalStorage = localStorage.getItem('carrinho');
    if (carrinhoLocalStorage) {
        const carrinho = JSON.parse(carrinhoLocalStorage);

        // Agora você pode usar o carrinho na página Waiting.html conforme necessário
        // Por exemplo, exibindo os itens na seção de detalhes do pedido
        const detalhesPedido = document.getElementById('detalhes-pedido');

        carrinho.forEach((produto) => {
            const item = document.createElement('li');
            item.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;
            detalhesPedido.appendChild(item);
        });
    }

    const totalElement = document.getElementById('total');
    const total = parseFloat(localStorage.getItem('total')) || 0; // Recupera o total do localStorage

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
});



function cancelarPedido() {
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





