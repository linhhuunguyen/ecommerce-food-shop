import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLogin } from 'pages/Admin/components';
import { AppLayout, AdminLayout } from 'layout';
import { ScrollToTop } from 'components';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <ToastContainer autoClose={1500} />
        <Switch>
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route
            path="/admin"
            render={() =>
              localStorage.getItem('accessToken') &&
              localStorage.getItem('admin') ? (
                <AdminLayout />
              ) : (
                <Redirect to="/admin/login" />
              )
            }
          />

          <Route path="/" component={AppLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
