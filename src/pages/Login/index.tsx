import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input } from 'antd';
import { Container } from './styles';

import Button from '../../components/Button';
import { useDoctors } from '../../providers/Doctors/useDoctors';

import { LoginForm } from '../../ts/Interfaces/LoginForm';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginDoctor, doctorToken } = useDoctors();

  useEffect(() => {
    if (doctorToken) {
      navigate('/dashboard');
    }
  }, [doctorToken, navigate]);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    const loginSuccess = await loginDoctor(values);

    if (loginSuccess) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <Container>
      <div>
        <h1>Entrar</h1>
        {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
          >
            <Input placeholder="Usuário" className="password" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Entrar
          </Button>
        </Form>
      </div>
    </Container>
  );
}
