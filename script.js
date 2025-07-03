
const urlApiDolar = 'https://economia.awesomeapi.com.br/all/USD';
let valorDolar = 0;

const dolarCurrent = async () => {
    const response = await fetch(urlApiDolar);
    const data = await response.json();
    data.USD.bid = data.USD.bid.replace(',', '.');
    return Number(data.USD.bid);
}


dolarCurrent().then((data) => {
    valorDolar = parseFloat(data.toFixed(2));
    document.getElementById("valorDolar").value = valorDolar;
});



function calcular() {
    const cotacao = parseFloat(document.getElementById("cotacao").value);
    const aliquotaICMS =
        parseFloat(document.getElementById("aliquotaICMS").value) / 100;
    if (!cotacao || !aliquotaICMS) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const aliquotaII = parseFloat(60 / 100);
    const valorAduaneiro = valorDolar * cotacao;
    const impostoImportacao = valorAduaneiro * aliquotaII;
    const baseICMS =
        (valorAduaneiro + impostoImportacao) / (1 - aliquotaICMS);
    const valorICMS = baseICMS * aliquotaICMS;

    document.getElementById("resultado").innerHTML = `
    <strong>Resultado em Reais:</strong><br/>
    Valor do Produto Declarado: R$ ${valorAduaneiro.toFixed(2)}<br/>
    Imposto de Importação (60%): R$ ${impostoImportacao.toFixed(2)}<br/>
    Base de Cálculo do ICMS: R$ ${baseICMS.toFixed(2)}<br/>
    ICMS Devido do Estado: R$ ${valorICMS.toFixed(2)}
    <br/>
    Valor Total de Imposto a Pagar: <strong>R$ ${(
            impostoImportacao + valorICMS
        ).toFixed(2)}</strong>
    `;
}

document.getElementById("ano").textContent = new Date().getFullYear();