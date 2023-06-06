import { Navigate } from 'react-router-dom';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ProtectRoute = ({ children }: Props) => {
  const user = localStorage.getItem('merchant') || localStorage.getItem('customer');

  if (!user) {
    return <Navigate to='/login' />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
