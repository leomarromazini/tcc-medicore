import MedicalRecordForm from './MedicalRecordForm';
import GenrealInfo from './GeneralInfoForm';
import { Pacient } from '../../../ts/Types/Pacient.type';
import { MedicalRecord } from '../../../ts/Types/MedicalRecord.type';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  pacient: Pacient | undefined;
  medicalRecord: MedicalRecord | undefined;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  setMedicalRecord: Dispatch<SetStateAction<MedicalRecord | undefined>>;
}

export default function Form({
  pacient,
  medicalRecord,
  setFormVisible,
  setMedicalRecord,
}: Props) {
  return (
    <main>
      <h2>Atualizar Informações Gerais</h2>
      <GenrealInfo pacient={pacient} setFormVisible={setFormVisible} />

      <h2>Atualizar Dados Médicos</h2>
      <MedicalRecordForm
        medicalRecord={medicalRecord}
        setFormVisible={setFormVisible}
        setMedicalRecord={setMedicalRecord}
      />
    </main>
  );
}
