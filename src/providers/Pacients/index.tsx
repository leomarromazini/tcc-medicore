import { createContext, useCallback, ReactNode, useState } from 'react';

import api from '../../services/api';

import { toast } from '../../components/Toast';
import axios, { AxiosResponse } from 'axios';

import { AddPacientForm } from '../../ts/Interfaces/AddPacientForm';
import { useDoctors } from '../Doctors/useDoctors';

import { Pacient } from '../../ts/Types/Pacient.type';
import { HospitalizationHistory } from '../../ts/Types/HospitalizationHistory.type';
import { MedicineResponse } from '../../ts/Types/Medicine.type';
import { MedicalRecord } from '../../ts/Types/MedicalRecord.type';
import { UpdatePacientForm } from '../../ts/Interfaces/UpdatePacientForm';
import { UpdateMedicalRecord } from '../../ts/Interfaces/UpdateMedicalRecord';
import { UpdateMedicine } from '../../ts/Interfaces/UpdateMedicine';
import { AddMedicines } from '../../ts/Interfaces/AddMedicines';
import { AddHospitalizationHistory } from '../../ts/Interfaces/AddHospitalizationHistory';
import { UpdateHospitalizationHistory } from '../../ts/Interfaces/UpdateHospitalizationHistory';
import HospitalizationHistoryMapper from './mappers/HospitalizationHistoryMapper';
import { formatDateToPersistence } from '../../utils/formatDateToPersistence';
import { AddMedicalRecord } from '../../ts/Interfaces/AddMedicalRecord';

interface AuthProviderProps {
  children: ReactNode;
}

interface PacientProviderData {
  registerPacient: (data: AddPacientForm) => Promise<void>;
  getAllPacients: () => Promise<void>;
  updatePacient: (pacient: UpdatePacientForm) => Promise<void>;
  getPacientMedicalRecord: (name: string) => Promise<MedicalRecord | undefined>;
  addMedicalRecord: (medicalRecord: AddMedicalRecord) => Promise<void>;
  updateMedicalRecord: (
    pacientName: string,
    medicalRecord: UpdateMedicalRecord,
  ) => Promise<void>;
  getPacientMedicine: (name: string) => Promise<MedicineResponse | undefined>;
  addPacientMedicine: (newMedicines: AddMedicines) => Promise<void>;
  updatePacientMedicine: (v: UpdateMedicine) => Promise<void>;
  deletePacientMedicine: (username: string, medicineName: string) => Promise<void>;
  getHospitalizationHistory: (
    name: string,
  ) => Promise<HospitalizationHistory[] | null>;
  addHospitalizationHistory: (
    newHospitalizationHistory: AddHospitalizationHistory,
  ) => Promise<void>;
  updateHospitalizationHistory: (
    oldAdmissionDate: string,
    h: UpdateHospitalizationHistory,
  ) => Promise<void>;
  deleteHospitalizationHistory: (name: string, date: string) => Promise<void>;
  allPacients: Pacient[];
}

export const PacientContext = createContext<PacientProviderData>(
  {} as PacientProviderData,
);

export const PacientsProvider = ({ children }: AuthProviderProps) => {
  const [allPacients, setAllPacients] = useState<Pacient[]>([]);

  const { headers } = useDoctors();

  const registerPacient = async (data: AddPacientForm) => {
    try {
      await api.post('/paciente/incluir', data, headers);

      toast({
        type: 'success',
        tittle: 'Paciente Criado!',
        description: 'Parabéns, paciente criado com sucesso!',
      });

      await getAllPacients();

      return Promise.resolve();
    } catch {
      toast({
        type: 'error',
        tittle: 'Erro ao criar conta',
        description: 'Email e nome devem ser únicos',
      });
      return Promise.reject('');
    }
  };

  const getAllPacients = useCallback(async () => {
    try {
      const result: AxiosResponse<Pacient[]> = await api.get(
        '/paciente/listar-pacientes',
        headers,
      );
      const pacients = result.data;

      const formatedPacients = pacients.map((pacient, index) => {
        return {
          ...pacient,
          key: pacient.cpf + index,
        };
      });

      return setAllPacients(formatedPacients);
    } catch (e) {
      //
    }
  }, [headers]);

  const updatePacient = useCallback(
    async (pacient: UpdatePacientForm) => {
      try {
        await api.put(`/paciente/atualizar?nome=${pacient.nome}`, pacient, headers);
        await getAllPacients();
        toast({
          type: 'success',
          tittle: 'Paciente atualizado',
          description: 'Parabéns, paciente atualizado com sucesso!',
        });
      } catch (e) {
        toast({
          type: 'error',
          tittle: 'Erro ao atualizar usuário',
          description: 'Verifique a conexão, campos e tente novamente',
        });
      }
    },
    [headers, getAllPacients],
  );

  const getPacientMedicalRecord = useCallback(
    async (name: string) => {
      try {
        if (headers.headers.Authorization.length > 10) {
          const result: AxiosResponse<MedicalRecord> = await api.get(
            `/fichas-medicas/buscar-por-nome/${name}`,
            headers,
          );

          const medicalRecord = result.data;

          return medicalRecord;
        }
      } catch (e) {
        //
      }
    },
    [headers],
  );

  const addMedicalRecord = useCallback(
    async (medicalRecord: AddMedicalRecord) => {
      try {
        await api.post(`/fichas-medicas/incluir`, medicalRecord, headers);
        await getPacientMedicalRecord(medicalRecord.nome);
        toast({
          type: 'success',
          tittle: 'Ficha médica criada',
          description: 'Parabéns, Ficha médica criada com sucesso!',
        });
      } catch (e) {
        toast({
          type: 'error',
          tittle: 'Erro ao criar ficha médica',
          description: 'Verifique a conexão, campos e tente novamente',
        });
      }
    },
    [headers, getPacientMedicalRecord],
  );

  const updateMedicalRecord = useCallback(
    async (pacientName: string, medicalRecord: UpdateMedicalRecord) => {
      try {
        await api.put(
          `/fichas-medicas/atualizar-por-nome/${pacientName}`,
          medicalRecord,
          headers,
        );
        await getPacientMedicalRecord(pacientName);
        toast({
          type: 'success',
          tittle: 'Ficha médica atualizada',
          description: 'Parabéns, Ficha médica atualizada com sucesso!',
        });
      } catch (e) {
        toast({
          type: 'error',
          tittle: 'Erro ao atualizar Ficha médica atualizada',
          description: 'Verifique a conexão, campos e tente novamente',
        });
      }
    },
    [headers, getPacientMedicalRecord],
  );

  const getPacientMedicine = useCallback(
    async (name: string) => {
      try {
        const result: AxiosResponse<MedicineResponse> = await api.get(
          `/medicamentos/listar?nomePaciente=${name}`,
          headers,
        );
        return result.data;
      } catch (e) {
        //
      }
    },
    [headers],
  );

  const addPacientMedicine = useCallback(
    async (newMedicines: AddMedicines) => {
      try {
        await api.post(`/medicamentos/salvar`, newMedicines, headers);
        return Promise.resolve();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.code === 'ERR_BAD_REQUEST') {
            return Promise.reject('duplicateEntryMedicine');
          }
        }
      }
    },
    [headers],
  );

  const updatePacientMedicine = useCallback(
    async (v: UpdateMedicine) => {
      try {
        await api.put(
          `/medicamentos/atualizar?nomePaciente=${v.nomePaciente}&nomeMedicamentoAntigo=${v.nomeMedicamentoAntigo}&novoNomeMedicamento=${v.novoNomeMedicamento}&novaQuantidade=${v.quantidade}`,
          {},
          headers,
        );
        return Promise.resolve();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.code === 'ERR_BAD_REQUEST') {
            return Promise.reject('duplicateEntryMedicine');
          }
        }
      }
    },
    [headers],
  );
  const deletePacientMedicine = useCallback(
    async (username: string, medicineName: string) => {
      try {
        await api.delete(
          `/medicamentos/remover?nomePaciente=${username}&nomeMedicamento=${medicineName}`,
          headers,
        );

        toast({
          type: 'success',
          tittle: 'Medicamento removido com Sucesso!',
          description: '',
        });
      } catch (e) {
        toast({
          type: 'error',
          tittle: 'Ops!',
          description: 'Ocorreu um erro ao tentar remover, tente novamente!',
        });
      }
    },
    [headers],
  );

  const getHospitalizationHistory = useCallback(async (name: string) => {
    try {
      const result: AxiosResponse<HospitalizationHistory[]> = await api.get(
        `/internacao/paciente/${name}`,
      );
      const formatedData = result.data.map((hospHistory) =>
        HospitalizationHistoryMapper.toDomain(hospHistory),
      );
      return formatedData;
    } catch (e) {
      return null;
    }
  }, []);
  const addHospitalizationHistory = useCallback(
    async (newHospitalizationHistory: AddHospitalizationHistory) => {
      const toPersistence = HospitalizationHistoryMapper.toPersistence(
        newHospitalizationHistory,
      );

      try {
        await api.post(`/internacao/adicionar`, toPersistence, headers);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.code === 'ERR_BAD_REQUEST') {
            return Promise.reject('duplicateEntryDate');
          }
        }
      }
    },
    [headers],
  );

  const updateHospitalizationHistory = useCallback(
    async (oldAdmissionDate: string, h: UpdateHospitalizationHistory) => {
      const toPersistence = HospitalizationHistoryMapper.toPersistence(h);

      const formatedDate = formatDateToPersistence(oldAdmissionDate);
      console.log(formatedDate, toPersistence);

      try {
        await api.put(
          `/internacao/atualizar?nomePaciente=${h.pacienteNome}&dataEntrada=${formatedDate}`,
          toPersistence,
          headers,
        );
      } catch (e) {
        {
          if (axios.isAxiosError(e)) {
            if (e.code === 'ERR_BAD_REQUEST') {
              return Promise.reject('duplicateEntryDate');
            }
          }
        }
      }
    },
    [headers],
  );
  const deleteHospitalizationHistory = useCallback(
    async (name: string, date: string) => {
      const formatedDate = formatDateToPersistence(date);
      try {
        await api.delete(
          `/internacao/excluir?nomePaciente=${name}&dataEntrada=${formatedDate}`,
          headers,
        );

        toast({
          type: 'success',
          tittle: 'Histórico removido com sucesso!',
          description: '',
        });
      } catch (e) {
        toast({
          type: 'error',
          tittle: 'Ops!',
          description: 'Ocorreu um erro ao tentar remover, tente novamente!',
        });
      }
    },
    [headers],
  );

  return (
    <PacientContext.Provider
      value={{
        allPacients,
        registerPacient,
        getAllPacients,
        updatePacient,
        getPacientMedicalRecord,
        addMedicalRecord,
        updateMedicalRecord,
        getPacientMedicine,
        addPacientMedicine,
        updatePacientMedicine,
        deletePacientMedicine,
        getHospitalizationHistory,
        addHospitalizationHistory,
        updateHospitalizationHistory,
        deleteHospitalizationHistory,
      }}
    >
      {children}
    </PacientContext.Provider>
  );
};
