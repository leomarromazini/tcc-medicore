import styled from 'styled-components';

export const Container = styled.div`
  .ant-modal-footer {
    background-color: pink;
  }
  footer {
    background-color: white;
    width: 113%;
    min-width: 466px;
    position: relative;
    right: 29.7px;
    height: 80px;
    top: 40px;
    div {
      display: flex;
      justify-content: flex-end;
    }
    button + button {
      margin-left: 15px;
      margin-right: 30px;
    }
  }
`;
