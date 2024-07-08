const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const startBtn = document.querySelector(".start-game");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const gameTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    alert(`Time's up! ${correctWord.toUpperCase()} was the correct word.`);
    startGame();
  }, 1000);
};

const startGame = () => {
  gameTimer(30);
  let randomWord = words[Math.floor(Math.random() * words.length)];
  wordArray = randomWord.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomWord.hint;
  correctWord = randomWord.word.toLowerCase();
  inputField.value = "";
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase().trim();
  console.log("userWord", userWord);
  if (!userWord) return alert("Please enter the word to check.");
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not the correct word.`);
  alert(`Yeah! ${correctWord.toUpperCase()} is the correct word!`);
  startGame();
};

startBtn.addEventListener("click", () => {
  const contentDiv = document.querySelector(".content");
  const welcomeDiv = document.querySelector(".welcome");

  contentDiv.style.visibility = "visible";
  welcomeDiv.remove();
  startGame();
});

refreshBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkWord);
