//useOFormHook
import { authValueValidity } from "../Validators/authValidity";
import { useState } from "react";
const useAuthFormHook = (formState) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [form, setform] = useState(formState);
    let formElementArray = [];
    for (let key in form) {
        formElementArray.push({
            id: key,
            config: form[key],
        });
    }

    const inputChangedHandler = (event, inputIdentifier, value) => {

        const updatedForm = { ...form };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };

        if (value != null) {
            updatedFormElement.value = value;

        }
        else updatedFormElement.value = event?.target?.value;
        updatedFormElement.validations.errorM = authValueValidity(updatedFormElement.value, updatedFormElement.validators);

        if (updatedFormElement.validations.errorM.length === 0) {
            updatedFormElement.validations.valid = true;
        } else {
            updatedFormElement.validations.valid = false;
        }

        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValidd = true;
        let isFormTouchedd = false;
        for (let inputIdentifier in updatedForm) {
            formIsValidd = updatedForm[inputIdentifier].validations.valid && formIsValidd;
            isFormTouchedd =
                updatedForm[inputIdentifier].touched || isFormTouchedd;
        }
        setform(updatedForm);
        setIsFormValid(formIsValidd);
        setIsFormTouched(isFormTouchedd);
    };

    const resetFormValues = () => {
        setform(initialFormState);
    };
    const setFormValues = (formData) => {
        setform(formData);
    };

    const getNonEmptyValuesFromFormState = () => {
        const valuesObject = {};
        for (const key in form) {
            if (form.hasOwnProperty(key) && form[key].value !== "" && form[key].value !== undefined) {
                valuesObject[key] = form[key].value;
            }
        }
        return valuesObject;
    };

    const getValuesFromFormState = () => {
        const valuesObject = {};
        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                valuesObject[key] = form[key].value;
            }
        }
        return valuesObject;
    };

    const setFetchedDataInForm = (data) => {
        const updatedFormState = { ...form };
        for (const key in data) {
            if (updatedFormState[key]) {
                updatedFormState[key].value = data[key];
                updatedFormState[key].validations.valid = true;
            }
        }
        return updatedFormState;
    };


    return {
        form,
        isFormValid,
        isFormTouched,
        formElementArray,
        inputChangedHandler,
        resetFormValues,
        setFormValues,
        setIsFormValid,
        getValuesFromFormState,
        getNonEmptyValuesFromFormState,
        setFetchedDataInForm
    };
};

export default useAuthFormHook;