import styled from 'styled-components';

export const Container = styled.header`
  background-color: var(--header);
  display: flex;
  height: 45px;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 100px;
    margin-left: 1.5%;
    margin-right: 25px;
    display: block;
  }

  a {
    text-decoration: none;
    &:hover {
      filter: opacity(1);
    }
  }

  li {
    white-space: nowrap;
    color: var(--text-color);
    font-size: 12px;
    cursor: pointer;
    list-style: none;
    margin-right: 10px;
    margin-left: 10px;
    padding: 5px 0;
  }

  svg {
    width: 20px;
    height: 20px;
    position: relative;
    bottom: 2px;
    left: 2px;
  }

  .logout {
    margin-left: auto;
    margin-right: 1%;
  }

  li:active {
    color: var(--full-white);
    transition: 0ms;
  }

  li:hover,
  svg:hover {
    filter: opacity(0.8);
    color: var(--black);
    transition: 0.4s;
  }

  .active {
    li {
      border-bottom: 1px solid var(--full-white);
    }

    li:hover {
      border-bottom: 1px solid var(--black);
      filter: opacity(0.8);
    }
  }

  @media screen and (min-width: 650px) {
    li {
      font-size: 18px;
    }

    .logo {
      width: 120px;
    }
  }
`;
