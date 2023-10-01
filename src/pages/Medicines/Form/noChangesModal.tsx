import { Modal } from 'antd';

export default function noChangesModal() {
  const { error } = Modal;
  error({
    title: 'Atualizações não foram enviadas',
    content: 'Nenhuma alteração encontrada!',
    okText: 'Voltar',
    okType: 'default',
  });
}
