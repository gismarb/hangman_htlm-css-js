var job_titles = [
  "analista",
  "administrador",
  "auditor",
  "contador",
  "ceo",
  "consultor",
  "professor",
  "programador",
  "gestor",
  "policial",
  "cfo",
  "cmo",
  "coordenador",
  "operador",
  "pesquisador",
  "marceneiro",
  "pintor",
  "fisioterapeuta",
  "lojista",
  "atendente",
  "garçom",
  "presidente",
  "motorista",
  "digitador",
  "desenvolvedor",
  "agropecuarista",
  "economista",
  "hoteleiro",
  "piloto",
  "animador",
  "ator",
  "designer",
  "fotografo",
  "fisico",
  "historiador",
  "linguista",
  "pedagogo",
  "sociologo",
  "teologo",
  "agricultor",
  "engenheiro",
  "dentista",
  "chef",
  "biologo",
  "quimico",
  "fiscal",
  "juiz",
  "encanador",
  "ferreiro",
  "pedreiro",
  "delegado"
]

alert("Adivinhe qual é a profissão!");
alert("Mesmo que a palavra tenha acento, não iremos utilizar o mesmo para este jogo!");

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = job_titles[Math.floor(Math.random() * job_titles.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'Parabéns - Você Venceu !!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'A resposta correta era: ' + answer;
    document.getElementById('keyboard').innerHTML = 'Que pena - Você Perdeu!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
