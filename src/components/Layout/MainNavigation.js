import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useContext} from "react";
import authContext from "../../store/AuthContext";

const MainNavigation = () => {
    const authCxt = useContext(authContext);
    const logoutHandler = () => {
        authCxt.logout();
    }
    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!authCxt.isLoggedIn &&
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                    }
                    {authCxt.isLoggedIn &&
                        <>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
