// Letter only validation
function validLetter(choice) {
  if (/^[a-zA-Z|\s]+$/g.test(choice)) {
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

// Email validation.
function validEmail(choice) {
  if (/^[\w|\W]+@[a-zA-Z0-9]+.com$/g.test(choice)) {
    return true;
  } else {
    return `Incorrect Answer. Email only with alphanumeric characters.
      You can keep typing, it's a bit confusing.`;
  }
}
module.exports = { validLetter, validNumber, validEmail };
