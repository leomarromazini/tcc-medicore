import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import View from './View';
import { useState } from 'react';
import Form from './Form';

export default function MedicalRecord() {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      <Container
        tittle="Pacientes"
        setFormVisible={setFormVisible}
        formVisible={formVisible}
      >
        {formVisible ? <Form /> : <View />}

        <img src={ThreeDoctors} alt="Três Médicos" />
      </Container>
    </>
  );
}
