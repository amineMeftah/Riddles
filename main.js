const checkbtn = document.getElementsByClassName("btn1")[0];
const inputs = document.getElementsByClassName("inputs")[0];
const message = document.getElementsByClassName("message")[0];
const reload = document.querySelector(".reload");
const numberOfHints = document.querySelector(".numberOfHints");

reload.addEventListener("click", () => {
  window.location.reload();
});

let numberoftries = 6;
let currentTry = 1;
let hintsNumber = 2;

let wordToCheck = "";
const randomWords = ["candle", "sponge", "future", "needle", "mirror"];
wordToCheck = randomWords[Math.floor(Math.random() * randomWords.length)];

const hint1 = document.querySelector(".hint1");
const hint2 = document.querySelector(".hint2");
const hint3 = document.querySelector(".hint3");
const hint4 = document.querySelector(".hint4");
const hint5 = document.querySelector(".hint5");

if (wordToCheck==="candle") {
  hint1.style.display="inline"
}else if(wordToCheck==="sponge"){
  hint2.style.display="inline"
}else if(wordToCheck==="future"){
  hint3.style.display="inline"
}else if(wordToCheck==="needle"){
  hint4.style.display="inline"
}else if(wordToCheck==="mirror"){
  hint5.style.display="inline"
}

function generateInputs() {
  for (let i = currentTry; i <= numberoftries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.setAttribute("id", `try${i}`);
    tryDiv.classList.add("try");
    tryDiv.style.display = "flex";
    tryDiv.style.alignItems = "center";
    tryDiv.innerHTML = `<span class="fontsize">try ${i}</span>`;
    inputs.append(tryDiv);

    if (i != currentTry) {
      tryDiv.classList.add("disabled");
    }

    for (let j = currentTry; j <= numberoftries; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.setAttribute("maxlength", "1");
      input.classList.add(`input${j}`);

      tryDiv.append(input);

      if (i != currentTry) {
        input.setAttribute("tabindex", "-1");
      }

      const upperCase = document.querySelectorAll("input");
      upperCase.forEach((element, index) => {
        element.addEventListener("input", function () {
          this.value = this.value.toUpperCase();
          const indexx = upperCase[index + 1];
          if (indexx && i == currentTry) {
            indexx.focus();
          }
        });

        element.addEventListener("keydown", function () {
          const array = Array.from(upperCase).indexOf(this);
          if (event.key === "ArrowRight") {
            const nextInput = array + 1;
            if (nextInput < upperCase.length && i == currentTry ) {
              upperCase[nextInput].focus();
            }
          }
          if (event.key === "ArrowLeft") {
            const nextInput = array - 1;
            if (nextInput >= 0 && i == currentTry) {
              upperCase[nextInput].focus();
            }
          }
        });
      });
    }
  }
}

generateInputs();

checkbtn.addEventListener("click", checkWords);
inputs.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && currentTry <= 6) {
    checkWords();
  }
});

console.log(wordToCheck);

function checkWords() {
  let success = true;

  const tryDiv = document.querySelector(`#try${currentTry}`);
  const inputs = tryDiv.querySelectorAll("input");
  /* GAME LOGIC */

  inputs.forEach((element, index) => {
    const actualLetter = wordToCheck[index];
    const lowerCase = element.value.toLowerCase();

    if (actualLetter === lowerCase && lowerCase != "") {
      element.classList.add("inPlace");
    } else if (wordToCheck.includes(lowerCase) && lowerCase != "") {
      element.classList.add("notInPlace");
      success = false;
    } else if (!actualLetter.includes(lowerCase) && lowerCase != "") {
      element.classList.add("notExists");
      success = false;
    } else if (lowerCase == "") {
      element.classList.add("notExists");
      success = false;
    }
  });

  /* CHECK IF WIN OR LOOSE */

  if (success) {
    message.innerHTML = `You Won, Your Word Is <sapn class="position">${wordToCheck.toUpperCase()}</span>`;
    tryDiv.classList.add("disabled");

    reload.style.display = "block";
  } else {
    message.innerHTML = `Try Again`;
    tryDiv.classList.add("disabled");

    currentTry++;

    const nextInput = document.querySelector(`#try${currentTry}`);
    if (nextInput) {
      nextInput.classList.remove("disabled");
      nextInput.children[1].focus();
    }
  }

  if (currentTry > 6) {
    checkbtn.disabled = true;
    message.innerHTML = `You Lost The Game, Your Word Is <span class="position">${wordToCheck.toUpperCase()}</span>`;
    reload.style.display = "block";
  }
}

const el = document.getElementById("try1");
const children = Array.from(el.children);
children[1].focus();

/* HINTS FUNCTION */

const hints = document.getElementsByClassName("btn2")[0];
const arrayConvert = Array.from(wordToCheck);

hints.addEventListener("click", hintsHelp);
numberOfHints.innerHTML = `${hintsNumber}`;

function hintsHelp() {
  if (hintsNumber > 0) {
    hintsNumber--;
    numberOfHints.innerHTML = `${hintsNumber}`;

    const tryDiv = document.querySelector(`#try${currentTry}`);
    const inputs = tryDiv.querySelectorAll("input");
    const inputsFilter = Array.from(inputs).filter(function (eo) {
      return eo.value === "";
    });
    const randomly = Math.floor(Math.random() * inputsFilter.length);
    const randomInput = inputsFilter[randomly];

    const inputsFilterArray = Array.from(inputs).indexOf(randomInput);

    randomInput.value = arrayConvert[inputsFilterArray].toUpperCase();
  }
  if (hintsNumber === 0) {
    numberOfHints.disabled = true;
  }
}

document.addEventListener("keydown",handleBackSpace)

function handleBackSpace(event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    const div = document.querySelector(`#try${currentTry}`);
    const inputs = div.querySelectorAll("input");
    const inputsArray = Array.from(inputs);
    const active = inputsArray.indexOf(document.activeElement);
    
    if (active >= 0) {
      inputsArray[active].focus()
    }
    
  }
}

