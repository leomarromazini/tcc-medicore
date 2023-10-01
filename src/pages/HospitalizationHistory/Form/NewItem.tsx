import { Form, FormInstance, Input } from 'antd';
import { useCallback, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

import { RuleObject } from 'antd/es/form';
import { PatternFormat } from 'react-number-format';
import { handleIsValidDate } from '../../../helpers/handleIsValidDate';

interface Props {
  antForm: FormInstance<MeuObjeto>;
}
type MeuObjeto = {
  [chave: string]: string;
};

interface Rules {
  field: string;
}

type HospitalizationHistory = {
  dataEntrada: string;
  dataSaida: string;
  motivoInternacao: string;
  createdNewForm: boolean;
};

export default function NewItem({ antForm }: Props) {
  const [hospsHistory, setHospsHistory] = useState<HospitalizationHistory[]>([
    {
      motivoInternacao: '',
      dataEntrada: '',
      dataSaida: '',
      createdNewForm: false,
    },
  ]);
  const addEntry = useCallback(() => {
    setHospsHistory([
      ...hospsHistory,
      {
        motivoInternacao: '',
        dataEntrada: '',
        dataSaida: '',
        createdNewForm: false,
      },
    ]);
  }, [hospsHistory]);
  const values = Form.useWatch([], antForm);

  const checkHospReason = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];

    const newDateEntry = values[`novaDataEntrada-${index}`];
    const newDateEntryIsNotEmpty = newDateEntry ? newDateEntry[0] !== '_' : false;

    const newDischargeDate = values[`novaDataSaida-${index}`];
    const newDischargeDateIsNotEmpty = newDischargeDate
      ? newDischargeDate[0] !== '_'
      : false;

    if (values[`novoMotivoInternacao-${parseInt(index) + 1}`] && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (
      !newDateEntryIsNotEmpty &&
      !newDischargeDateIsNotEmpty &&
      !values[`novoMotivoInternacao-${index}`]
    ) {
      antForm.setFields([
        {
          name: `novoMotivoInternacao-${index}`,
          errors: undefined,
        },
        {
          name: `novaDataEntrada-${index}`,
          errors: undefined,
        },
        {
          name: `novaDataSaida-${index}`,
          errors: undefined,
        },
      ]);
    }

    if (!values[`novoMotivoInternacao-${index}`] && newDateEntryIsNotEmpty) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!values[`novoMotivoInternacao-${index}`] && newDischargeDateIsNotEmpty) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    const isValidEntryDate = newDateEntry ? newDateEntry.slice(-1) !== '_' : false;
    const isValidDischargeDate = newDischargeDate
      ? newDischargeDate.slice(-1) !== '_'
      : false;

    if (isValidEntryDate && isValidDischargeDate) {
      if (!hospsHistory[parseInt(index)].createdNewForm) {
        hospsHistory[parseInt(index)].createdNewForm = true;
        addEntry();
      }
    }

    return Promise.resolve();
  };

  const checkNewDateEntry = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];

    const newDischargeDate = values[`novaDataSaida-${index}`];

    const newDischargeDateIsNotEmpty = newDischargeDate
      ? newDischargeDate[0] !== '_'
      : false;

    if (newDischargeDateIsNotEmpty && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (values[`novoMotivoInternacao-${index}`] && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    if (value.slice(-1) === '_') {
      return Promise.reject(new Error('Campo inválido!'));
    }

    return Promise.resolve();
  };

  const checkDischargeDate = (_: RuleObject, value: string) => {
    if (!values) return Promise.reject();

    const r = _ as Rules;
    const index = r.field.split('-')[1];

    const newDateEntry = values[`novaDataSaida-${index}`];

    const newDateEntryIsNotEmpty = newDateEntry ? newDateEntry[0] !== '_' : false;

    if (newDateEntryIsNotEmpty && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (values[`novoMotivoInternacao-${index}`] && !value) {
      return Promise.reject(new Error('Campo obrigatório!'));
    }

    if (!value) {
      return Promise.resolve();
    }

    if (value.slice(-1) === '_') {
      return Promise.reject(new Error('Campo inválido!'));
    }

    return Promise.resolve();
  };

  return (
    <>
      {hospsHistory.map((_, index) => (
        <div className="row-wrapper" key={`${index}-newMedicine`}>
          <div className="cell-wrapper">
            <span className="tittle">Motivo da Internação</span>
            <Form.Item
              name={`novoMotivoInternacao-${index}`}
              rules={[{ validator: checkHospReason }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="cell-wrapper">
            <span className="tittle">Data da Internação</span>
            <Form.Item
              name={`novaDataEntrada-${index}`}
              rules={[{ validator: checkNewDateEntry }]}
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
          <div className="cell-wrapper">
            <span className="tittle">Data da Alta</span>
            <Form.Item
              name={`novaDataSaida-${index}`}
              rules={[{ validator: checkDischargeDate }]}
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
