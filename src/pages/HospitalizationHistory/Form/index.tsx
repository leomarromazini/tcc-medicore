/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Form as AntForm } from 'antd';
import Button from '../../../components/Button';

import UpdateItem from './UpdateItem';

import SubmitButton from '../../../components/SubmitButton';
import { Dispatch, SetStateAction, useState } from 'react';
import NewItem from './NewItem';

import noChangesModal from './noChangesModal';
import { usePacients } from '../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';

import { toast } from '../../../components/Toast';
import { HospitalizationHistory } from '../../../ts/Types/HospitalizationHistory.type';

interface Props {
  hospitalizationsHistory: HospitalizationHistory[];
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  setHospitalizationHistory: Dispatch<SetStateAction<HospitalizationHistory[]>>;
}
type FormValues = {
  [chave: string]: string;
};
export default function Form({
  hospitalizationsHistory,
  setFormVisible,
  setHospitalizationHistory,
}: Props) {
  const [loading, setLoading] = useState(false);

  const {
    updateHospitalizationHistory,
    addHospitalizationHistory,
    getHospitalizationHistory,
  } = usePacients();
  const userName = useParams().userName || '';

  const handleUpdateAndAddHospHistory = async (f: FormValues) => {
    setLoading(true);
    const toBeUpdatedItems: HospitalizationHistory[] = [];

    for (let i = 0; i < hospitalizationsHistory.length; i++) {
      const hospHistory = hospitalizationsHistory[i];

      if (hospHistory.motivoInternacao !== f[`motivoInternacao-${hospHistory.id}`]) {
        toBeUpdatedItems.push(hospHistory);
      } else if (
        hospHistory.dataEntradaInternacao !== f[`dataEntrada-${hospHistory.id}`]
      ) {
        toBeUpdatedItems.push(hospHistory);
      } else if (
        hospHistory.dataSaidaInternacao !== f[`dataSaida-${hospHistory.id}`]
      ) {
        toBeUpdatedItems.push(hospHistory);
      }
    }

    if (!toBeUpdatedItems.length && !f['novaDataEntrada-0']) {
      noChangesModal();
      setLoading(false);
      return;
    }
    try {
      if (toBeUpdatedItems.length) {
        for (let i = 0; i < toBeUpdatedItems.length; i++) {
          const id = toBeUpdatedItems[i].id;
          await updateHospitalizationHistory(
            toBeUpdatedItems[i].dataEntradaInternacao,
            {
              pacienteNome: userName,
              motivoInternacao:
                f[`motivoInternacao-${id}`] || toBeUpdatedItems[i].motivoInternacao,
              dataEntrada:
                f[`dataEntrada-${id}`] || toBeUpdatedItems[i].dataEntradaInternacao,
              dataSaida:
                f[`dataSaida-${id}`] || toBeUpdatedItems[i].dataSaidaInternacao,
            },
          );
        }
        toast({
          type: 'success',
          tittle: 'Histórico de internações atualizado',
          description: 'Parabéns, Histórico atualizado com sucesso!',
        });
      }
    } catch (e) {
      toast({
        type: 'error',
        tittle: 'Erro ao atualizar histórico',
        description: 'Já existe uma internação registrada nessa data!',
      });
    }
    try {
      if (f['novaDataEntrada-0']) {
        for (let i = 0; ; i++) {
          if (f[`novaDataEntrada-${i}`]) {
            await addHospitalizationHistory({
              pacienteNome: userName,
              dataEntrada: f[`novaDataEntrada-${i}`],
              dataSaida: f[`novaDataSaida-${i}`],
              motivoInternacao: f[`novoMotivoInternacao-${i}`],
            });
          } else {
            break;
          }
        }
        toast({
          type: 'success',
          tittle: 'Internações adicionadas',
          description: 'Parabéns, internações atualizado com sucesso!',
        });
      }
    } catch (e) {
      toast({
        type: 'error',
        tittle: 'Erro ao adicionar internação!',
        description: 'Já existe uma internação registrada nessa data!',
      });
    }
    const updatedHospHistory = await getHospitalizationHistory(userName);
    if (updatedHospHistory) {
      setHospitalizationHistory(updatedHospHistory);
    }

    setLoading(false);

    setFormVisible(false);
  };

  const [form] = AntForm.useForm();

  return (
    <main>
      <h2>Atualizar Histórico de Internação</h2>
      <AntForm
        name="updateAndAddHospHistory"
        initialValues={{ remember: true }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onFinish={handleUpdateAndAddHospHistory}
        form={form}
      >
        {hospitalizationsHistory.map((hospHistory) => (
          <UpdateItem
            hospHistory={hospHistory}
            key={hospHistory.id}
            hospitalizationsHistory={hospitalizationsHistory}
            setHospitalizationHistory={setHospitalizationHistory}
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
