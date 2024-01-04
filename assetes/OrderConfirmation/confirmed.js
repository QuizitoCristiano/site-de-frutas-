// Simule dados do pedido
const orderItems = ["Maçãs (2kg)", "Bananas (1kg)", "Tomates (500g)"];
const customerName = "João da Silva";
const customerPhone = "(11) 98765-4321";
const customerEmail =  'joaosilva24@gmail.com'
const deliveryAddress = "Rua Principal, 123 - Bloco A, Apto 101";
const specialInstructions = "Sem açúcar, por favor";
const orderStatus = "Aguardando Confirmação";
const preparationTime = "30 minutos";
const paymentDetails = "Cartão de Crédito";
const supportEmail = "suporte@delicacy.com";
const supportPhone = "(11) 1234-5678";

// Atualize o DOM com os dados simulados
document.getElementById("orderItems").innerHTML = orderItems.map(item => `<li>${item}</li>`).join('');
document.getElementById("customerName").textContent = customerName;
document.getElementById("customerPhone").textContent = customerPhone;
document.getElementById("customerEmail").textContent = customerEmail;
document.getElementById("deliveryAddress").textContent = deliveryAddress;
document.getElementById("specialInstructions").textContent = specialInstructions;
document.getElementById("orderStatus").textContent = orderStatus;
document.getElementById("preparationTime").textContent = preparationTime;
document.getElementById("paymentDetails").textContent = paymentDetails;
document.getElementById("supportEmail").textContent = supportEmail;
document.getElementById("supportPhone").textContent = supportPhone;

// Adicione lógica adicional conforme necessário
