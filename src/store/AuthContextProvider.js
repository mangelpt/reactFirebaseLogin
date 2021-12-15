import React, {useState} from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token)
    }
    const logoutHandler = () => {
        setToken(null)
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