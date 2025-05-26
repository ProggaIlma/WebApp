//authValidity.js
export const authValueValidity = (value, rules, preValue) => {
  let errorM = [];
  if (!rules) {
    errorM = [];
  }
  if (preValue && rules.matchPassword) {
    
    if (preValue != value) {
      errorM.push("Passwords don't match");
    }

  }
  if (preValue && rules.incorrectPassword) {
    
    if (preValue != value) {
      errorM.push("Invalid Password");
    }

  }
  if (rules.required) {
    if (value === "" || value === null) {
      errorM.push("This is a mandatory field");
    }
  }

  if (rules.minLength) {
    if (value.length < rules.minLength) {
      let em = "8 characters long";
      errorM.push(em);
    }
  }

  if (rules.maxLength) {
    if (value.length >= rules.maxLength) {
      let em = "Maximum length is " + rules.maxLength;
      errorM.push(em);
    }
  }
  if (rules.isEmail) {
    const pattern =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;

    if (!pattern.test(value)) {
      errorM.push("Enter a correct Email address");
    }
  }
  if (rules.oneUppercase) {
    const pattern = /(?=.*?[A-Z])/;
    if (!pattern.test(value)) {
      errorM.push(
        "Have at least one upper case letter"
      );
    }
  }
  if (rules.oneLowercase) {
    const pattern = /(?=.*?[a-z])/;
    if (!pattern.test(value)) {
      errorM.push(
        "Have at least one lower case letter"
      );
    }
  }

  if (rules.oneSpecial) {

    const pattern = /[`="':;!@#$%^&*()_+{}\[\]:;<>,.?~\\|\\/-]/;
    if (!pattern.test(value)) {
      errorM.push("Have at least one special character");
    }

  }
  if (rules.alphaAndNumeric) {
    const pattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    if (!pattern.test(value)) {
      errorM.push(
        "Password should contain atleast one Alphabet and one Number"
      );
    }
  }
  return errorM;
};
