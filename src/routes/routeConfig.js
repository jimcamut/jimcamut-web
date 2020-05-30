import Dashboard from '../screens/Dashboard/Dashboard';
import About from '../screens/About/About';
import Strava from '../screens/Strava/Strava';
import Grams from '../screens/Grams/Grams';
import Tweets from '../screens/Tweets/Tweets';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import RecoverPassword from '../screens/RecoverPassword/RecoverPassword';
import UpdatePassword from '../screens/UpdatePassword/UpdatePassword';
import Account from '../screens/Account/Account';
import SetNewPassword from '../screens/SetNewPassword/SetNewPassword';

const routeConfig = [
  {
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    path: '/'
  },
  {
    name: 'About Me',
    component: About,
    exact: true,
    path: '/about'
  },
  {
    name: 'Strava Activities',
    component: Strava,
    exact: true,
    path: '/strava'
  },
  {
    name: 'My Grams',
    component: Grams,
    exact: true,
    path: '/grams'
  },
  {
    name: 'My Tweets',
    component: Tweets,
    exact: true,
    path: '/tweets'
  },
  {
    name: 'Log in to Your Account',
    component: Login,
    exact: true,
    path: '/login',
    redirectForAuth: '/account'
  },
  {
    name: 'Registration',
    component: Register,
    exact: true,
    path: '/register',
    redirectForAuth: '/account'
  },
  {
    name: 'Your Account',
    component: Account,
    exact: true,
    path: '/account',
    private: true
  },
  {
    name: 'Recover Password',
    exact: true,
    path: '/recover-password',
    component: RecoverPassword
  },
  {
    name: 'Update Password',
    exact: true,
    path: '/update-password',
    component: UpdatePassword
  },
  {
    name: 'Set New Password',
    exact: true,
    path: '/set-new-password',
    component: SetNewPassword
  }
];

export default routeConfig;
