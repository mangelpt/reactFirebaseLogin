import {useContext, useState} from 'react';
import classes from './AuthForm.module.css';
import {URl_AUTH, URL_SING_IN} from "../../Constants";
import {useHTTP} from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import AuthContext from "../../store/AuthContext";
import {useHistory} from "react-router-dom";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, sendRequest] = useHTTP();
    const [formData, inputBlurHandler, emailHandler, passwordHandler, reset] = useForm();
    const formDataIsValid = formData.emailIsValid && formData.passwordIsValid;
    const authCtx = useContext(AuthContext);
  const history=useHistory();
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = await sendRequest({
            url: isLogin ? URL_SING_IN : URl_AUTH,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                email: formData.email,
                password: formData.password,
                returnSecureToken: true
            }
        });
        reset();
        if (data.error !== undefined) {
            alert(data.error.errors[0].message);
        } else {
            if (isLogin) {
                alert(` welcome ${data.email} `);
                authCtx.login(data.idToken)
            } else {
                alert(` user ${data.email} created`);
            }
            history.replace("/");
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email' id='email'
                        onChange={emailHandler}
                        onBlur={inputBlurHandler}
                        value={formData.email}
                        required/>
                    {!formData.emailIsValid && formData.isTouched &&
                        <span> email cannot be empty</span>
                    }
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={passwordHandler}
                        onBlur={inputBlurHandler}
                        value={formData.password}
                        required/>
                    {!formData.passwordIsValid && formData.isTouched &&
                        <span> at least 6 characters</span>
                    }
                </div>
                <div className={classes.actions}>
                    <button disabled={!formDataIsValid}>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type='button' className={classes.toggle}
                            onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
            {loading && <p>sending request</p>}
        </section>
    );
};

export default AuthForm;
