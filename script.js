let body = document.querySelector("body");
let generatedPassword = document.getElementById("GENERATED-PASSWORD");
let passwordLength = document.getElementById("password-length");
let passwordRange = document.getElementById("password-range");




passwordLength.addEventListener('click', clickHandler)
passwordRange.addEventListener('click', clickHandler)

function clickHandler (e) {
  passwordLength.value = e.target.value
  passwordRange.value = e.target.value

  // generatePassword(e.target.value)
  generatedPassword.value = generatePassword(e.target.value)
}

function generatePassword(passwordLength) {
  let generatedPasswordArr = []
  const allSymbols = LOWERCASE.concat(UPPERCASE.concat(NUMBERS.concat(SYMBOLS)));
  for (let i = 0; i < passwordLength; i++) {
    generatedPasswordArr.push(allSymbols[Math.floor(Math.random() * allSymbols.length)])
  }
  let generatedPasswordStr = generatedPasswordArr.join('')
  return generatedPasswordStr
}