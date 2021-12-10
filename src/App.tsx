import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from 'pages/admin/login';
import ProtectedRoute from 'router/protected.route';
import './styles/index.css';
import { UsersLayout, AdminLayout } from 'layout';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { addToken } from 'store/auth';
import ProductAddForm from 'modules/admin/product/form/addProduct';

function App() {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.users);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getToken = async () => {
        const res = await axios.post('/api/v1/user/refresh_token');
        dispatch(addToken(res.data.access_token));
      };
      getToken();
    }
  }, [isLogged, dispatch]);
  return (
    <div className="App">
      <Router>
        <ToastContainer autoClose={1500} />
        <Switch>
          <Route path="/add/product" component={ProductAddForm} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <ProtectedRoute
            exact={false}
            path="/admin"
            isAdmin={true}
            component={AdminLayout}
          />
          <Route path="/user">
            <UsersLayout mode="information" />
          </Route>
          <Route path="/">
            <UsersLayout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
