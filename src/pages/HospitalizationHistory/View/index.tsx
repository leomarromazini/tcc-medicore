import { HospitalizationHistory } from '../../../ts/Types/HospitalizationHistory.type';

interface Props {
  hospitalizationsHistory: HospitalizationHistory[];
}

export default function View({ hospitalizationsHistory }: Props) {
  return (
    <main>
      <h2>Histórico de Internações</h2>
      {hospitalizationsHistory.map((hospHistory) => {
        return (
          <div className="row-wrapper" key={hospHistory.id}>
            <div className="cell-wrapper">
              <span className="tittle">Motivo da Internação</span>
              <span className="data">{hospHistory.motivoInternacao}</span>
            </div>
            <div className="cell-wrapper">
              <span className="tittle">Data da Internação</span>
              <span className="data">{hospHistory.dataEntradaInternacao}</span>
            </div>
            <div className="cell-wrapper">
              <span className="tittle">Data da Alta</span>
              <span className="data">{hospHistory.dataSaidaInternacao}</span>
            </div>
          </div>
        );
      })}
    </main>
  );
}
