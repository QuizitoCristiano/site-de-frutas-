const formulario = document.querySelector('.Mymodal-content');

formulario.addEventListener('submit', function(event) {
  // Chama a função validarCliente quando o formulário é enviado
  validarCliente(event);
});

function validarCliente(event) {
  // Resetar mensagens de erro
  clearErrors();

  // Obter os valores dos campos
  const nomeCompleto = document.getElementById("nomeCompleto").value;
  const myCPF = document.getElementById("myCPF").value;
  const endereco = document.getElementById("Endereco").value;
  const telefone = document.getElementById("celular").value;
  const bloco = document.getElementById("bloco").value;
  const andar = document.getElementById("andar").value;
  const apartamento = document.getElementById("apartamento").value;

  if (nomeCompleto.trim() === "" || nomeCompleto.split(" ").length < 2) {
    exibirErro("nomeCompletoErro", "Informe o nome completo.");
    event.preventDefault();  // Impede o envio do formulário se houver erro
    return;
  }

  if (telefone.trim() === "" || !valitaCelular(telefone)) {
    exibirErro("celularErro", "Por favor, digite um número válido.");
    event.preventDefault();  // Impede o envio do formulário se houver erro
    return;
  }


  if (myCPF.trim() === "" || !validarCPF(myCPF)) {
    exibirErro("cpfError", "Por favor, digite um CPF válido.");
    event.preventDefault();  // Impede o envio do formulário se houver erro
    return;
  }

  if (endereco.trim() === "" || !validarEndereco(endereco)) {
    exibirErro("enderecoErro", 'O endereço deve começar com "Rua" ou "Avenida".');
    event.preventDefault();  // Impede o envio do formulário se houver erro
    return;
  }

  if (bloco.trim() === "" && andar.trim() === "" && apartamento.trim() === "") {
    exibirErro(
      "Preencha pelo menos uma opção entre Bloco, Andar ou Apartamento."
    );
    event.preventDefault();  // Impede o envio do formulário se houver erro
    return;
  }

  // Se todas as validações passarem, pode prosseguir com o envio do formulário ou outra ação desejada
  // ...

  alert("Formulário válido. Prosseguir com o envio.");
}


// Restante do código permanece inalterado

function validarEndereco(endereco) {
  // Expressão regular para verificar se o endereço começa com "Rua" ou "Avenida"
  const regex = /^(Rua|Avenida)\s/i;

  if (!regex.test(endereco)) {
    exibirErro('O endereço deve começar com "Rua" ou "Avenida".');
    return false;
  }

  clearError('enderecoErro');
  return true;
}



function exibirErro(elementId, message) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.color = "red";
}

function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula os dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos calculados são iguais aos dígitos do CPF
  return (
    digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10))
  );
}

function valitaCelular(telefone) {
  //retira todos os caracteres menos os numeros
  telefone = telefone.replace(/\D/g, "");

  //verifica se tem a qtde de numero correto
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  //Se tiver 11 caracteres, verificar se começa com 9 o celular
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
    return false;

  //verifica se não é nenhum numero digitado errado (propositalmente)
  for (var n = 0; n < 10; n++) {
    //um for de 0 a 9.
    //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
    //caractere a ser repetido
    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n))
      return false;
  }
  //DDDs validos
  var codigosDDD = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];
  //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
    return false;

  if (new Date().getFullYear() < 2017) return true;
  if (
    telefone.length == 10 &&
    [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1
  )
    return false;

  //se passar por todas as validações acima, então está tudo certo
  return true;
}

function clearError(errorId) {
  var errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  errorElement.style.color = "red";
}

function clearErrors() {
  var errorElements = document.getElementsByClassName("error");
  for (let index = 0; index < errorElements.length; index++) {
    const element = (errorElements[index].textContent = "");
  }
}
