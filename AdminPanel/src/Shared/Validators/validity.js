export const checkValueValidity = (value, rules, preValue) => {
  let errorM = [];
  if (!rules) {
    errorM = [];
  }

  if (rules.required) {
    if ((value == "" || value == null) && value !== 0) {
      errorM.push("This is a mandatory field");
    }
  }
  if (errorM.length > 0) return errorM;

  if (rules.maxLength) {
    if (value.length >= rules.maxLength) {
      let em = "Maximum length is " + rules.maxLength;
      errorM.push(em);
    }
  }
  if (rules.minLength) {
    if (value.length < rules.minLength) {
      let em = "Minimum length is " + rules.minLength;
      if (rules.required) {
        errorM.push(em);
      } else {
        if (value !== "" || value !== null) {
          errorM.push(em);
        }
      }
    }
  }

  if (rules.isEmail) {
    let patternEm =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;

    if (!patternEm.test(value)) {
      if (rules.required) {
        errorM.push("Enter a correct Email address");
      } else {
        if (value == "" || value == null || value.length == 0) {
        } else {
          errorM.push("Enter a correct Email address");
        }
      }
    }
  }

  if (rules.OptionalWeblinkAlphaAndNumeric) {
    let patternUrl = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if (value) {
      if (!/^https?:\/\//.test(value) || !patternUrl.test(value)) {
        errorM.push('Enter a valid URL that contains "https://" or "http://"');
      }
    }
  }
  if (rules.isEnterArray) {
    if (value.length < rules.isEnterArray) {
      let em = "Enter upto " + rules.isEnterArray + " choice";
      errorM.push(em);
    }
  }
  if (rules.greaterThanEqualZero) {
    if (value < 0) {
      let em = "Must be greater than or equal to zero";
      errorM.push(em);
    }
  }
  if (rules.matchEndDate && value != "") {
    if (value < preValue) errorM.push("End date must be later than Start date");
  }
  if (rules.matchStartDate) {
    if (value > preValue) errorM.push("Start date must be before the End date");
  }
  return errorM;
};
