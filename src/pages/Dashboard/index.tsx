import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import Container from '../../components/Container';

import ThreeDoctors from '../../assets/images/illustrations/three-doctors.svg';
import { Input } from 'antd';
import Button from '../../components/Button';
import UsersTable from './UsersTable';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePacients } from '../../providers/Pacients/usePacients';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { getAllPacients, allPacients } = usePacients();

  const loadPacients = useCallback(async () => {
    try {
      await getAllPacients();
    } catch {
      //
    }
    setLoading(false);
  }, [getAllPacients]);

  useEffect(() => {
    void loadPacients();
  }, [loadPacients]);

  const filteredPacients = useMemo(
    () =>
      allPacients.filter((pacient) =>
        pacient.nome.toLowerCase().includes(searchTerm?.toLowerCase()),
      ),

    [allPacients, searchTerm],
  );

  return (
    <Container
      tittle="Pacientes"
      formVisible={formVisible}
      setFormVisible={setFormVisible}
      loading={loading}
    >
      <main>
        <Input
          style={{ border: '1px solid #3D93F0', height: 40 }}
          placeholder="Nome"
          prefix={<HiMiniMagnifyingGlass />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          type="primary"
          style={{ margin: '14px 0', width: 120 }}
          onClick={() => setSearchTerm(searchInput)}
        >
          Pesquisar
        </Button>

        <UsersTable pacients={filteredPacients} />
      </main>

      <img src={ThreeDoctors} alt="Três Médicos" />
    </Container>
  );
}
