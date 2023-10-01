import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { Pacient } from '../../../ts/Types/Pacient.type';

type DataType = {
  key: React.Key;
  nome: string;
  cpf: number;
  email: string;
  dataDeNascimentoFormatted: string;
};

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

interface Props {
  pacients: Pacient[];
}

export default function UsersTable({ pacients }: Props) {
  const navigate = useNavigate();
  const handleUserDetails = (userName: string) => {
    navigate(`/medical-record/${userName}`);
  };

  const pageSize = 30;
  return (
    <Table
      columns={columns}
      dataSource={pacients}
      showSorterTooltip={false}
      pagination={{ pageSize: pageSize, total: pacients.length }}
      style={{ cursor: 'pointer' }}
      onRow={(record) => {
        return {
          onClick: () => {
            handleUserDetails(record?.nome);
          }, // click row
        };
      }}
    />
  );
}
