import styled from 'styled-components';

import { Layout } from 'antd';

export const Container = styled(Layout.Content)`
  display: flex;
  justify-content: space-between;

  div {
    width: 500px;
    text-align: center;
    margin: 5% 6%;
  }
  h1 {
    font-size: 38px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 26px;
  }

  img {
    width: 50%;
    align-self: flex-end;
  }
`;
