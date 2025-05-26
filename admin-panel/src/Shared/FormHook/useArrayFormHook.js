//useArrayFormHook
import { useState } from "react";
import { checkValueValidity } from "../Validators/validity";
const useArrayFormHook = (initialFormState) => {
    const [isArrayFormValid, setIsArrayFormValid] = useState(false);
    const [inputList, setInputList] = useState(initialFormState);


    const handleArrayInputChange = (e, index, iname, theValue) => {
        const list = [...inputList];
        if (theValue !== null && theValue !== undefined) {
            list[index][iname].value = theValue;

        } else {
            list[index][iname].value = e?.target?.value;
        }

        const updatedFormElement = list[index][iname];
        updatedFormElement.validations.errorM = checkValueValidity(
            updatedFormElement.value,
            updatedFormElement.validators
        );
        if (updatedFormElement.validations.errorM.length === 0) {
            updatedFormElement.validations.valid = true;
        } else {
            updatedFormElement.validations.valid = false;
        }
        updatedFormElement.touched = true;
        list[index][iname] = updatedFormElement;

        let formIsValidd = true;
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            for (const listey in element) {
                if (element.hasOwnProperty(listey) && element[listey].hasOwnProperty('validations')) {
                    formIsValidd = element[listey].validations.valid && formIsValidd;
                }
            }
        }
        setInputList(list);
        setIsArrayFormValid(formIsValidd);
    };


    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);

        let formIsValidd = true;

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            for (const listey in element) {
                if (element.hasOwnProperty(listey) && element[listey].hasOwnProperty('validations')) {
                    formIsValidd = element[listey].validations.valid && formIsValidd;
                }
            }
        }
        setIsArrayFormValid(formIsValidd)
    };

    const handleAddClick = (singleFormState) => {
        setIsArrayFormValid(false);
        setInputList([
            ...inputList,
            singleFormState
        ]);
    };
    const arrayFormReset = () => {
        setInputList(initialFormState);
    };

    const getFormValues = () => {
        const formValues = [];
        inputList.forEach((item, index) => {
            const formItem = {};
            Object.keys(item).forEach((key) => {
                formItem[key] = item[key].value;
            });
            formValues.push(formItem);
        });
        return formValues;
    };

    return {
        isArrayFormValid,
        setIsArrayFormValid,
        inputList,
        setInputList,
        handleArrayInputChange,
        handleRemoveClick,
        handleAddClick,
        arrayFormReset,
        getFormValues
    };
};
export default useArrayFormHook;