import { useContext } from 'react';
import { DoctorContext } from '.';

export const useDoctors = () => useContext(DoctorContext);
