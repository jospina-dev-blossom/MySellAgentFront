import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@presentation/hooks/useAuth';
import { Loading } from '@presentation/components/common/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return <Loading />;
  }

  // Redirect to login if not authenticated, save the attempted location
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
