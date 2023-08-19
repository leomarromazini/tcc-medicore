import { Form as AntForm, Input } from 'antd';
import Button from '../../../components/Button';
import { BiTrash } from 'react-icons/bi';

export default function Form() {
  const handleUpdateGeneralInfo = (values: string) => {
    console.log(values);
  };

  return (
    <main>
      <h2>Informações Gerais</h2>
      <AntForm
        name="updateGeneralinfo"
        initialValues={{ remember: true }}
        onFinish={handleUpdateGeneralInfo}
      >
        <div className="row-wrapper">
          <div className="cell-wrapper">
            <span className="tittle">Nome</span>
            <AntForm.Item
              name="nome"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">E-mail</span>
            <AntForm.Item
              name="email"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">CPF</span>
            <AntForm.Item
              name="cpf"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="delete-icon-wrapper">
            <BiTrash size={32} />
          </div>
        </div>

        <div className="row-wrapper">
          <div className="cell-wrapper">
            <span className="tittle">Data de Nascimento</span>
            <AntForm.Item
              name="cpf"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">Endereço Completo</span>
            <AntForm.Item
              name="cpf"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">Telefone</span>
            <AntForm.Item
              name="cpf"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}
            >
              <Input />
            </AntForm.Item>
          </div>
          <div className="delete-icon-wrapper">
            <BiTrash size={32} />
          </div>
        </div>
        <div className="buttons-wrapper">
          <Button>Cancelar</Button>
          <Button type="primary" htmlType="submit">
            Atualizar
          </Button>
        </div>
      </AntForm>
    </main>
  );
}
