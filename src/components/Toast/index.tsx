import { notification } from 'antd';

interface ToastInterface {
  type: 'success' | 'info' | 'warning' | 'error';
  tittle: string;
  description: string;
}

export const toast = ({ type, tittle, description }: ToastInterface) => {
  notification[type]({
    message: tittle,
    description: description,
  });
};
