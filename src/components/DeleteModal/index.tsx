import { App } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BiTrash } from 'react-icons/bi';

//const { confirm } = Modal;

type Props = {
  deleteFunc: () => Promise<void>;
};

export default function DeleteModal({ deleteFunc }: Props) {
  const { modal } = App.useApp();
  const showDeleteConfirm = () => {
    modal.confirm({
      title: 'Tem certeza que deseja deletar?',
      icon: <ExclamationCircleOutlined />,
      content: 'A ação não podera ser desfeita',
      okText: 'Excluir',
      okType: 'primary',
      okButtonProps: {
        danger: true,
      },
      cancelText: 'Cancelar',
      onOk() {
        void deleteFunc();
      },
    });
  };
  return <BiTrash size={32} key="delete" onClick={() => showDeleteConfirm()} />;
}
