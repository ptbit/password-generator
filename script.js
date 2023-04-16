const passwordLengthSpan = document.getElementById("password-length");
const passwordRangeInput = document.getElementById("password-range");
const copyBtn = document.querySelector(".copy-password-btn");
const lengthMinusBtn = document.querySelector(".button-minus");
const lengthPlusBtn = document.querySelector(".button-plus");
const generatedPasswordField = document.getElementById("password-generator-display-field");
const options = document.querySelectorAll("input[type=checkbox]");

options.forEach((option) => {
  option.addEventListener("click", optionClickHandler);
});

lengthMinusBtn.addEventListener("click", () => changePasswordLength("-"));
lengthPlusBtn.addEventListener("click", () => changePasswordLength("+"));
passwordRangeInput.addEventListener("input", changeInputRangeHandler);
generatedPasswordField.addEventListener("click", copyPassword);
copyBtn.addEventListener("click", copyPassword);

renderPassword(generatePassword(passwordLengthSpan.innerText));

function optionClickHandler() {
  renderPassword(generatePassword(passwordRangeInput.value));

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

function changePasswordLength(action) {
  let passwordLength = passwordRangeInput.value;
  action === "-" ? passwordLength-- : passwordLength++;

  passwordRangeInput.value = passwordLength;
  renderPassword(generatePassword(passwordLength));
  checkLimits(passwordLength);
}

function checkLimits(passwordLength) {
  const minLength = passwordLength === "1";
  minLength ? (lengthMinusBtn.disabled = true) : (lengthMinusBtn.disabled = false);

  const maxLength = passwordLength === "50";
  maxLength ? (lengthPlusBtn.disabled = true) : (lengthPlusBtn.disabled = false);
}

function changeInputRangeHandler(e) {
  const passwordLength = e.target.value;

  renderPassword(generatePassword(passwordLength));
  checkLimits(passwordLength);
}

function generatePassword(passwordLength) {
  let availableCharacters = getAvailableCharacters();
  let generatedPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    generatedPassword +=
      availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
  }
  return generatedPassword;
}

function renderPassword(password) {
  const innerPasswordField = document.createElement("div");
  innerPasswordField.id = "inner-password-field";
  innerPasswordField.innerText = password;

  generatedPasswordField.innerHTML = "";
  generatedPasswordField.append(innerPasswordField);
  passwordLengthSpan.innerText = password.length;
  copyBtn.disabled = false;
  copyBtn.innerHTML = "Copy";
}

function getAvailableCharacters() {
  const hasUpperCase = document.getElementById("uppercase").checked;
  const hasLowerCase = document.getElementById("lowercase").checked;
  const hasNumbers = document.getElementById("numbers").checked;
  const hasSpecials = document.getElementById("specials").checked;

  const availableCharacters = [
    ...(hasUpperCase ? UPPERCASE : []),
    ...(hasLowerCase ? LOWERCASE : []),
    ...(hasNumbers ? NUMBERS : []),
    ...(hasSpecials ? SPECIALS : []),
  ];

  return availableCharacters;
}

function copyPassword() {
  navigator.clipboard.writeText(document.getElementById("inner-password-field").innerHTML);
  copyBtn.innerHTML = "Copied";
  copyBtn.disabled = true;
}