import { ReactNode } from 'react';

import { PacientsProvider } from './Pacients';
import { DoctorsProvider } from './Doctors';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <DoctorsProvider>
        <PacientsProvider>{children}</PacientsProvider>
      </DoctorsProvider>
    </>
  );
};

export default Providers;
