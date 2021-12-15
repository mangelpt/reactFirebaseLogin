import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import AuthContextProvider from "./store/AuthContextProvider.js";

ReactDOM.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>,
    </AuthContextProvider>,
    document.getElementById('root')
);
