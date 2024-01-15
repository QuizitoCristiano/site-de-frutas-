document.addEventListener('DOMContentLoaded', function () {
    const selectEstado = document.getElementById("estado");

    // Lista de estados do Brasil
    const estados = [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
        "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
        "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
        "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina",
        "São Paulo", "Sergipe", "Tocantins"
    ];

    // Adicionando as opções ao elemento select
    estados.forEach((estado) => {
        const option = document.createElement("option");
        option.value = estado.toLowerCase(); // Defina o valor como minúsculo, se necessário
        option.text = estado;
        selectEstado.add(option);
    });

    const localizacaoModal = document.getElementById('localizacaoModal');
    const localizacaoForm = document.getElementById('localizacaoForm');

    // Abre o modal ao carregar a página
    const instance = M.Modal.init(localizacaoModal);
    instance.open();

    // Adiciona um evento de envio para o formulário
    localizacaoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const estadoSelecionado = document.getElementById('estado').value;
        const cidadeSelecionada = document.getElementById('cidade').value;

        // Agora você pode usar os valores do estado e cidade para personalizar a experiência do usuário,
        // como buscar mercados específicos com base na localização.

        // Redirecione ou faça outras ações conforme necessário
        window.location.href = `./home.html?estado=${estadoSelecionado}&cidade=${cidadeSelecionada}`;
    });
});