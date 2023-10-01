import Container from '../../components/Container';

import DoctorXray from '../../assets/images/illustrations/doctor-looking-xray.svg';
import NoData from '../../assets/images/illustrations/no-data.svg';
import View from './View';
import { useCallback, useEffect, useState } from 'react';
import Form from './Form';
import { usePacients } from '../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';

import { HospitalizationHistory as HospHistory } from '../../ts/Types/HospitalizationHistory.type';

export default function HospitalizationHistory() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hospitalizationHistory, setHospitalizationHistory] = useState<
    HospHistory[]
  >([]);

  const { getHospitalizationHistory } = usePacients();

  const { userName } = useParams();

  const loadPacients = useCallback(async () => {
    try {
      if (userName) {
        const result = await getHospitalizationHistory(userName);
        if (result) {
          setHospitalizationHistory(result);
        }
      }
    } catch {
      //
    }
    setLoading(false);
  }, [getHospitalizationHistory, userName]);

  useEffect(() => {
    void loadPacients();
  }, [loadPacients]);

  const renderView = loading ? true : hospitalizationHistory.at(-1) ? true : false;

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
            hospitalizationsHistory={hospitalizationHistory}
            setFormVisible={setFormVisible}
            setHospitalizationHistory={setHospitalizationHistory}
          />
        ) : renderView ? (
          <View hospitalizationsHistory={hospitalizationHistory} />
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

        <img src={DoctorXray} alt="Três Médicos" />
      </Container>
    </>
  );
}
