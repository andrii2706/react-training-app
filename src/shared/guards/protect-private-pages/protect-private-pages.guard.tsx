import { Navigate } from 'react-router-dom';
import { RouterPages } from '../../models/route-pages.interface';

const ProtectPrivatePages = ({ isAllowed, redirectTo = '/', children }: RouterPages) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};

export default ProtectPrivatePages;
