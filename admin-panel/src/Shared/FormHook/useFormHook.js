//useFormHook
import { checkValueValidity } from "../Validators/validity";
import { useState } from "react";
const useFormHook = (formState) => {
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

        if (value != null && inputIdentifier !== 'phone_no') {
            updatedFormElement.value = value;
        }
        else if (value != null && inputIdentifier == 'phone_no') {
            updatedFormElement.ccValue = value;
            updatedFormElement.value = event;
        }
        else updatedFormElement.value = event?.target?.value;
        updatedFormElement.validations.errorM = checkValueValidity(updatedFormElement.value, updatedFormElement.validators);

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
        setform(formState);
    };
    const setFormValues = (formData) => {
        setform(formData);
    };

    const getNonEmptyValuesFromFormState = () => {
        const valuesObject = {};
        for (const key in form) {
            if (form.hasOwnProperty(key) && form[key].value !== "" && form[key].value !== undefined && form[key].value !== null) {
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
        if (form.hasOwnProperty('phone_no')) {
            valuesObject.country_code = form['phone_no'].ccValue;
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
        if (form.hasOwnProperty('phone_no')) {
            form['phone_no'].ccValue = data?.country_code || null;
        }
        return updatedFormState;
    };

    const setNewFormStateWithData = (newInputs, data) => {
        const mergedFormState = { ...form, ...newInputs };

        for (const key in data) {
            if (mergedFormState[key]) {
                mergedFormState[key].value = data[key];
                mergedFormState[key].validations.valid = true;
            }
        }
        if (form.hasOwnProperty('phone_no')) {
            form['phone_no'].ccValue = data?.country_code || null;
        }

        setform(mergedFormState);
        return mergedFormState;
    }

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
        setFetchedDataInForm,
        setNewFormStateWithData
    };
};

export default useFormHook;