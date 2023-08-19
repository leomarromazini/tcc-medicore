import { Routes, Route } from 'react-router-dom';

//import RequireAuth from './RequireAuth';

import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import RoutesLayout from '../pages/Layout';
import MedicalRecord from '../pages/MedicalRecord';
import HospitalizationHistory from '../pages/HospitalizationHistory';
import Medicines from '../pages/Medicines';
import RequireAuth from './RequireAuth';

const PagesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoutesLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<RequireAuth allowedRoles={['[ROLE_MEDICO]']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicines/:userName" element={<Medicines />} />
          <Route path="/medical-record/:userName" element={<MedicalRecord />} />
          <Route
            path="/hospitalization-history/:userName"
            element={<HospitalizationHistory />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
export default PagesRoutes;
