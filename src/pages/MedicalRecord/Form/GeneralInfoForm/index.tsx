import { Form, Input } from 'antd';

import Button from '../../../../components/Button';
import { Pacient } from '../../../../ts/Types/Pacient.type';
import { Dispatch, SetStateAction, useState } from 'react';
import { handleIsValidDate } from '../../../../helpers/handleIsValidDate';
import { PatternFormat } from 'react-number-format';
import { validatorInputMasked } from '../../../../helpers/validatorInputMasked';
import { UpdatePacientForm } from '../../../../ts/Interfaces/UpdatePacientForm';
import SubmitButton from '../../../../components/SubmitButton';
import { usePacients } from '../../../../providers/Pacients/usePacients';
import { useParams } from 'react-router-dom';

interface Props {
  pacient: Pacient | undefined;
  setFormVisible: Dispatch<SetStateAction<boolean>>;
}

export default function GeneralInfo({ pacient, setFormVisible }: Props) {
  const [loading, setLoading] = useState(false);
  const [formChange, setFormChange] = useState(false);

  const { updatePacient } = usePacients();
  const userName = useParams().userName || '';

  const handleUpdateGeneralInfo = async (values: UpdatePacientForm) => {
    setLoading(true);

    values.cpf = values.cpf.replaceAll('.', '').replaceAll('-', '');
    values.telefone = values.telefone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');
    values.nome = userName;
    await updatePacient(values);

    setLoading(false);
  };

  const [form] = Form.useForm();

  return (
    <Form
      name="updateGeneralinfo"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={handleUpdateGeneralInfo}
      form={form}
      onValuesChange={() => setFormChange(true)}
    >
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Nome</span>
          <span className="data">{pacient?.nome}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">E-mail</span>
          <Form.Item
            hasFeedback
            initialValue={pacient?.email}
            name="email"
            rules={[
              { required: true, message: 'Campo obrigatório!' },
              {
                type: 'email',
                message: 'E-mail inválido!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">CPF</span>
          <Form.Item
            hasFeedback
            name="cpf"
            initialValue={pacient?.cpf}
            rules={[
              {
                validator: validatorInputMasked,
              },
            ]}
          >
            <PatternFormat
              placeholder="CPF"
              format={'###.###.###-##'}
              mask={'_'}
              min={0}
              style={{ width: '100%' }}
              customInput={Input}
            />
          </Form.Item>
        </div>
      </div>

      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Data de Nascimento</span>
          <Form.Item
            hasFeedback
            name="dataDeNascimento"
            initialValue={pacient?.dataDeNascimentoFormatted}
            rules={[
              {
                validator: validatorInputMasked,
              },
            ]}
          >
            <PatternFormat
              format="##/##/####"
              mask={'_'}
              placeholder="Data de nascimento"
              isAllowed={handleIsValidDate}
              customInput={Input}
            />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Endereço Completo</span>
          <Form.Item
            hasFeedback
            name="endereco"
            initialValue={pacient?.enderecoCompleto}
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Telefone</span>
          <Form.Item
            hasFeedback
            name="telefone"
            initialValue={pacient?.telefone}
            rules={[
              {
                validator: validatorInputMasked,
              },
            ]}
          >
            <PatternFormat
              format={'(##)#####-####'}
              mask={'_'}
              placeholder="Telefone"
              customInput={Input}
            />
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
