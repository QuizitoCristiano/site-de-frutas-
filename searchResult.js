import produtos from "./frutas.js"
function model(item, index) {
    return (`<div class="box">
      <img src="${item.img}" alt="" />
      <h2>${item.nome}</h2>
      <h3 class="price">R$: ${item.preco.toFixed(2)} <span>kg</span></h3>
      <i class="bx bx-cart-alt" onclick="adicionarAoCarrinho(${index})"></i>
      <i class="bx bx-heart"></i>
    </div>`)
}
export default function searchResult(item) {
    const resultados = document.querySelector(".Produtos-container")
    const result = produtos.filter(produto => produto.nome.includes(item))
    if (result.length <= 0) {
        resultados.innerHTML = '<h1>SEM RESULTADOS</h1>'
    }
    return result.map((item, index) => {
        resultados.innerHTML = model(item, index)
    })
}