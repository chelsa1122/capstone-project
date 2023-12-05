// App.jsx

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import LoginPage from './components/LoginPage';

const App = () => {
  // Example: Check if admin is logged in
  const isAdminLoggedIn = true; // You should implement a proper check here

  return (
    <Router>
      <Switch>
        {/* Admin login route */}
        <Route path="/admin/login" exact component={LoginPage} />

        {/* Protected routes that require admin authentication */}
        {isAdminLoggedIn ? (
          <>
            <Route path="/admin/users" exact component={UserList} />
            <Route path="/admin/users/:id" component={UserForm} />
          </>
        ) : (
          // Redirect to login page if not logged in
          <Redirect to="/admin/login" />
        )}

        {/* Add more routes for other admin features */}
      </Switch>
    </Router>
  );
};

export default App;
