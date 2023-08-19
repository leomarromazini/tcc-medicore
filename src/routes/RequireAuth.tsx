import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { RolesTypes } from '../ts/Types/RolesTypes';

import { useDoctors } from '../providers/Doctors/useDoctors';

import { toast } from '../components/Toast';

interface RequireAuthProps {
  allowedRoles: Array<RolesTypes>;
}
type customJwtPayload = JwtPayload & {
  roles: [RolesTypes] | RolesTypes;
};
const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const [token, setToken] = useState(localStorage.getItem('@MedicoreToken') || '');

  const location = useLocation();

  const { doctorToken, logout } = useDoctors();

  let roles: RolesTypes[] | RolesTypes = [];
  if (token) {
    const jwt = jwtDecode<customJwtPayload>(token);
    roles = jwt['roles'];

    if (jwt.exp && jwt?.exp * 1000 < Date.now()) {
      logout();

      toast({
        type: 'warning',
        tittle: 'Sessão expirada',
        description: 'Faça login novamente, por favor!',
      });

      setToken('');
    }
  }

  if (typeof roles === 'string') {
    roles = [roles];
  }

  return roles?.find((role) => {
    return allowedRoles?.includes(role);
  }) && doctorToken ? (
    <Outlet />
  ) : doctorToken ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
