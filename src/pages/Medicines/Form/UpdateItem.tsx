import { Form, Input } from 'antd';

import DeleteModal from '../../../components/DeleteModal';
import { Medicine } from '../../../ts/Types/Medicine.type';
import { handleIsValidDate } from '../../../helpers/handleIsValidDate';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { validatorInputMasked } from '../../../helpers/validatorInputMasked';
import { usePacients } from '../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  medicine: Medicine;
  medicines: Medicine[];
  setMedicines: Dispatch<SetStateAction<Medicine[]>>;
}

export default function UpdateItem({ medicine, medicines, setMedicines }: Props) {
  const { deletePacientMedicine } = usePacients();
  const username = useParams().userName || '';
  const handleDeleteMedicine = async (toBeDeleteMedicine: string) => {
    try {
      await deletePacientMedicine(username, toBeDeleteMedicine);
      const filteredMedicines = medicines.filter(
        (m) => m.nomeMedicamento !== toBeDeleteMedicine,
      );
      setMedicines(filteredMedicines);
    } catch {
      //
    }
  };

  return (
    <>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Nome</span>
          <Form.Item
            name={`nomeMedicamento-${medicine.id}`}
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicine.nomeMedicamento}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Quantidade</span>
          <Form.Item
            name={`quantidade-${medicine.id}`}
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicine.quantidade}
          >
            <NumericFormat customInput={Input} allowNegative={false} />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Data da Prescrição</span>
          <Form.Item
            name={`dataPrescricao-${medicine.id}`}
            rules={[
              {
                validator: validatorInputMasked,
              },
            ]}
            initialValue={medicine.formattedDataPrescricao}
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
            deleteFunc={() => handleDeleteMedicine(medicine.nomeMedicamento)}
          />
        </div>
      </div>
    </>
  );
}
