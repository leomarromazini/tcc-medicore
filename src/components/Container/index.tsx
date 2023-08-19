import ContentHeader from './ContentHeader';
import ContentModal from './ContentModal';
import { PageContent, StyledContainer } from './styles';
import { useNavigate } from 'react-router-dom';

interface Props {
  tittle: string;
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function Container({
  tittle,
  formVisible,
  setFormVisible,
  children,
}: Props) {
  //const [formVisible, setFormVisible] = useState(false);

  const navigate = useNavigate();

  const handleViewForm = () => {
    if (setFormVisible) {
      setFormVisible((prevState: boolean) => !prevState);
    }
  };
  const handleGoBack = () => {
    if (setFormVisible) {
      if (formVisible) {
        setFormVisible((prevState) => !prevState);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <StyledContainer>
      <h1>{tittle}</h1>

      <PageContent>
        <ContentHeader />
        <ContentModal
          formVisible={formVisible}
          onViewForm={handleViewForm}
          onGoBack={handleGoBack}
        />
        {children}
      </PageContent>
    </StyledContainer>
  );
}
