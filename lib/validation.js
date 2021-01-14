// Letter only validation
function validLetter(choice) {
  if (/^[a-zA-z]+$/g.test(choice)) {
    return true;
  } else {
    return `Incorrect Answer. Letters only.
    You can keep typing, it's a bit confusing.`;
  }
}

// Number validation.
function validNumber(choice) {
  if (/^[0-9]+$/g.test(choice)) {
    return true;
  } else {
    return `Incorrect Answer. Numbers only.
    You can keep typing, it's a bit confusing.`;
  }
}
module.exports = { validLetter, validNumber };
