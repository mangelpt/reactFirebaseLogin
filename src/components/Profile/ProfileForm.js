import classes from './ProfileForm.module.css';
import {useHTTP} from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import {URl_CHANGE_PASS} from "../../Constants";
import {useContext} from "react";
import authContext from "../../store/AuthContext";


const ProfileForm = () => {

    const [loading, sendRequest] = useHTTP();
    const [formData, inputBlurHandler, , passwordHandler, reset] = useForm();
    const authCtx = useContext(authContext);

    console.log(formData);
    const sendRequestHandler = async (e) => {
      e.preventDefault();
      const data = await sendRequest({
          url:URl_CHANGE_PASS ,
          method:'POST' ,
          headers:{'Content-Type': 'application/json'},
          body:{idToken:authCtx.token ,password:formData.password}
      })
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
                { !formData.passwordIsValid  && formData.isTouched && <p>at least 6 characters</p>}
            </div>
            <div className={classes.action}>
                <button disabled={!formData.passwordIsValid}>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
