import styled from 'styled-components';

import { Layout } from 'antd';

export const Container = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 100px;
  h1 {
    margin-bottom: 10px;
    font-weight: 700;
  }
  div {
    width: 400px;
  }
  .ant-input {
    height: 40px;
  }
  .password {
    height: 50px;
  }
  button {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    font-size: 19px;
  }
`;
