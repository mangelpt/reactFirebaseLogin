import classes from './ProfileForm.module.css';
import {useHTTP} from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import {URl_CHANGE_PASS} from "../../Constants";
import {useContext} from "react";
import authContext from "../../store/AuthContext";
import {useHistory} from "react-router-dom";

const ProfileForm = () => {
    const [loading, sendRequest] = useHTTP();
    const [formData, inputBlurHandler, , passwordHandler, reset] = useForm();
    const authCtx = useContext(authContext);
    const history = useHistory();
    const sendRequestHandler = async (e) => {
        e.preventDefault();
        const data = await sendRequest({
            url: URl_CHANGE_PASS,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                idToken: authCtx.token,
                password: formData.password,
                returnSecureToken: false
            }
        });
        if (data.error !== undefined) {
            alert(data.error.errors[0].message);
        } else {
            alert(` password changed`);
            reset()
            history.replace("/")
        }
    }

    return (
        <form className={classes.form} onSubmit={sendRequestHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input
                    type='password'
                    id='new-password'
                    value={formData.password}
                    onBlur={inputBlurHandler}
                    onChange={passwordHandler}
                />
                {!formData.passwordIsValid && formData.isTouched && <p>at least 6 characters</p>}
            </div>
            <div className={classes.action}>
                <button disabled={!formData.passwordIsValid}>Change Password</button>
            </div>
            {loading && <span>sending</span>}
        </form>
    );
}

export default ProfileForm;
