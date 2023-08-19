import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import { Input } from 'antd';
import Button from '../../components/Button';
import UsersTable from './UsersTable';

import { useCallback, useEffect, useState } from 'react';
import { usePacients } from '../../providers/Pacients/usePacients';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const { getAllPacients, pacients } = usePacients();
  const loadPacients = useCallback(async () => {
    try {
      await getAllPacients();
    } catch {
      //
    }
  }, [getAllPacients]);

  useEffect(() => {
    void loadPacients();
  }, [loadPacients]);

  return (
    <>
      <Container
        tittle="Pacientes"
        formVisible={formVisible}
        setFormVisible={setFormVisible}
      >
        <main>
          <Input
            style={{ border: '1px solid #3D93F0', height: 40 }}
            placeholder="Nome"
            prefix={<HiMiniMagnifyingGlass />}
          />
          <Button type="primary" style={{ margin: '14px 0', width: 120 }}>
            Pesquisar
          </Button>
          <UsersTable />
        </main>

        <img src={ThreeDoctors} alt="Três Médicos" />
      </Container>
    </>
  );
}
