import { createContext, useState, useCallback, ReactNode } from 'react';

import api from '../../services/api';

import { toast } from '../../components/Toast';
import { AxiosResponse } from 'axios';

import { AddPacientForm } from '../../ts/Interfaces/AddPacientForm';
import { Pacient } from '../../ts/Types/Pacient.type';
import { useDoctors } from '../Doctors/useDoctors';
import { HospitalizationHistory } from '../../ts/Types/HospitalizationHistory.type';

interface AuthProviderProps {
  children: ReactNode;
}

interface PacientProviderData {
  getAllPacients: () => Promise<void>;
  pacients: Pacient[];
  deletePacient: (id: number) => Promise<void>;
  registerPacient: (data: AddPacientForm) => Promise<boolean>;
  getHospitalizationHistory: (name: string) => Promise<HospitalizationHistory[] | null>;
}

export const PacientContext = createContext<PacientProviderData>(
  {} as PacientProviderData,
);

export const PacientsProvider = ({ children }: AuthProviderProps) => {
  const [pacients, setPacients] = useState<Pacient[]>([]);

  const { headers } = useDoctors();

  const registerPacient = async (data: AddPacientForm) => {
    try {
      await api.post('/paciente/incluir', data, headers);

      toast({
        type: 'success',
        tittle: 'Nova Conta criada',
        description: 'Parabéns, conta criada com sucesso!',
      });

      await getAllPacients();
      return true;
    } catch {
      toast({
        type: 'error',
        tittle: 'Erro ao criar conta',
        description:
          'CNPJ, Matrícula Bemol e e-mail devem ser únicos ou verifique a conexão',
      });
      return false;
    }
  };
  //"eslint --fix",
  const getAllPacients = useCallback(async () => {
    try {
      const result: AxiosResponse<Pacient[]> = await api.get(
        '/paciente/listar-pacientes',
      );
      const pacients = result.data;

      setPacients(pacients);
    } catch (e) {
      //
    }
  }, []);

  // const getPacientMedicine = useCallback(async () => {
  //   try {
  //     const result: AxiosResponse<Pacient[]> = await api.get(
  //       '/paciente/listar-pacientes',
  //     );
  //     const pacients = result.data;
  //     console.log(result);

  //     setPacients(pacients);
  //   } catch (e) {
  //     console.log('oi', e);
  //   }
  // }, []);

  const getHospitalizationHistory = useCallback(async (name: string) => {
    try {
      const result: AxiosResponse<HospitalizationHistory[]> = await api.get(
        `/internacao/paciente/${name}`,
      );

      return result.data;
    } catch (e) {
      console.log('oi', e);
      return null;
    }
  }, []);

  const deletePacient = async (id: number) => {
    try {
      await api.delete(`pacients/${id}`, headers);
      toast({
        type: 'success',
        tittle: 'Usuário removido',
        description: 'Usuário deletado com sucesso',
      });

      const filteredPacients = pacients.filter((pacient) => pacient.id !== id);
      setPacients(filteredPacients);
    } catch {
      toast({
        type: 'error',
        tittle: 'Erro ao deletar usuário',
        description: 'Verifique sua conexão e tente novamente',
      });
    }
  };

  return (
    <PacientContext.Provider
      value={{
        registerPacient,
        getAllPacients,
        pacients,
        deletePacient,
        getHospitalizationHistory,
      }}
    >
      {children}
    </PacientContext.Provider>
  );
};
