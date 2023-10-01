import { useState } from 'react';
import { Divider, Form as FormAnt, Input, Modal } from 'antd';
import Button from '../../../Button';
import { BiPlusCircle } from 'react-icons/bi';
import { Container } from './styles';
import { AddPacientForm } from '../../../../ts/Interfaces/AddPacientForm';
import { usePacients } from '../../../../providers/Pacients/usePacients';
import { PatternFormat } from 'react-number-format';
import { handleIsValidDate } from '../../../../helpers/handleIsValidDate';
import { validatorInputMasked } from '../../../../helpers/validatorInputMasked';

export default function CreateUserModal() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerPacient } = usePacients();

  const [form] = FormAnt.useForm();

  const onFinish = async (values: AddPacientForm) => {
    delete values.repassword;
    setLoading(true);

    values.cpf = values.cpf.replaceAll('.', '').replaceAll('-', '');
    values.telefone = values.telefone
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');
    // values.celular = parseInt(values.celular.slice(0, 10));
    // values.cpf = parseInt(values.cpf);

    await registerPacient(values);

    setVisible(false);

    form.resetFields();

    setLoading(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    //form.resetFields();
  };

  return (
    <div>
      <div className="icon-wrapper" onClick={showModal}>
        <BiPlusCircle />
        <span>Cadastrar Paciente</span>
      </div>

      <Modal
        open={visible}
        title="Cadastrar Paciente"
        onCancel={handleCancel}
        footer={null}
        width="519.7px"
        bodyStyle={{
          backgroundColor: 'var(--background)',
          padding: 30,
          position: 'relative',
          width: '110.2%',
          minWidth: '468px',
          right: '23.7px',
        }}
      >
        <Container>
          <FormAnt
            form={form}
            name="register"
            //eslint-disable-next-line @typescript-eslint/no-misused-promises
            onFinish={onFinish}
            scrollToFirstError
          >
            <FormAnt.Item
              name="nome"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
                {
                  min: 3,
                  message: 'O campo conter 3 caracteres',
                },
              ]}
            >
              <Input placeholder="Nome" />
            </FormAnt.Item>

            <FormAnt.Item
              name="cpf"
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
            </FormAnt.Item>

            <FormAnt.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'E-mail inválido!',
                },
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <Input placeholder="E-mail" />
            </FormAnt.Item>
            <FormAnt.Item
              name="dataDeNascimento"
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
            </FormAnt.Item>
            <FormAnt.Item
              name="endereco"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
                {
                  min: 5,
                  message: 'O campo conter 5 caracteres',
                },
              ]}
            >
              <Input placeholder="Endereço Completo" />
            </FormAnt.Item>
            <FormAnt.Item
              name="telefone"
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
            </FormAnt.Item>

            <FormAnt.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
                {
                  min: 6,
                  message: 'O campo conter 6 caracteres',
                },
              ]}
            >
              <Input.Password placeholder="Senha" />
            </FormAnt.Item>
            <FormAnt.Item
              name="repassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas estão diferentes!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confrime a Senha" />
            </FormAnt.Item>
            <footer>
              <Divider />
              <div>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Adicionar
                </Button>
              </div>
            </footer>
          </FormAnt>
        </Container>
      </Modal>
    </div>
  );
}
