const cellElements = document.querySelectorAll("[data-cell]");
const game = document.querySelector("[data-game]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-button]")

let andTheCircle;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const startGame = () => {
  andTheCircle = false;
  
  for (const cell of cellElements) {
    cell.classList.remove('circle');
    cell.classList.remove("x");
    cell.removeEventListener('click', handleClick);
    cell.addEventListener("click", handleClick, {once: true})
  }

  
  game.classList.add("x");
  winningMessage.classList.remove('show-winning-message')
}

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = andTheCircle
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};



const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every(cell => {
   return cell.classList.contains('x') || cell.classList.contains('circle')
  })
}

const placeMark = (cell, classToAdd) => {
   cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
  game.classList.remove("circle");
  game.classList.remove("x");

  if (andTheCircle) {
    game.classList.add("circle");
  } else {
    game.classList.add("x");
  }
};

const changeTime = () => {
   andTheCircle = !andTheCircle;

  setBoardHoverClass();
}

const handleClick = (e) => {
  //Colocar a marca (x ou circle)
  const cell = e.target;
  const classToAdd = andTheCircle ? 'circle' : 'x';

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  //Verificar por empate
  const isDraw = checkForDraw();

  if(isWin) {
    endGame(false)
  } else if (isDraw) {
    endGame(true)
  } else {
    changeTime()
  }
  // Verificar por empate
 
}

startGame();

restartButton.addEventListener("click", startGame)
