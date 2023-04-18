const passwordLengthSpan = document.getElementById("password-length");
const passwordRangeInput = document.getElementById("password-range");
const copyBtn = document.querySelector(".copy-password-btn");
const lengthMinusBtn = document.querySelector(".button-minus");
const lengthPlusBtn = document.querySelector(".button-plus");
const generatedPasswordField = document.getElementById("password-generator-display-field");

const options = document.querySelectorAll("input[type=checkbox]");
const upperCaseCheckbox = document.getElementById("uppercase");
const lowerCaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const specialsCheckbox = document.getElementById("specials");
const changeLangButtons = document.querySelectorAll("[lang-selector]");

const defaultLocale = "en";
let locale;
let translations = {};
let passwordLength = 0;

document.addEventListener("DOMContentLoaded", () => {
  options.forEach((option) => {
    option.addEventListener("click", optionClickHandler);
  });

  lengthMinusBtn.addEventListener("click", () => changePasswordLength("-"));
  lengthPlusBtn.addEventListener("click", () => changePasswordLength("+"));
  passwordRangeInput.addEventListener("input", changeInputRangeHandler);
  generatedPasswordField.addEventListener("click", copyPassword);
  copyBtn.addEventListener("click", copyPassword);

  passwordLength = +passwordLengthSpan.innerText;
  renderPassword(generatePassword(passwordLengthSpan.innerText));

  setLocale(defaultLocale);
  
  changeLangButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setLocale(btn.attributes[0].value)
    })
  })
});

function optionClickHandler() {
  const optionsStatus = [];
  let optionsStatusSum = 0;

  options.forEach((option) => {
    option.disabled = false;

    let optionStatus = option.checked ? 1 : 0;
    optionsStatusSum += optionStatus;
    optionsStatus.push(optionStatus);
  });

  if (optionsStatusSum <= 1) {
    const disabledCheckboxIndex = optionsStatus.indexOf(1);
    options[disabledCheckboxIndex].disabled = true;
  }

  renderPassword(generatePassword());
}

function changePasswordLength(action) {
  action === "-" ? passwordLength-- : passwordLength++;

  passwordRangeInput.value = passwordLength;
  passwordLengthSpan.innerText = passwordLength;

  renderPassword(generatePassword());
  checkLimits();
}

function checkLimits() {
  passwordLength <= 1 ? (lengthMinusBtn.disabled = true) : (lengthMinusBtn.disabled = false);
  passwordLength >= 50 ? (lengthPlusBtn.disabled = true) : (lengthPlusBtn.disabled = false);
}

function changeInputRangeHandler(e) {
  passwordLength = +e.target.value;
  passwordLengthSpan.innerText = passwordLength;

  checkLimits();
  renderPassword(generatePassword());
}

function generatePassword() {
  let availableCharacters = getAvailableCharacters();
  let generatedPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    generatedPassword +=
      availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
  }
  return generatedPassword;
}

function renderPassword(password) {
  const innerPasswordField = document.getElementById("inner-password-field");
  innerPasswordField.innerText = password;

  copyBtn.disabled = false;
  copyBtn.innerHTML = "Copy";
}

function getAvailableCharacters() {
  const availableCharacters = [
    ...(upperCaseCheckbox.checked ? UPPERCASE : []),
    ...(lowerCaseCheckbox.checked ? LOWERCASE : []),
    ...(numbersCheckbox.checked ? NUMBERS : []),
    ...(specialsCheckbox.checked ? SPECIALS : []),
  ];

  return availableCharacters;
}

function copyPassword() {
  navigator.clipboard.writeText(document.getElementById("inner-password-field").innerText);
  copyBtn.innerHTML = "Copied";
  copyBtn.disabled = true;
}

async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;

  translatePage();
}

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);
  return await response.json();
}

function translatePage() {
  document.querySelectorAll("[lang-key]").forEach(translateElement);
}

function translateElement(element) {
  const key = element.getAttribute("lang-key");
  const translation = translations[key];
  element.innerText = translation;
}
