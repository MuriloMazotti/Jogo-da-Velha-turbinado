//variaveis
const botoes = document.querySelectorAll(".posicao") 
const jogador = document.querySelector(".jogador") 
let jogadorAtual = "X" 
let grade = ["", "", "", "", "", "", "", "", ""];






                                                                         //variaveis


function atualizarJogador() {
  jogador.textContent = `Jogador da vez: ${jogadorAtual}`
}



function verificarVencedor() {
  const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
  ]

  for (const combinacao of combinacoesVitoria) {
    const [a, b, c] = combinacao
    if (grade[a] && grade[a] === grade[b] && grade[a] === grade[c]) {
      return grade[a]; //Verifica se tem uma linha completa de X ou O
    }
  }
  return ""
}


function empate() {
  return grade.every(posicao => posicao !== "")
}


function jogar(event) {
  const index = event.target.id - 1 
  if (grade[index] !== "") return 

  grade[index] = jogadorAtual 
  event.target.textContent = jogadorAtual 
  event.target.disabled = true 

  const vencedor = verificarVencedor()
  if (vencedor) {
    jogador.textContent = ` Jogador ${vencedor} venceu`
    botoes.forEach(button => button.disabled = true) 
    window.location.href = ("../fase2/index.html")
    return
  }

  if (empate()) {
    jogador.textContent = "empate"
    return
  }

  if (jogadorAtual === "X") {
    jogadorAtual = "O";
} else if (jogadorAtual === "O") {
    jogadorAtual = "X";
}

  atualizarJogador()
}


botoes.forEach(button => {
  button.addEventListener("click", jogar)
})


atualizarJogador()

