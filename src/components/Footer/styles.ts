import styled from 'styled-components';
import { Layout } from 'antd';
const { Footer } = Layout;

export const StyledFooter = styled(Footer)`
  background: var(--footer);
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: justify;

    img {
      max-width: 130px;
    }

    p {
      font-size: 13px;
      font-weight: 500;
    }

    a {
      color: var(--black);
      font-weight: 400;
      font-size: 11px;
      &:hover {
        filter: opacity(1);
      }
    }

    @media screen and (min-width: 600px) {
      flex-direction: row;
      img {
        max-width: 100px;
      }
    }
    @media screen and (min-width: 1260px) {
      img {
        max-width: 80px;
      }
    }
  }
`;
