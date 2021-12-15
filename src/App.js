import { Switch, Route,Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import authContext from "./store/AuthContext";
import {useContext} from "react";
function App() {
  const authCtx = useContext(authContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          {authCtx.isLoggedIn &&  <UserProfile /> }
          {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
