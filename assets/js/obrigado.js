
let mensagem = document.getElementById('agradecimento');

console.log(document.cookie);

// Recupera o usuario salvo no cookie
let usuario = document.cookie
    .split('; ')
    .find(row => row.startsWith('usuario='))
    .split('=')[1]
    .split('@')[0];

//Apresenta a mensagem personalizada de agradecimento
mensagem.textContent = `Obrigado pelo contato, ${usuario}`;