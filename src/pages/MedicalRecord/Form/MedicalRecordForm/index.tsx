import { Form, Input } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';

import Button from '../../../../components/Button';
import { MedicalRecord } from '../../../../ts/Types/MedicalRecord.type';
import SubmitButton from '../../../../components/SubmitButton';
import { UpdateMedicalRecordForm } from '../../../../ts/Interfaces/UpdateMedicalRecordForm';
import { NumericFormat } from 'react-number-format';
import { UpdateMedicalRecord } from '../../../../ts/Interfaces/UpdateMedicalRecord';
import { usePacients } from '../../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';

interface Props {
  medicalRecord: MedicalRecord | undefined;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  setMedicalRecord: Dispatch<SetStateAction<MedicalRecord | undefined>>;
}

export default function MedicalRecordForm({
  medicalRecord,
  setFormVisible,
  setMedicalRecord,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [formChange, setFormChange] = useState(false);

  const { updateMedicalRecord, getPacientMedicalRecord } = usePacients();
  const { userName } = useParams();

  const handleUpdateMedicalRecords = async (form: UpdateMedicalRecordForm) => {
    setLoading(true);

    const medicalRecord: UpdateMedicalRecord = {
      nome: form.nome,
      dataDeNascimento: form.dataDeNascimento,
      sexo: form.sexo,
      peso: form.peso,
      altura: form.altura,
      problemasDeSaude: {
        doencasCronicas: form.doencasCongenitas.split(', '),
        doencasCongenitas: form.doencasCronicas.split(', '),
      },
      alergias: form.alergias,
    };
    await updateMedicalRecord(userName || '', medicalRecord);

    const newMedicalRecord = await getPacientMedicalRecord(userName || '');
    setMedicalRecord(newMedicalRecord);

    setLoading(false);
  };
  const [form] = Form.useForm();
  return (
    <Form
      name="updateMedicalRecords"
      initialValues={{ remember: true }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleUpdateMedicalRecords}
      onValuesChange={() => setFormChange(true)}
    >
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Peso</span>
          <Form.Item
            hasFeedback
            name="peso"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.peso}
          >
            <NumericFormat customInput={Input} allowNegative={false} />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Altura</span>
          <Form.Item
            hasFeedback
            name="altura"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.altura}
          >
            <NumericFormat customInput={Input} allowNegative={false} />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Sexo</span>
          <Form.Item
            hasFeedback
            name="sexo"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.sexo}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Alergias</span>
          <Form.Item
            hasFeedback
            name="alergias"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.alergias}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Doenças Congênitas</span>
          <Form.Item
            hasFeedback
            name="doencasCongenitas"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.problemasDeSaude.doencasCongenitas.join(
              ', ',
            )}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Doenças Crônicas</span>
          <Form.Item
            hasFeedback
            name="doencasCronicas"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
            initialValue={medicalRecord?.problemasDeSaude.doencasCronicas.join(', ')}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="buttons-wrapper">
        <Button onClick={() => setFormVisible(false)}>Cancelar</Button>
        <SubmitButton
          antForm={form}
          type="primary"
          loading={loading}
          htmlType="submit"
          onFormItemChanged={formChange}
        >
          Atualizar
        </SubmitButton>
      </div>
    </Form>
  );
}
