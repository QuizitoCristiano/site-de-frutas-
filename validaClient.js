// Função para validar o formulário quando enviado
function validarFormularioClient(event) {
  // Resetar mensagens de erro
  clearErrors();

  // Obter os valores dos campos
  const nomeCompleto = obterValorCampo("nomeCompleto");
  const myCPF = obterValorCampo("myCPF");
  const endereco = obterValorCampo("Endereco");
  const telefone = obterValorCampo("celular");
  const bloco = obterValorCampo("bloco");
  const andar = obterValorCampo("andar");
  const apartamento = obterValorCampo("apartamento");

  // Validar campos
  validarCampoNome(nomeCompleto, event);
  validarCampoTelefone(telefone, event);
  validarCampoCPF(myCPF, event);
  validarCampoEndereco(endereco, event);
  validarCamposMoradia(bloco, andar, apartamento, event);

  if (!event.defaultPrevented) {
    alert("Formulário válido. Prosseguir com o envio.");
    const loader = document.querySelector('.contante_laoder')
    loader.style.display = 'flex'

    setTimeout(() => {
      loader.style.display = 'none';
      window.location.href = './assetes/WaitingForConfirmation/Waiting.html';
    }, 2000);
  }

  return false;
}


// Função para obter o valor de um campo do formulário por ID
function obterValorCampo(campoId) {
  return document.getElementById(campoId).value.trim();
}

// Função para validar o campo de nome
function validarCampoNome(nome, event) {
  console.log(event);  // Adicione este log para verificar o valor de event
  if (nome === "" || nome.split(" ").length < 2) {
    exibirErro("nomeCompletoErro", "Informe o nome completo.");
    event.preventDefault();
  }
}



// Função para validar o campo de telefone
function validarCampoTelefone(telefone, event) {
  if (telefone === "" || !valitaCelular(telefone)) {
    exibirErro("celularErro", "Por favor, digite um número válido.");
    event.preventDefault();
  }
}

// Função para validar o campo de CPF
function validarCampoCPF(cpf, event) {
  if (cpf === "" || !validarCPF(cpf)) {
    exibirErro("cpfError", "Por favor, digite um CPF válido.");
    event.preventDefault();
  }
}

// Função para validar o campo de endereço
function validarCampoEndereco(endereco, event) {
  if (endereco === "" || !validarEndereco(endereco)) {
    exibirErro("enderecoErro", 'O endereço deve começar com "Rua" ou "Avenida".');
    event.preventDefault();
  }
}

// Função para validar os campos de moradia (Bloco, Andar, Apartamento)
function validarCamposMoradia(bloco, andar, apartamento, event) {
  if (bloco === "" && andar === "" && apartamento === "") {
    exibirErro("blocoErro", "Preencha pelo menos uma opção entre Bloco, Andar ou Apartamento.");
    event.preventDefault();
  }
}

// Restante do código permanece inalterado

// Função para limpar um erro específico
function clearError(errorId) {
  var errorElement = document.getElementById(errorId);
  errorElement.textContent = "";
  errorElement.style.color = "";
}

// Função para limpar todos os erros
function clearErrors() {
  var errorElements = document.getElementsByClassName("error");
  for (let index = 0; index < errorElements.length; index++) {
    clearError(errorElements[index].id);
  }
}

// Função para exibir um erro específico
function exibirErro(elementId, message) {
  var errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.color = "red";
}

// Restante do código permanece inalterado

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
