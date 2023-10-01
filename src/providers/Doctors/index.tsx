import { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import api from '../../services/api';

import { RolesTypes } from '../../ts/Types/RolesTypes';

import { toast } from '../../components/Toast';
import { AxiosResponse } from 'axios';

import { LoginForm } from '../../ts/Interfaces/LoginForm';

interface AuthProviderProps {
  children: ReactNode;
}

interface Headers {
  headers: {
    Authorization: string;
  };
  mode: string;
}

interface LoginResponse {
  email: string;
  accessToken: string;
}

interface DoctorProviderData {
  logout: () => void;
  headers: Headers;
  loginDoctor: (data: LoginForm) => Promise<boolean>;
  doctorData: customJwtPayload | undefined;
  doctorToken: string;
}

type customJwtPayload = JwtPayload & {
  sub: string;
  roles: Array<RolesTypes>;
  exp: number;
};

export const DoctorContext = createContext<DoctorProviderData>(
  {} as DoctorProviderData,
);

export const DoctorsProvider = ({ children }: AuthProviderProps) => {
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem('@MedicoreToken') || '',
  );
  const [doctorData, setDoctorData] = useState<customJwtPayload>();

  const [headers, setHeaders] = useState(
    (doctorToken && {
      headers: {
        Authorization: `Bearer ${JSON.parse(doctorToken) as string}`,
      },
      mode: 'cors',
    }) || {
      headers: {
        Authorization: `Bearer `,
      },
      mode: 'cors',
    },
  );

  const getDoctorData = useCallback(() => {
    if (doctorToken) {
      const decodedDoctorToken = jwtDecode<customJwtPayload>(doctorToken);

      setDoctorData(decodedDoctorToken);

      return decodedDoctorToken;
    }
  }, [doctorToken]);

  useEffect(() => {
    getDoctorData();
  }, [getDoctorData]);

  const loginDoctor = async (data: LoginForm) => {
    try {
      const result: AxiosResponse<LoginResponse> = await api.post(
        '/authenticate',
        data,
      );

      const rawDoctorToken = result.data.accessToken;

      localStorage.setItem(`@MedicoreToken`, JSON.stringify(rawDoctorToken));

      setDoctorToken(JSON.stringify(rawDoctorToken));
      getDoctorData();

      setHeaders({
        headers: {
          Authorization: `Bearer ${rawDoctorToken}`,
        },
        mode: 'cors',
      });

      toast({
        type: 'success',
        tittle: 'Login efetuado com sucesso',
        description: 'Seja bem vindo!',
      });

      return true;
    } catch {
      toast({
        type: 'error',
        tittle: 'Erro ao fazer login',
        description: 'Verifique sua senha, usuário e conexão',
      });

      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem(`@MedicoreToken`);
    setDoctorToken('');
    setDoctorData(undefined);
  };

  return (
    <DoctorContext.Provider
      value={{
        loginDoctor,
        logout,
        headers,
        doctorData,
        doctorToken,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
