import { useState } from "react";
import { authValueValidity } from "@Shared/Validators/authValidity";
const useResetPasswordForm = (initialFormState) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initialFormState);


  let formElementArray = [];
  for (let key in passwordForm) {
    formElementArray.push({
      id: key,
      config: passwordForm[key],
    });
  }
  const inputChangedHandler = (event, inputIdentifier, preval) => {

    const updatedForm = { ...passwordForm };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.validations.errorM = authValueValidity(
      updatedFormElement.value,
      updatedFormElement.validators,
      preval
    );
    if (updatedFormElement.validations.errorM.length == 0 || updatedFormElement.validations.errorM.length == null) {
      updatedFormElement.validations.valid = true;
    } else {
      updatedFormElement.validations.valid = false;
    }

    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let bothPassMatched = (updatedForm.newPassWord.value == updatedForm.confirmPassWord.value);
    if (!bothPassMatched) {
      updatedForm.confirmPassWord.validations.valid = false;
      if (updatedForm.confirmPassWord.touched == true) {
        updatedForm.confirmPassWord.validations.errorM = ["Passwords don't match"]
      }

    } else {
      updatedForm.confirmPassWord.validations.valid = true;
      updatedForm.confirmPassWord.validations.errorM = []
    }
    let formIsValidd = true;
    for (let inputIdentifier in updatedForm) {
      formIsValidd = updatedForm[inputIdentifier].validations.valid && formIsValidd;

    }
    setPasswordForm(updatedForm);
    setIsFormValid(formIsValidd && bothPassMatched);
  };
  const getValuesFromFormState = () => {
    const valuesObject = {};
    for (const key in passwordForm) {
      if (passwordForm.hasOwnProperty(key)) {
        valuesObject[key] = passwordForm[key].value;
      }
    }
    return valuesObject;
  };

  const resetFormValues = () => {
    setPasswordForm(initialFormState);
  };
  return {
    passwordForm,
    isFormValid,
    formElementArray,
    inputChangedHandler,
    resetFormValues, setIsFormValid, getValuesFromFormState
  };
};

export default useResetPasswordForm;
