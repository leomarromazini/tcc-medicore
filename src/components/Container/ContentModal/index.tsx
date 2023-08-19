import { useLocation } from 'react-router-dom';
import { BiArrowBack, BiPlusCircle } from 'react-icons/bi';
import CreateUserModal from './CreateUserModal';

interface ContentModalProps {
  onViewForm: () => void;
  onGoBack: () => void;
  formVisible: boolean;
}

export default function ContentModal({
  onViewForm,
  onGoBack,
  formVisible,
}: ContentModalProps) {
  const { pathname } = useLocation();

  const modalName = pathname.includes('medical-record')
    ? 'Atualizar Dados'
    : pathname.includes('medicines')
    ? 'Atualizar Medicamentos'
    : 'Atualizar Histórico de internações';

  return (
    <>
      {pathname === '/dashboard' ? (
        <section className="modal">
          <CreateUserModal />
        </section>
      ) : (
        <section className="modal">
          {formVisible ? (
            <div></div>
          ) : (
            <div className="icon-wrapper" onClick={onViewForm}>
              <BiPlusCircle />
              <span>{modalName}</span>
            </div>
          )}
          <div className="icon-wrapper" onClick={onGoBack}>
            <BiArrowBack />
            <span>Voltar</span>
          </div>
        </section>
      )}
    </>
  );
}
