/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Form as AntForm } from 'antd';
import Button from '../../../components/Button';

import { Medicine } from '../../../ts/Types/Medicine.type';
import UpdateItem from './UpdateItem';

import SubmitButton from '../../../components/SubmitButton';
import { Dispatch, SetStateAction, useState } from 'react';
import NewItem from './NewItem';

import noChangesModal from './noChangesModal';
import { usePacients } from '../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';
import { NewMedicine } from '../../../ts/Interfaces/AddMedicines';
import { toast } from '../../../components/Toast';

interface Props {
  medicines: Medicine[];
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  setMedicines: Dispatch<SetStateAction<Medicine[]>>;
}
type FormValues = {
  [chave: string]: string;
};
export default function Form({ medicines, setFormVisible, setMedicines }: Props) {
  const [loading, setLoading] = useState(false);

  const { updatePacientMedicine, addPacientMedicine, getPacientMedicine } =
    usePacients();
  const userName = useParams().userName || '';

  const handleUpdateAndAddMedicines = async (f: FormValues) => {
    setLoading(true);
    const toBeUpdatedItems: Medicine[] = [];

    for (let i = 0; i < medicines.length; i++) {
      const medicine = medicines[i];

      if (medicine.formattedDataPrescricao !== f[`dataPrescricao-${medicine.id}`]) {
        toBeUpdatedItems.push(medicine);
      } else if (medicine.nomeMedicamento !== f[`nomeMedicamento-${medicine.id}`]) {
        toBeUpdatedItems.push(medicine);
      } else if (medicine.quantidade !== parseInt(f[`quantidade-${medicine.id}`])) {
        toBeUpdatedItems.push(medicine);
      }
    }

    if (!toBeUpdatedItems.length && !f['novoNomeMedicamento-0']) {
      noChangesModal();
      setLoading(false);
      return;
    }

    for (let i = 0; i < toBeUpdatedItems.length; i++) {
      const id = toBeUpdatedItems[i].id;
      await updatePacientMedicine({
        id: id,
        nomePaciente: userName,
        nomeMedicamento:
          f[`nomeMedicamento-${id}`] || toBeUpdatedItems[i].nomeMedicamento,
        quantidade:
          parseFloat(f[`quantidade-${id}`]) || toBeUpdatedItems[i].quantidade,
        dataPrescricao:
          f[`dataPrescricao-${id}`] || toBeUpdatedItems[i].dataPrescricao,
      });
    }

    if (f['novoNomeMedicamento-0']) {
      const newMedicines: NewMedicine[] = [];
      for (let i = 0; ; i++) {
        if (f[`novoNomeMedicamento-${i}`]) {
          newMedicines.push({
            nomeMedicamento: f[`novoNomeMedicamento-${i}`],
            dataPrescricao: f[`novaDataPrescricao-${i}`],
            quantidade: parseFloat(f[`novaQuantidade-${i}`]),
          });
        } else {
          break;
        }
      }

      await addPacientMedicine({ nome: userName, prescricoes: newMedicines });
    }
    const updatedMedicines = await getPacientMedicine(userName);
    if (updatedMedicines) {
      setMedicines(updatedMedicines.listaPrescricao);
    }

    setLoading(false);
    toast({
      type: 'success',
      tittle: 'Medicamentos atualizados',
      description: 'Parabéns, medicamentos atualizados com sucesso!',
    });
    setFormVisible(false);
  };

  const [form] = AntForm.useForm();

  return (
    <main>
      <h2>Atualizar Medicamentos</h2>
      <AntForm
        name="updateAndAddMedicines"
        initialValues={{ remember: true }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onFinish={handleUpdateAndAddMedicines}
        form={form}
      >
        {medicines.map((medicine) => (
          <UpdateItem
            medicine={medicine}
            key={medicine.id}
            medicines={medicines}
            setMedicines={setMedicines}
          />
        ))}
        <NewItem antForm={form} />
        <div className="buttons-wrapper">
          <Button onClick={() => setFormVisible(false)}>Cancelar</Button>
          <SubmitButton
            antForm={form}
            type="primary"
            loading={loading}
            htmlType="submit"
          >
            Atualizar
          </SubmitButton>
        </div>
      </AntForm>
    </main>
  );
}
