const passwordLengthSpan = document.getElementById("password-length");
const passwordRangeInput = document.getElementById("password-range");
const lengthMinusBtn = document.querySelector(".button-minus");
const lengthPlusBtn = document.querySelector(".button-plus");
const generatedPassword = document.getElementById("password-generator-display-field");

lengthMinusBtn.addEventListener("click", () => changePasswordLength("-"));
lengthPlusBtn.addEventListener("click", () => changePasswordLength("+"));

passwordLengthSpan.innerText = passwordRangeInput.value;
passwordRangeInput.addEventListener("input", changeInputRangeHandler);

function changePasswordLength(e) {
  if (e === "-") {
    passwordRangeInput.value--;
  } else {
    passwordRangeInput.value++;
  }
  passwordLengthSpan.innerText = passwordRangeInput.value;
  generatePassword(passwordRangeInput.value);
}

function changeInputRangeHandler(e) {
  passwordLengthSpan.innerText = e.target.value;
  generatePassword(e.target.value);
}

function getAvailableCharacters() {
  const upperCaseCheckBox = document.getElementById("uppercase").checked;
  const lowerCaseCheckBox = document.getElementById("lowercase").checked;
  const numbersCheckBox = document.getElementById("numbers").checked;
  const specialsCheckBox = document.getElementById("specials").checked;

  let charactersArray = [
    ...(upperCaseCheckBox ? UPPERCASE : []),
    ...(lowerCaseCheckBox ? LOWERCASE : []),
    ...(numbersCheckBox ? NUMBERS : []),
    ...(specialsCheckBox ? SYMBOLS : []),
  ];

  return charactersArray;
}

function generatePassword(passwordLength) {
  let availableCharacters = getAvailableCharacters();
  console.log("availableCharacters=", availableCharacters);
  let generatedPasswordArr = [];

  for (let i = 0; i < passwordLength; i++) {
    generatedPasswordArr.push(
      availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
    );
  }
  generatedPassword.value = generatedPasswordArr.join("");
}
