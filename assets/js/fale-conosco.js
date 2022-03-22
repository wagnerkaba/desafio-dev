
const formulario = document.getElementById('formFaleConosco');

const inputEmail = document.getElementById('email');
const inputMensagem = document.getElementById('mensagem');

const erroEmail = document.getElementById('erroEmail');
const erroMensagem = document.getElementById('erroMensagem');

inputEmail.addEventListener('input', (evento)=>{validar(evento.target)});
inputMensagem.addEventListener('input', (evento)=>{validar(evento.target)});
formulario.addEventListener('submit', (evento)=>{validarBotao(evento)})


function validar(input){

    const tipoDeInput = input.dataset.tipo;
    let boxErro = '';

    if (tipoDeInput === 'email') {
        boxErro = erroEmail;
    } else if (tipoDeInput === 'mensagem'){
        boxErro = erroMensagem;
    }


    if (input.validity.valid){
        boxErro.style.display = "none";
        return true;
    } else {

        boxErro.style.display = "block";
        boxErro.textContent = mostraMensagemErro(tipoDeInput, input);
        return false;
    }
}




//---------------------------------------------------------
// ARRAY com TIPOS DE ERRO que input.validity pode retornar
//---------------------------------------------------------
const tiposDeErro = [
    'valueMissing',
    'patternMismatch'
]

//---------------------------------------------------------
// Mensagens de erro que a função mostraMensagemErro pode retornar
//---------------------------------------------------------
const mensagensDeErro = {
    email: {
        valueMissing: 'Erro: Insira um email',
        patternMismatch: 'Erro: Endereço de email inválido'
    },
    mensagem: {
        valueMissing: 'Erro: Insira uma mensagem',
    }
}

//---------------------------------------------------------
// Função que retorna a mensagem de erro adequada
//---------------------------------------------------------
function mostraMensagemErro(tipoInput, input) {

    let mensagem = '';

    tiposDeErro.forEach(erro => {

        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoInput][erro];
        }
    })
    return mensagem;
}



//---------------------------------------------------------
// Função executada quando usuário clica no botão "Enviar Mensagem"
//---------------------------------------------------------
function validarBotao(evento){
    if (validar(inputEmail) && validar(inputMensagem)){
        //salva o user do email em um cookie para apresentar uma mensagem personalizada de agradecimento.
        document.cookie = `usuario=${inputEmail.value}`;

    } else {
        //se os inputs não foram preenchidos, o botão não envia o formulário
        evento.preventDefault();
    }
}














