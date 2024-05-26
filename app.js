let listaDeNumeroSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
  exibirTexto('h1', 'Jogo do número secreto');
  exibirTexto('p', `Escolha um número entre 1 e ${numeroMaximo} `);
}
exibirMensagemInicial()
function verificarChute(){
  let chute = document.querySelector('input').value;

  let palavraTentativa = tentativas>1 ? 'tentativas' : 'tentativa';
  
  if (chute==numeroSecreto) {
    exibirTexto('h1', `Você acertou o número secreto com ${tentativas} ${palavraTentativa} !`);
    exibirTexto('p', 'Aperte em *Novo jogo* para tentar novamente');
    document.querySelector('#reiniciar').removeAttribute('disabled');
  } else {
    if (chute> numeroSecreto) {
      exibirTexto('p', `O número secreto é menor que ${chute}`);
    } else{
      exibirTexto('p', `O número secreto é maior que ${chute}`);
    }
    tentativas++;
    limparCampo();
  }
}
function gerarNumeroAleatorio() {
  let numeroAleatorio = parseInt(Math.random()* numeroMaximo + 1);
  let qtdElementosNaLista = listaDeNumeroSorteados.length;

  if (qtdElementosNaLista==numeroMaximo) {
      listaDeNumeroSorteados = [];
  }

  if(listaDeNumeroSorteados.includes(numeroAleatorio)){
    return gerarNumeroAleatorio();
  } else{
    listaDeNumeroSorteados.push(numeroAleatorio);
    return numeroAleatorio;
  }
}
function limparCampo(){
  document.querySelector('input').value='';
}
function reiniciarGame(){
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial()
  document.querySelector('#reiniciar').setAttribute('disabled', true);
}