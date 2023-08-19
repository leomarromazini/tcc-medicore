import { useContext } from 'react';
import { PacientContext } from '.';

export const usePacients = () => useContext(PacientContext);
