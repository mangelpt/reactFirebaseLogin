import React, {useEffect, useState} from "react";
import AuthContext from "./AuthContext";

let timerID;
const AuthContextProvider = ({children}) => {
    const tokenData = retrieveStoredToken();
    let initialToken = tokenData &&  tokenData.token;
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    function retrieveStoredToken() {
        const storedToken = localStorage.getItem('token');
        const time = localStorage.getItem('expirationTime');
        const remainingTime = calculateRemainingTime(time);
        if (remainingTime <= 6000) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null;
        }
        return {
            token: storedToken,
            duration: remainingTime
        }
    }

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            timerID = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData]);
    function calculateRemainingTime (time) {
        const currentTime = new Date().getTime();
        const timeInMilliseconds = new Date(time).getTime();
        return timeInMilliseconds - currentTime;
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (timerID) clearInterval(timerID);
    }
    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem("expirationTime", expirationTime);
    }
    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={ContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;