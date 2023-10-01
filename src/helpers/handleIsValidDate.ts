import { DateTime } from 'luxon';

export const handleIsValidDate = (values: {
  formattedValue: string;
  value: string;
}) => {
  const d = values.value;
  const fD = values.formattedValue;
  if (d.length >= 1) {
    if (d[0] > '3') {
      return false;
    }
  }

  if (d.length >= 2) {
    if (!DateTime.fromFormat(`${d[0]}${d[1]}-12-2024`, 'dd-MM-yyyy').isValid) {
      return false;
    }
  }
  if (d.length >= 3) {
    if (d[2] > '1') {
      return false;
    }
  }
  if (d.length >= 4) {
    if (
      !DateTime.fromFormat(`${d[0]}${d[1]}-${d[2]}${d[3]}-2024`, 'dd-MM-yyyy')
        .isValid
    ) {
      return false;
    }
  }
  if (d.length >= 5) {
    if (d[4] > '2' || d[4] === '0') {
      return false;
    }
  }
  if (d.length === 6) {
    const isFutureDate =
      DateTime.fromFormat(fD.slice(0, 8) + '00', 'dd/MM/yyyy') >
      DateTime.now().setLocale('pt-BR')
        ? true
        : false;

    return isFutureDate ? false : true;
  }

  if (d.length === 7) {
    const isFutureDate =
      DateTime.fromFormat(fD.slice(0, 9) + '0', 'dd/MM/yyyy') >
      DateTime.now().setLocale('pt-BR')
        ? true
        : false;

    return isFutureDate ? false : true;
  }

  if (d.length === 8) {
    const isFutureDate =
      DateTime.fromFormat(fD.slice(0, 10), 'dd/MM/yyyy') >
      DateTime.now().setLocale('pt-BR')
        ? true
        : false;

    return isFutureDate ? false : true;
  }

  return true;
};
