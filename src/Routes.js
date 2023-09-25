// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage'; // Import your login page component
import RegistrationPage from './RegistrationPage'; // Import your registration page component

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default Routes;
