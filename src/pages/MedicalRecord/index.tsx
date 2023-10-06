import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import View from './View';
import { useCallback, useEffect, useState } from 'react';
import Form from './Form';
import { Pacient } from '../../ts/Types/Pacient.type';
import { usePacients } from '../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';
import { MedicalRecord as MedicalRecordType } from '../../ts/Types/MedicalRecord.type';

export default function MedicalRecord() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pacient, setPacient] = useState<Pacient>();
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordType>();

  const { getAllPacients, allPacients, getPacientMedicalRecord } = usePacients();
  const { userName } = useParams();

  const filterPacient = useCallback(() => {
    const pacient = allPacients?.filter((pacient) => pacient.nome === userName)[0];

    setPacient(pacient);
  }, [allPacients, userName]);

  const loadData = useCallback(async () => {
    try {
      const pacientMedicalrecord = await getPacientMedicalRecord(userName || '');
      console.log(pacientMedicalrecord);
      await getAllPacients();
      setMedicalRecord(pacientMedicalrecord);
      setLoading(false);
    } catch {
      //
    }
  }, [getPacientMedicalRecord, userName, getAllPacients]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    filterPacient();
  }, [filterPacient]);

  return (
    <Container
      tittle="Pacientes"
      setFormVisible={setFormVisible}
      formVisible={formVisible}
      loading={loading}
    >
      {formVisible ? (
        <Form
          pacient={pacient}
          medicalRecord={medicalRecord}
          setFormVisible={setFormVisible}
          setMedicalRecord={setMedicalRecord}
        />
      ) : (
        <View pacient={pacient} medicalRecord={medicalRecord} />
      )}

      <img src={ThreeDoctors} alt="Três Médicos" />
    </Container>
  );
}
