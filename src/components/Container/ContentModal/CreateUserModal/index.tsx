import { useState } from 'react';
import { Divider, Form as FormAnt, Input, InputNumber, Modal } from 'antd';
import Button from '../../../Button';
import { BiPlusCircle } from 'react-icons/bi';
import { Container } from './styles';
import { AddPacientForm } from '../../../../ts/Interfaces/AddPacientForm';
import { usePacients } from '../../../../providers/Pacients/usePacients';

export default function CreateUserModal() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerPacient } = usePacients();

  const [form] = FormAnt.useForm();

  const onFinish = async (values: AddPacientForm) => {
    delete values.repassword;
    setLoading(true);
    await registerPacient(values);
    if (loading) {
      //successfullyRegistered) {
      setVisible(false);

      form.resetFields();
    }
    setLoading(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
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
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <Input placeholder="Nome" />
            </FormAnt.Item>

            <FormAnt.Item
              name="cpf"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <InputNumber placeholder="CPF" controls={false} style={{ width: '100%' }} />
            </FormAnt.Item>

            <FormAnt.Item
              name="email"
              hasFeedback
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
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <Input placeholder="Data de Nascimento" />
            </FormAnt.Item>
            <FormAnt.Item
              name="endereco"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <Input placeholder="Endereço Completo" />
            </FormAnt.Item>
            <FormAnt.Item
              name="telefone"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
              ]}
            >
              <InputNumber
                placeholder="Telefone"
                controls={false}
                style={{ width: '100%' }}
              />
            </FormAnt.Item>

            <FormAnt.Item
              hasFeedback
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório!',
                },
                {
                  type: 'string',
                  min: 6,
                  message: 'A senha deve conter 6 caracteres',
                },
              ]}
            >
              <Input.Password placeholder="Senha" />
            </FormAnt.Item>
            <FormAnt.Item
              name="repassword"
              dependencies={['password']}
              hasFeedback
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
