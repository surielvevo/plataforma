import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { login, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await dispatch(login(credentials)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    login: handleLogin,
    logout: handleLogout
  };
}; 