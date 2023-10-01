import { Form, FormInstance, Input } from 'antd';
import { useCallback, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

import { RuleObject } from 'antd/es/form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { handleIsValidDate } from '../../../helpers/handleIsValidDate';
interface Medicines {
  nomeMedicamento: string;
  quantidade: number;
  dataPrescricao: string;
  createdNewForm: boolean;
}
interface Props {
  antForm: FormInstance<MeuObjeto>;
}
type MeuObjeto = {
  [chave: string]: string;
};

interface Rules {
  field: string;
}

export default function NewItem({ antForm }: Props) {
  const [medicines, setMedicines] = useState<Medicines[]>([
    {
      nomeMedicamento: '',
      quantidade: 0,
      dataPrescricao: '',
      createdNewForm: false,
    },
  ]);
  const addEntry = useCallback(() => {
    setMedicines([
      ...medicines,
      {
        nomeMedicamento: '',
        quantidade: 0,
        dataPrescricao: '',
        createdNewForm: false,
      },
    ]);
  }, [medicines]);
  const values = Form.useWatch([], antForm);

  const checkDate = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];

    const newDateValue = values[`novaDataPrescricao-${index}`];

    const newDateIsNotEmpty = newDateValue ? newDateValue[0] !== '_' : false;

    if (
      !newDateIsNotEmpty &&
      !values[`novaQuantidade-${index}`] &&
      !values[`novoNomeMedicamento-${index}`]
    ) {
      antForm.setFields([
        {
          name: `novoNomeMedicamento-${index}`,
          errors: undefined,
        },
        {
          name: `novaQuantidade-${index}`,
          errors: undefined,
        },
        {
          name: `novaDataPrescricao-${index}`,
          errors: undefined,
        },
      ]);
    }

    if (values[`novaQuantidade-${index}`] && !newDateIsNotEmpty) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (values[`novoNomeMedicamento-${index}`] && !newDateIsNotEmpty) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    if (value[0] === '_') {
      return Promise.resolve();
    }

    if (value.slice(-1) === '_') {
      return Promise.reject(new Error('Campo inválido!'));
    }

    if (
      values[`novoNomeMedicamento-${index}`] &&
      values[`novaQuantidade-${index}`]
    ) {
      if (!medicines[parseInt(index)].createdNewForm) {
        medicines[parseInt(index)].createdNewForm = true;
        addEntry();
      }
    }

    return Promise.resolve();
  };

  const checkName = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];

    const newDateValue = values[`novaDataPrescricao-${index}`];

    const newDateIsNotEmpty = newDateValue ? newDateValue[0] !== '_' : false;

    if (newDateIsNotEmpty && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (values[`novaQuantidade-${index}`] && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    return Promise.resolve();
  };

  const checkQty = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];
    const newDateValue = values[`novaDataPrescricao-${index}`];

    const newDateIsNotEmpty = newDateValue ? newDateValue[0] !== '_' : false;

    if (newDateIsNotEmpty && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (values[`novoNomeMedicamento-${index}`] && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    return Promise.resolve();
  };

  return (
    <>
      {medicines.map((_, index) => (
        <div className="row-wrapper" key={`${index}-newMedicine`}>
          <div className="cell-wrapper">
            <span className="tittle">Nome</span>
            <Form.Item
              name={`novoNomeMedicamento-${index}`}
              rules={[{ validator: checkName }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">Quantidade</span>
            <Form.Item
              name={`novaQuantidade-${index}`}
              rules={[{ validator: checkQty }]}
            >
              <NumericFormat customInput={Input} allowNegative={false} />
            </Form.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">Data da Prescrição</span>
            <Form.Item
              name={`novaDataPrescricao-${index}`}
              rules={[{ validator: checkDate }]}
            >
              <PatternFormat
                format="##/##/####"
                mask={'_'}
                placeholder=""
                isAllowed={handleIsValidDate}
                customInput={Input}
              />
            </Form.Item>
          </div>
          <div className="delete-icon-wrapper">
            <BiTrash size={32} className="invisible" />
          </div>
        </div>
      ))}
    </>
  );
}
