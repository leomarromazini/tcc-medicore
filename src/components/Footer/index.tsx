import logo from '../../assets/images/logo.svg';
import { StyledFooter } from './styles';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <section>
          <img src={logo} alt="Logo" />
          <p>
            Copyright ©2023 medicore - Todos os direitos reservados reservados ®
            {new Date().getFullYear()}.{' '}
            <a
              href="https://www.freepik.com/free-vector/new-team-members-concept-illustration_18771502.htm#&position=24&from_view=author"
              target="blank"
            >
              Imagens by storyset
            </a>
          </p>
        </section>
      </StyledFooter>
    </>
  );
};

export default Footer;
