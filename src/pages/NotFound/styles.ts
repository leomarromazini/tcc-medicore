import styled from 'styled-components';

export const SectionNotFound = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
  background-color: var(--background);

  img {
    height: 50vh;
  }

  a {
    white-space: pre-wrap;
    font-size: 14px;
    margin-top: 10px;
  }

  @media screen and (min-width: 350px) {
    a {
      font-size: 16px;
    }
  }
`;
