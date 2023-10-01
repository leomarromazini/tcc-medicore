export interface AddMedicines {
  nome: string;
  prescricoes: NewMedicine[];
}
export interface NewMedicine {
  nomeMedicamento: string;
  quantidade: number;
  dataPrescricao: string;
}
