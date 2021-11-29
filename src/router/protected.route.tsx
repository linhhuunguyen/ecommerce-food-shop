import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from 'store/hook';

interface ProtectedRouteProps extends RouteProps {
  isAdmin: boolean;
}

const ProtectedRoute = ({ isAdmin, ...props }: ProtectedRouteProps) => {
  // const { loading, isAuthenticated, userData } = useAppSelector(
  //   (state) => state.users
  // );

  // if (loading === false && isAuthenticated === false) {
  //   return <Redirect to="/admin/login" />;
  // }

  // if (loading === false && isAdmin === true && userData.user.role !== 'admin') {
  //   return <Redirect to="/admin/login" />;
  // }

  // return <Route {...props} />;

  const isLoggedIn = Boolean(localStorage.getItem('token'));
  return !isLoggedIn && isAdmin ? (
    <Redirect to="/admin/login" />
  ) : (
    <Route {...props} />
  );
};

export default ProtectedRoute;
