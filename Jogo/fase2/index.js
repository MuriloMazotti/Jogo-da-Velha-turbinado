// variáveis
const botoes = document.querySelectorAll(".posicao");
const jogador = document.querySelector(".jogador");
const tempo = document.querySelector(".tempo"); 
let jogadorAtual = "X";
let grade = ["", "", "", "", "", "", "", "", ""];
let tempoRestante = 10;
let intervalo;


function atualizarJogador() {
  jogador.textContent = "Jogador da vez:" + jogadorAtual
  tempo.textContent = "0" + tempoRestante
}

function verificarVencedor() {
  const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
  ];

  for (const combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao;
    if (grade[a] && grade[a] === grade[b] && grade[a] === grade[c]) {
      return grade[a]; // Verifica se tem uma linha completa de X ou O
    }
  }
  return "";
}

function empate() {
  return grade.every(posicao => posicao !== "");
}

function jogar(event) {
  const index = event.target.id - 1;
  if (grade[index] !== "") return; // Se a posição já foi marcada, não faz nada

  grade[index] = jogadorAtual;
  event.target.textContent = jogadorAtual;
  event.target.disabled = true;

  const vencedor = verificarVencedor();
  if (vencedor) {
    jogador.textContent = `Jogador ${vencedor} venceu`;
    botoes.forEach(button => button.disabled = true); // Desabilita todos os botões
    clearInterval(intervalo); // Para o timer
    window.location.href = ("../fase3/index.html")
    return;
  }

  if (empate()) {
    jogador.textContent = "Empate";
    clearInterval(intervalo); // Para o timer
    return;
  }

  // Troca o jogador após a jogada
  if (jogadorAtual === "X") {
    jogadorAtual = "O";
  } else if (jogadorAtual === "O") {
    jogadorAtual = "X";
  }

  atualizarJogador();
  reiniciarTimer(); 
}

//reinicia o timer
function reiniciarTimer() {
  tempoRestante = 10;
  clearInterval(intervalo); // Limpa o intervalo de
  intervalo = setInterval(contarTempo, 1000); // Inicia o timer de novo
}

// Função para contar o tempo
function contarTempo() {
  tempoRestante--;
  atualizarJogador();
  if (tempoRestante <= 0) {
    clearInterval(intervalo); // Para o timer
    // Se o tempo acabar, troca a vez do jogador automaticamente
    if (jogadorAtual === "X") {
      jogadorAtual = "O"; 
    } else if (jogadorAtual === "O") {
      jogadorAtual = "X";
    }
    atualizarJogador();
    reiniciarTimer(); // Reinicia o timer para o próximo jogador
  }
}

botoes.forEach(button => {
  button.addEventListener("click", jogar);
});

atualizarJogador();
reiniciarTimer(); // Inicia o timer no começo do jogo
