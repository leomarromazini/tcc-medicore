import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import View from './View';
import { useCallback, useEffect, useState } from 'react';
import Form from './Form';
import { usePacients } from '../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';

export default function HospitalizationHistory() {
  const [formVisible, setFormVisible] = useState(false);
  const { getHospitalizationHistory } = usePacients();

  const { userName } = useParams();

  const loadPacients = useCallback(async () => {
    try {
      if (userName) {
        await getHospitalizationHistory(userName);
      }
    } catch {
      //
    }
  }, [getHospitalizationHistory, userName]);

  useEffect(() => {
    void loadPacients();
  }, [loadPacients]);

  return (
    <>
      <Container
        tittle="Medicamentos"
        setFormVisible={setFormVisible}
        formVisible={formVisible}
      >
        {formVisible ? <Form /> : <View />}

        <img src={ThreeDoctors} alt="Três Médicos" />
      </Container>
    </>
  );
}
