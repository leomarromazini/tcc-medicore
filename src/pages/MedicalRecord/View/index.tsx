import { MedicalRecord } from '../../../ts/Types/MedicalRecord.type';
import { Pacient } from '../../../ts/Types/Pacient.type';

interface Props {
  pacient: Pacient | undefined;
  medicalRecord: MedicalRecord | undefined;
}
export default function View({ pacient, medicalRecord }: Props) {
  return (
    <main>
      <h2>Informações Gerais</h2>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Nome</span>
          <span className="data">{pacient?.nome}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">E-mail</span>
          <span className="data">{pacient?.email}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">CPF</span>
          <span className="data">{pacient?.cpf}</span>
        </div>
      </div>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Data de Nascimento</span>
          <span className="data">{pacient?.dataDeNascimentoFormatted}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Endereço Completo</span>
          <span className="data">{pacient?.enderecoCompleto}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Telefone</span>
          <span className="data">{pacient?.telefone}</span>
        </div>
      </div>
      <h2>Dados Médicos</h2>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Peso</span>
          <span className="data">{medicalRecord?.peso}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Altura</span>
          <span className="data">{medicalRecord?.altura}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Sexo</span>
          <span className="data">{medicalRecord?.sexo}</span>
        </div>
      </div>
      <div className="row-wrapper">
        <div className="cell-wrapper">
          <span className="tittle">Alergias</span>
          <span className="data">{medicalRecord?.alergias}</span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Doenças Congênitas</span>
          <span className="data">
            {medicalRecord?.problemasDeSaude.doencasCongenitas.join(', ')}
          </span>
        </div>
        <div className="cell-wrapper">
          <span className="tittle">Doenças Crônicas</span>
          <span className="data">
            {medicalRecord?.problemasDeSaude.doencasCronicas.join(', ')}
          </span>
        </div>
      </div>
    </main>
  );
}
