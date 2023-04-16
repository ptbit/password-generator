const passwordLengthSpan = document.getElementById("password-length");
const passwordRangeInput = document.getElementById("password-range");
const copyBtn = document.querySelector(".copy-password-btn");
const lengthMinusBtn = document.querySelector(".button-minus");
const lengthPlusBtn = document.querySelector(".button-plus");
const generatedPassword = document.getElementById("password-generator-display-field");

const options = document.querySelectorAll("input[type=checkbox]");

options.forEach((option) => {
  option.addEventListener("click", optionClickHandler);
});

lengthMinusBtn.addEventListener("click", () => changePasswordLength("-"));
lengthPlusBtn.addEventListener("click", () => changePasswordLength("+"));

passwordLengthSpan.innerText = passwordRangeInput.value;
passwordRangeInput.addEventListener("input", changeInputRangeHandler);

function optionClickHandler() {
  generatePassword(passwordRangeInput.value);

  const hasUpperCase = document.getElementById("uppercase").checked;
  const hasLowerCase = document.getElementById("lowercase").checked;
  const hasNumbers = document.getElementById("numbers").checked;
  const hasSpecials = document.getElementById("specials").checked;

  hasUpperCase && !hasLowerCase && !hasNumbers && !hasSpecials
    ? (document.getElementById("uppercase").disabled = true)
    : (document.getElementById("uppercase").disabled = false);

  hasLowerCase && !hasUpperCase && !hasNumbers && !hasSpecials
    ? (document.getElementById("lowercase").disabled = true)
    : (document.getElementById("lowercase").disabled = false);

  hasNumbers && !hasUpperCase && !hasLowerCase && !hasSpecials
    ? (document.getElementById("numbers").disabled = true)
    : (document.getElementById("numbers").disabled = false);

  hasSpecials && !hasUpperCase && !hasNumbers && !hasLowerCase
    ? (document.getElementById("specials").disabled = true)
    : (document.getElementById("specials").disabled = false);
}

function changePasswordLength(e) {
  if (e === "-") {
    passwordRangeInput.value--;
  } else {
    passwordRangeInput.value++;
  }
  passwordLengthSpan.innerText = passwordRangeInput.value;
  generatePassword(passwordRangeInput.value);
  checkLimits(passwordRangeInput.value);
}

function changeInputRangeHandler(e) {
  passwordLengthSpan.innerText = e.target.value;
  generatePassword(e.target.value);
  checkLimits(e.target.value);
}

function checkLimits(passwordLength) {
  const minLength = passwordLength === "1";
  minLength ? (lengthMinusBtn.disabled = true) : (lengthMinusBtn.disabled = false);

  const maxLength = passwordLength === "50";
  maxLength ? (lengthPlusBtn.disabled = true) : (lengthPlusBtn.disabled = false);
}

function getAvailableCharacters() {
  const hasUpperCase = document.getElementById("uppercase").checked;
  const hasLowerCase = document.getElementById("lowercase").checked;
  const hasNumbers = document.getElementById("numbers").checked;
  const hasSpecials = document.getElementById("specials").checked;

  let charactersArray = [
    ...(hasUpperCase ? UPPERCASE : []),
    ...(hasLowerCase ? LOWERCASE : []),
    ...(hasNumbers ? NUMBERS : []),
    ...(hasSpecials ? SPECIALS : []),
  ];

  return charactersArray;
}

function generatePassword(passwordLength) {
  let availableCharacters = getAvailableCharacters();
  let generatedPasswordArr = [];

  for (let i = 0; i < passwordLength; i++) {
    generatedPasswordArr.push(
      availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
    );
  }
  let div = document.createElement("div");
  div.id = "inner-password-field";
  div.innerText = generatedPasswordArr.join("");
  generatedPassword.innerHTML = "";
  generatedPassword.append(div);
  copyBtn.disabled = false;
  copyBtn.innerHTML = "Copy";
}

copyBtn.addEventListener("click", copyPassword);

function copyPassword() {
  navigator.clipboard.writeText(document.getElementById('inner-password-field').innerHTML);
  copyBtn.innerHTML = "Copied";
  copyBtn.disabled = true;
}

generatePassword(25);
