import { ButtonProps, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

import Button from '../Button';

type Props = ButtonProps & {
  antForm: FormInstance<unknown>;
  loading: boolean;
  onFormItemChanged?: boolean;
};

const SubmitButton = ({
  antForm,
  loading,
  onFormItemChanged = true,
  children,
  ...rest
}: Props) => {
  const [disable, setDisable] = useState(true);

  const values = Form.useWatch([], antForm);

  useEffect(() => {
    if (!onFormItemChanged) {
      return;
    }

    antForm.validateFields({ validateOnly: true }).then(
      () => {
        setDisable(false);
      },
      () => {
        setDisable(true);
      },
    );
  }, [values, antForm, onFormItemChanged]);

  return (
    <Button htmlType="submit" disabled={disable} loading={loading} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
