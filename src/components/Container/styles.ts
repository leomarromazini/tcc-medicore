import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledContainer = styled(Layout.Content)`
  width: 97%;
  margin: 0 auto;
  padding: 20px 0;
  h1 {
    font-weight: 700;
  }
`;

export const PageContent = styled.div`
  background-color: var(--full-white);
  box-shadow: var(--elevation);
  padding: 20px 25px;
  display: flex;
  flex-direction: column;

  .modal,
  header {
    display: flex;
    align-items: center;
  }
  .modal {
    margin: 16px 0;
    justify-content: space-between;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;

    svg {
      width: 25px;
      height: 25px;
      position: relative;
      bottom: 2px;
      left: 2px;
      color: var(--text-color);
      margin-right: 5px;
    }

    span {
      font-weight: 600;
      color: var(--text-color);
    }

    &:hover {
      svg,
      span {
        color: var(--hover);
      }
    }
  }
  .active {
    svg,
    span {
      color: var(--hover);
    }
  }

  main {
    h2 {
      font-weight: 600;
    }

    .row-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    .cell-wrapper {
      display: flex;
      flex-direction: column;
      width: 20%;
      flex-grow: 0.26;
      //      flex-basis: 450px;
      .tittle {
        font-weight: 600;
      }
      .data {
        border-bottom: 1px solid #3dd5f0;
      }

      span + span {
        margin: 13px 0;
      }
    }
    .delete-icon-wrapper {
      svg {
        color: #e00312;
        cursor: pointer;
      }

      .invisible {
        cursor: default;
        opacity: 0;
      }
    }
    .buttons-wrapper {
      display: flex;
      justify-content: flex-end;

      margin-right: 10px;
      span {
        font-weight: 600;
      }
    }
    button + button {
      margin-left: 15px;
    }
  }

  img {
    align-self: flex-end;
    width: 20%;
    max-height: 240px;
    margin-top: 20px;
  }
`;
