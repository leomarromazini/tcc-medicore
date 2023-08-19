import { Link } from 'react-router-dom';

import { SectionNotFound } from './styles';

import error404 from '../../assets/images/illustrations/error-404.svg';

const NotFound = () => {
  return (
    <div>
      <SectionNotFound>
        <img alt="not found" src={error404} />
        <Link to="/dashboard" title="Voltar à navegação">
          Clique aqui para voltar à navegação
        </Link>
      </SectionNotFound>
    </div>
  );
};

export default NotFound;
