import { useAuthContext } from 'shared/context';
import { UserRole } from 'shared/const';

const useUserAuth = () => {
  const data = useAuthContext();
  if (data) {
    const { userId, token, userRole } = data;
    const isLogin = !!userId;
    const isAdmin = userRole == UserRole.Admin;
    const isUser = userRole == UserRole.User;
    return { isLogin, isAdmin, isUser, token, userId };
  } else return null;
};

export default useUserAuth;
