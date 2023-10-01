import { Medicine } from '../../../ts/Types/Medicine.type';

interface Props {
  medicines: Medicine[];
}

export default function View({ medicines }: Props) {
  return (
    <main>
      <h2>Medicamentos</h2>
      {medicines.map((medicines) => {
        return (
          <div className="row-wrapper" key={medicines.id}>
            <div className="cell-wrapper">
              <span className="tittle">Nome</span>
              <span className="data">{medicines.nomeMedicamento}</span>
            </div>
            <div className="cell-wrapper">
              <span className="tittle">Quantidade</span>
              <span className="data">{medicines.quantidade}</span>
            </div>
            <div className="cell-wrapper">
              <span className="tittle">Data</span>
              <span className="data">{medicines.formattedDataPrescricao}</span>
            </div>
          </div>
        );
      })}
    </main>
  );
}
