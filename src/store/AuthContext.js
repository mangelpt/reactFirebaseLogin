import {createContext} from 'react';

const defaultValue = {
    token: "",
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    }
}
const AuthContext = createContext(defaultValue);
export default AuthContext;