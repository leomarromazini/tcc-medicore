import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import View from './View';
import { useCallback, useEffect, useState } from 'react';
import Form from './Form';
import { usePacients } from '../../providers/Pacients/usePacients';

export default function Medicines() {
  const [formVisible, setFormVisible] = useState(false);
  // const { getAllPacients, pacients } = usePacients();

  // const loadPacients = useCallback(async () => {
  //   try {
  //     await getAllPacients();
  //   } catch {
  //     //
  //   }
  // }, [getAllPacients]);

  // useEffect(() => {
  //   void loadPacients();
  // }, [loadPacients]);

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
