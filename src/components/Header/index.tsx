import { NavLink, useLocation } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';
import { BiUser } from 'react-icons/bi';
import { useDoctors } from '../../providers/Doctors/useDoctors';

const Header = () => {
  const location = useLocation();
  const { doctorToken, logout } = useDoctors();
  return (
    <>
      <Container>
        <div>
          <img className="logo" src={logo} alt="Logo" />
          <NavLink
            to="#"
            style={{ display: 'flex' }}
            title="Painel de controle"
            className={(navData) => (navData.isActive ? 'active' : '')}
          >
            <li>Sobre nós</li>
          </NavLink>
          <NavLink to="#">
            <li>Fale conosco</li>
          </NavLink>
        </div>
        <div>
          {location.pathname === '/' ? (
            <NavLink
              to="/login"
              style={{ display: 'flex' }}
              title="Painel de controle"
              className={(navData) => (navData.isActive ? 'active' : '')}
            >
              <div>
                <BiUser />
                <li>Entrar</li>
              </div>
            </NavLink>
          ) : doctorToken ? (
            <NavLink to="/" style={{ display: 'flex' }} onClick={logout}>
              <li>Sair</li>
            </NavLink>
          ) : (
            <NavLink
              to="/"
              style={{ display: 'flex' }}
              title="Painel de controle"
              className={(navData) => (navData.isActive ? 'active' : '')}
            >
              <li>Voltar</li>
            </NavLink>
          )}
        </div>
      </Container>
    </>
  );
};

export default Header;
