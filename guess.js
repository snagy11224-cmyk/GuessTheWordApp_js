let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} game Created By Salma`;

//setting game options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

//manage words
let wordToGuess = "";
const words = [
  "planet",
  "silver",
  "beauty",
  "bright",
  "castle",
  "danger",
  "forest",
  "golden",
  "hunter",
  "island",
  "jungle",
  "kitten",
  "market",
  "nature",
  "object",
  "pirate",
  "random",
  "summer",
  "temple",
  "vision",
  "winner",
  "yellow",
  "zombie",
  "action",
  "bishop",
  "bridge",
  "camera",
  "circle",
  "coffee",
  "cotton",
  "custom",
  "dragon",
  "evolve",
  "family",
  "finger",
  "flower",
  "friend",
  "galaxy",
  "garden",
  "ground",
  "hammer",
  "health",
  "hollow",
  "impact",
  "letter",
  "magnet",
  "matter",
  "memory",
  "mirror",
  "motion",
  "nation",
  "office",
  "origin",
  "people",
  "pepper",
  "planet",
  "pocket",
  "prince",
  "puzzle",
  "rabbit",
  "rocket",
  "shadow",
  "spirit",
  "square",
  "stable",
  "stream",
  "street",
  "strong",
  "system",
  "throat",
  "ticket",
  "tunnel",
  "weapon",
  "window",
  "writer",
  "action",
  "anchor",
  "animal",
  "artist",
  "attack",
  "butter",
  "button",
  "candle",
  "carbon",
  "castle",
  "change",
  "charge",
  "circle",
  "client",
  "cloudy",
  "cooper",
  "corner",
  "course",
  "crisis",
  "damage",
  "dealer",
  "decent",
  "desert",
  "doctor",
  "easily",
  "editor",
  "effect",
  "effort",
  "empire",
  "enable",
  "energy",
  "engine",
  "fabric",
  "farmer",
  "flight",
  "flower",
  "forest",
  "formal",
  "frozen",
  "gather",
  "gender",
  "global",
  "growth",
  "guitar",
  "harbor",
  "heaven",
  "hidden",
  "honest",
  "hunter",
  "injury",
  "insane",
  "invest",
  "keyboard",
  "latest",
  "leader",
  "legend",
  "linear",
  "liquid",
  "little",
  "manner",
  "master",
  "medium",
  "mental",
  "metallic",
  "mobile",
  "modern",
  "moment",
  "mother",
  "muscle",
  "native",
  "notion",
  "number",
  "oceanic",
  "online",
  "option",
  "outfit",
  "planet",
  "plasma",
  "player",
  "poetry",
  "police",
  "policy",
  "poster",
  "powder",
  "prefer",
  "profit",
  "reason",
  "record",
  "repair",
  "report",
  "result",
  "rescue",
  "rhythm",
  "rocket",
  "school",
  "screen",
  "season",
  "sector",
  "sensor",
  "shadow",
  "signal",
  "simple",
  "sketch",
  "smooth",
  "social",
  "speech",
  "spirit",
  "square",
  "stable",
  "status",
  "strain",
  "stream",
  "strike",
  "strong",
  "summer",
  "symbol",
  "talent",
  "target",
  "temple",
  "theory",
  "throne",
  "tissue",
  "travel",
  "luxury",
  "vision",
  "volume",
  "weapon",
  "wealth",
  "wonder",
  "writer",
  "yellow",
  "zodiac",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
console.log(wordToGuess);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess${i}-letter${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  //disable all inputs except first one
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  //control focus
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(`#guess${currentTry}-letter${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  //check if user win or lose
  const guessWord = Array.from(
    document.querySelectorAll(`.try-${currentTry} input`)
  )
    .map((inp) => inp.value.toLowerCase())
    .join("");

  if (guessWord === wordToGuess) {
    messageArea.innerHTML = `<div style="margin-bottom: 50px">You Win! the word is <span>${wordToGuess}</span></div> `;
  let allTries=document.querySelectorAll('.inputs > div');
  allTries.forEach((tryDiv)=> tryDiv.classList.add("disabled-inputs"));
  guessButton.disabled=true;
  }else{
    console.log("You Lose !")
  }
}

//function call
window.onload = function () {
  generateInput();
};
