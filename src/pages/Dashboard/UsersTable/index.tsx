import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

type DataType = {
  key: React.Key;
  nome: string;
  cpf: number;
  email: string;
  dataDeNascimentoFormatted: string;
};

const users = [
  {
    key: '1',
    nome: 'Isa Dutra',
    cpf: 1123045617,
    //"enderecoCompleto": "Rua do Paciente, 123",
    email: 'isa@example.com',
    dataDeNascimentoFormatted: '25/08/1992',
    //"telefone": 987654321
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    sorter: (a, b) => a.cpf.toString().localeCompare(b.cpf.toString()),
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Data de Nascimento',
    dataIndex: 'dataDeNascimentoFormatted',
    sorter: (a, b) =>
      a.dataDeNascimentoFormatted.localeCompare(b.dataDeNascimentoFormatted),
  },
];

export default function UsersTable() {
  const navigate = useNavigate();
  const handleUserDetails = (userName: string) => {
    navigate(`/medical-record/${userName}`);
  };

  const pageSize = 30;
  return (
    <Table
      columns={columns}
      dataSource={users}
      showSorterTooltip={false}
      pagination={{ pageSize: pageSize, total: users.length }}
      style={{ cursor: 'pointer' }}
      onRow={(record) => {
        return {
          onClick: () => {
            handleUserDetails(record.nome);
          }, // click row
        };
      }}
    />
  );
}
