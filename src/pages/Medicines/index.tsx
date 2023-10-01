import Container from '../../components/Container';

import WomanMedicines from '../../assets/images/illustrations/woman-medicines.svg';
import NoData from '../../assets/images/illustrations/no-data.svg';
import View from './View';
import { useCallback, useEffect, useState } from 'react';
import Form from './Form';
import { usePacients } from '../../providers/Pacients/usePacients';
import { Medicine } from '../../ts/Types/Medicine.type';
import { useParams } from 'react-router-dom';

export default function Medicines() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const { getPacientMedicine } = usePacients();
  const { userName } = useParams();

  const loadPacient = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPacientMedicine(userName || '');

      if (result) {
        setMedicines(result.listaPrescricao);
      }
    } catch {
      //
    }
    setLoading(false);
  }, [getPacientMedicine, userName]);

  useEffect(() => {
    void loadPacient();
  }, [loadPacient]);
  const renderView = loading ? true : medicines.at(-1) ? true : false;
  return (
    <>
      <Container
        tittle="Medicamentos"
        setFormVisible={setFormVisible}
        formVisible={formVisible}
        loading={loading}
      >
        {formVisible ? (
          <Form
            medicines={medicines}
            setFormVisible={setFormVisible}
            setMedicines={setMedicines}
          />
        ) : renderView ? (
          <View medicines={medicines} />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={NoData}
              alt="Três Médicos"
              style={{ alignSelf: 'center', width: '40%', maxHeight: 350 }}
            />
            <h2>Nenhum registro encontrado!</h2>
          </div>
        )}

        <img src={WomanMedicines} alt="Três Médicos" />
      </Container>
    </>
  );
}
