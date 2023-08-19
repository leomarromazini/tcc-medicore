import { useEffect } from 'react';
import { Container } from './styles';

import HomeImg from '../../assets/images/illustrations/three-doctors.svg';
import { useNavigate } from 'react-router-dom';
import { useDoctors } from '../../providers/Doctors/useDoctors';

export default function Home() {
  const { doctorToken } = useDoctors();
  const navigate = useNavigate();
  useEffect(() => {
    if (doctorToken) {
      navigate('/dashboard');
    }
  }, [doctorToken, navigate]);
  return (
    <Container>
      <div>
        <h1>
          Usamos a tecnologia para ajudar a cuidar da parte mais importante de sua vida.
        </h1>
        <h2>Gerencie a sua saúde em qualquer lugar com a Medicore.</h2>
      </div>

      <img src={HomeImg} alt="Três Médicos" />
    </Container>
  );
}
