export interface AddPacientForm {
  cpf: number;
  endereco: string;
  telefone: number;
  celular: number;
  dataDeNascimento: string;
  password: string;
  repassword?: string;
}
