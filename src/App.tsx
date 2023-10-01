import Routes from './routes';
import { App as AntApp } from 'antd';
import { GlobalStyles } from './styles/global';

function App() {
  return (
    <AntApp>
      <Routes />
      <GlobalStyles />
    </AntApp>
  );
}

export default App;
