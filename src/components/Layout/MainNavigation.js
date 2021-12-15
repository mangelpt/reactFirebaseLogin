import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useContext} from "react";
import authContext from "../../store/AuthContext";

const MainNavigation = () => {
    const authCxt = useContext(authContext);
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
                                <button>Logout</button>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
