const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const startBtn = document.querySelector(".start-game");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;
console.log("correctWord0", correctWord);

const gameTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      console.log("correctWord2", correctWord);
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
  console.log("wordArray", wordArray);
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  console.log("randomWord", randomWord);
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomWord.hint;
  correctWord = randomWord.word.toLowerCase();
  console.log("correctWord1", correctWord);
  inputField.value = "";
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter the word to check.");
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not the correct word.`);
  alert(`Yey! ${correctWord.toUpperCase()} is the correct word!`);
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
