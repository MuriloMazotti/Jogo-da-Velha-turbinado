// variáveis
const botoes = document.querySelectorAll(".posicao"); // Seleciona todos os botões com a classe .posicao
const jogador = document.querySelector(".jogador");
const tempo = document.querySelector(".tempo"); 
let jogadorAtual = "X";
let grade = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let tempoRestante = 5;  // Reduzido para 5 segundos por vez
let intervalo;
let faseAtual = 1; // Variável para controlar a fase

function atualizarJogador() {
    jogador.textContent = "Jogador da vez: " + jogadorAtual;
    tempo.textContent = "0" + tempoRestante;
}

function verificarVencedor() {
    const combinacoesVitoria = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Linhas horizontais
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Colunas verticais
        [0, 5, 10, 15], [3, 6, 9, 12] // Diagonais
    ];

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c, d] = combinacao;
        if (grade[a] && grade[a] === grade[b] && grade[a] === grade[c] && grade[a] === grade[d]) {
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

// desabilita as posições 1, 3 e 9 e dar a cor vermelha
function desabilitarPosicoes() {
    const vermelhos = [0, 2, 8];  
    
    vermelhos.forEach(index => {
        botoes[index].disabled = true;  // Desabilita o botão
        botoes[index].style.backgroundColor = "red"  
    })
}

//reinicia o timer
function reiniciarTimer() {
  tempoRestante = 5; // Tempo reduzido a 5 segundos
  clearInterval(intervalo); // Limpa o intervalo
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

// Event listeners para os botões
botoes.forEach(button => {
  button.addEventListener("click", jogar);
})


atualizarJogador()
reiniciarTimer()
desabilitarPosicoes()
