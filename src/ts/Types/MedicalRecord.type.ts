export type MedicalRecord = {
  nome: string;
  dataDeNascimento: string;
  sexo: string;
  peso: number;
  altura: number;
  problemasDeSaude: {
    doencasCronicas: string[];
    doencasCongenitas: string[];
  };
  alergias: string;
};
