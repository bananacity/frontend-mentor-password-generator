// Selectors
const characterLengthSlider = document.getElementById(
  "character-length-slider"
);
const characterLengthDisplay = document.querySelector(
  ".character-length-display"
);

const upperLettersCheckbox = document.getElementById(
  "uppercase-letters-checkbox"
);
const lowerLettersCheckbox = document.getElementById(
  "lowercase-letters-checkbox"
);
const numbersCheckbox = document.getElementById("numbers-checkbox");
const symbolsCheckbox = document.getElementById("symbols-checkbox");
const passwordDisplay = document.querySelector(".password-generator__output");
const generateBtn = document.querySelector(".generate-btn");
const copyPasswordBtn = document.querySelector(
  ".password-generator__copy-wrapper"
);
const copyPasswordText = document.querySelector(
  ".password-generator__copy-text"
);
const strengthText = document.querySelector(".strength-rating-text");
const strengthBars = document.querySelectorAll(".strength-bar");

//Functions
function generatePassword() {
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperLetters = lowerLetters.toUpperCase();
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'",.<>/?~`;

  const length = characterLengthSlider.value;

  let acceptableChars = "";

  acceptableChars += upperLettersCheckbox.checked ? upperLetters : "";
  acceptableChars += lowerLettersCheckbox.checked ? lowerLetters : "";
  acceptableChars += numbersCheckbox.checked ? numbers : "";
  acceptableChars += symbolsCheckbox.checked ? symbols : "";

  let password = "";

  if (acceptableChars.length > 0) {
    for (i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * acceptableChars.length);

      password += acceptableChars[randomIndex];
    }
  }

  passwordDisplay.value = password;

  calculatePasswordStrength(password);
}

function calculatePasswordStrength(password) {
  // Basic strength indicator purely based on length
  let strengthName = "";
  let strengthClass = "";
  let barsHighlighted = 0;

  if (password.length >= 12) {
    strengthName = "strong";
    barsHighlighted = 4;
    strengthClass = "strength-bar--strong";
  } else if (password.length >= 8) {
    strengthName = "medium";
    barsHighlighted = 3;
    strengthClass = "strength-bar--medium";
  } else if (password.length >= 6) {
    strengthName = "weak";
    barsHighlighted = 2;
    strengthClass = "strength-bar--weak";
  } else if (password.length > 0) {
    strengthName = "too weak!";
    barsHighlighted = 1;
    strengthClass = "strength-bar--too-weak";
  }

  strengthBars.forEach((bar) => {
    bar.className = "strength-bar";
  });

  for (let i = 0; i < barsHighlighted; i++) {
    strengthBars[i].classList.add(strengthClass);
  }

  strengthText.textContent = strengthName;
}

function copyPassword() {
  const password = passwordDisplay.value;

  copyPasswordBtn.classList.add("password-generator__copy-wrapper--active");

  copyPasswordText.style.opacity = 1;

  setTimeout(() => {
    copyPasswordText.style.opacity = 0;
    copyPasswordBtn.classList.remove(
      "password-generator__copy-wrapper--active"
    );
  }, 1000);

  navigator.clipboard.writeText(password);
}

function updateSliderBackground() {
  const percentage =
    (characterLengthSlider.value / characterLengthSlider.max) * 100;

  const gradient = `linear-gradient(to right, var(--color-green-200) 0%, var(--color-green-200) ${percentage}%, var(--color-grey-850) ${percentage}%, var(--color-grey-850) 100%)`;

  characterLengthSlider.style.setProperty("--slider-bg", gradient);
}

function updateSliderDisplay() {
  characterLengthDisplay.textContent = characterLengthSlider.value;
}

// Listeners
characterLengthSlider.addEventListener("input", () => {
  updateSliderBackground();
  updateSliderDisplay();
  generatePassword();
});
generateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  generatePassword();
});
copyPasswordBtn.addEventListener("click", copyPassword);
upperLettersCheckbox.addEventListener("change", generatePassword);
lowerLettersCheckbox.addEventListener("change", generatePassword);
numbersCheckbox.addEventListener("change", generatePassword);
symbolsCheckbox.addEventListener("change", generatePassword);
