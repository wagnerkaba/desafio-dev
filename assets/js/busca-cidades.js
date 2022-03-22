

//------------------------------------------------------------
// Busca cidades na api do IBGE para popular o select de cidades em "index.html"
// Sobre a API do IBGE: https://servicodados.ibge.gov.br/api/docs/localidades#api-Municipios-estadosUFMunicipiosGet
//------------------------------------------------------------
function buscarCidades(estado) {
    if (estado){
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json;charset=utf-8'
            }
        };
    
        fetch(url, options)
        .then(
            response => response.json()
        ).then(
            data => {
                popularSelectCidade(data);
            }
        )
    }

}

//------------------------------------------------------------
// Preenche o select de cidades com cidades do API do IBGE
//------------------------------------------------------------
function popularSelectCidade(data){
    const todasCidades = data.map(elemento => elemento.nome);

    const selectCidade = document.getElementById('selectCidade');

    selectCidade.disabled = false;

    // limpa o select de cidades, caso ele já esteja populado
    limparSelectCidade(selectCidade);

    for(let cidade of todasCidades) {
        var opcao = document.createElement("option");
        opcao.textContent = cidade;
        selectCidade.appendChild(opcao);
    }

}

//------------------------------------------------------------
// Limpa os dados que existirem no select de Cidades
//------------------------------------------------------------
function limparSelectCidade(selectCidade) {
    while (selectCidade.options.length > 0) {                
        selectCidade.remove(0);
    }       
}