export const validatorInputMasked = (_: unknown, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Campo Obrigatório!'));
  }

  if (value.slice(-1) === '_') {
    return Promise.reject(new Error('Campo inválido!'));
  }

  return Promise.resolve();
};
