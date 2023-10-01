import { Form, Input } from 'antd';

import DeleteModal from '../../../components/DeleteModal';
import { handleIsValidDate } from '../../../helpers/handleIsValidDate';
import { PatternFormat } from 'react-number-format';
import { validatorInputMasked } from '../../../helpers/validatorInputMasked';
import { usePacients } from '../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { HospitalizationHistory } from '../../../ts/Types/HospitalizationHistory.type';

interface Props {
  hospHistory: HospitalizationHistory;
  hospitalizationsHistory: HospitalizationHistory[];
  setHospitalizationHistory: Dispatch<SetStateAction<HospitalizationHistory[]>>;
}

export default function UpdateItem({
  hospHistory,
  hospitalizationsHistory,
  setHospitalizationHistory,
}: Props) {
  const { deleteHospitalizationHistory } = usePacients();
  const username = useParams().userName || '';
  const handleDeleteHospitalizationHistory = async (date: string) => {
    try {
      await deleteHospitalizationHistory(username, date);
      const filteredHospitalizationHistorys = hospitalizationsHistory.filter(
        (m) => m.dataEntradaInternacao !== date,
      );
      setHospitalizationHistory(filteredHospitalizationHistorys);
    } catch {
      //
    }
  };

  return (
    <>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Motivo da Internação</span>
          <Form.Item
            name={`motivoInternacao-${hospHistory.id}`}
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={hospHistory.motivoInternacao}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Data da Internação</span>
          <Form.Item
            name={`dataEntrada-${hospHistory.id}`}
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={hospHistory.dataEntradaInternacao}
          >
            <PatternFormat
              format="##/##/####"
              mask={'_'}
              placeholder=""
              isAllowed={handleIsValidDate}
              customInput={Input}
            />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Data da Alta</span>
          <Form.Item
            name={`dataSaida-${hospHistory.id}`}
            rules={[
              {
                validator: validatorInputMasked,
              },
            ]}
            initialValue={hospHistory.dataSaidaInternacao}
          >
            <PatternFormat
              format="##/##/####"
              mask={'_'}
              placeholder=""
              isAllowed={handleIsValidDate}
              customInput={Input}
            />
          </Form.Item>
        </div>
        <div className="delete-icon-wrapper">
          <DeleteModal
            deleteFunc={() =>
              handleDeleteHospitalizationHistory(hospHistory.dataEntradaInternacao)
            }
          />
        </div>
      </div>
    </>
  );
}
