import { AddHospitalizationHistory } from '../../../ts/Interfaces/AddHospitalizationHistory';
import { HospitalizationHistory } from '../../../ts/Types/HospitalizationHistory.type';

class HospitalizationHistoryMapper {
  toPersistence(addHospHistory: AddHospitalizationHistory) {
    return {
      pacienteNome: addHospHistory.pacienteNome,
      dataEntrada: HospitalizationHistoryMapper.formatDateToPersistence(
        addHospHistory.dataEntrada,
      ),
      dataSaida: HospitalizationHistoryMapper.formatDateToPersistence(
        addHospHistory.dataSaida,
        true,
      ),
      motivoInternacao: addHospHistory.motivoInternacao,
    };
  }

  toDomain(persistenceHospHistory: HospitalizationHistory) {
    return {
      id: persistenceHospHistory.id,
      dataEntradaInternacao: HospitalizationHistoryMapper.formatDateToDomain(
        persistenceHospHistory.dataEntradaInternacao,
      ),
      dataSaidaInternacao: HospitalizationHistoryMapper.formatDateToDomain(
        persistenceHospHistory.dataSaidaInternacao,
      ),
      motivoInternacao: persistenceHospHistory.motivoInternacao,
    };
  }

  private static formatDateToDomain(dateStr: string): string {
    const data = new Date(dateStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private static formatDateToPersistence(
    dateStr: string | undefined,
    isDischargeDate = false,
  ): string {
    if (!dateStr) {
      return '';
    }
    const [day, month, year] = dateStr.split('/');
    if (isDischargeDate) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} 00:30:00`;
    }
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} 00:00:00`;
  }
}

export default new HospitalizationHistoryMapper();
