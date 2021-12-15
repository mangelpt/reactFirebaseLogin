import {useReducer} from 'react';

const initialState = {email: "", password: "", isTouched: false}
const reducer = (state, action) => {
    switch (action.type) {
        case 'EMAIL':
            return {...state, email: action.email, emailIsValid: action.nameIsValid}
        case 'PASSWORD':
            return {...state, password: action.password, passwordIsValid: action.streetIsValid}
        case 'BLUR':
            return {...state, isTouched: true}
        case 'RESET':
            return {...initialState}
        default:
            throw new Error("option does not exits")
    }
}
const useForm = () => {
    const [formState, formDispatch] = useReducer(reducer, initialState);
    const isValid = (value) => {
        return value.length >= 6
    }
    const inputBlurHandler = (value) => {
        formDispatch({type: 'BLUR'})
    }
    const emailHandler = (e) => {
        const valid = isValid(e.target.value)
        formDispatch({type: 'EMAIL', email: e.target.value, nameIsValid: valid});
    }
    const passwordHandler = (e) => {
        const valid = isValid(e.target.value)
        formDispatch({type: 'PASSWORD', password: e.target.value, streetIsValid: valid});
    }
    const reset = () => {
        formDispatch({type: 'RESET'})
    }
    return (
        [formState, inputBlurHandler, emailHandler, passwordHandler, reset]
    );
};
export default useForm;
