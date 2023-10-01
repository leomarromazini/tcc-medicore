export type MedicineResponse = {
  listaPrescricao: Medicine[];
};
export type Medicine = {
  id: number;
  nomeMedicamento: string;
  quantidade: number;
  dataPrescricao: string;
  formattedDataPrescricao: string;
};
