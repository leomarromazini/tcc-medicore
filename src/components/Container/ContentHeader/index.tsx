import { NavLink, useLocation, useParams } from 'react-router-dom';

import {
  MdOutlineAssignment,
  MdOutlineMedication,
  MdOutlineMedicalServices,
} from 'react-icons/md';
import { BiTable } from 'react-icons/bi';

export default function ContentHeader() {
  const { userName } = useParams();
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/dashboard' ? (
        <header>
          <div className="icon-wrapper">
            <BiTable />
            <span>Visão Geral</span>
          </div>
        </header>
      ) : (
        <header>
          <NavLink
            to={`/medical-record/${userName || ''}`}
            className={(navData) =>
              navData.isActive ? 'icon-wrapper active' : 'icon-wrapper'
            }
          >
            <MdOutlineAssignment />
            <span>Ficha Médica</span>
          </NavLink>
          <NavLink
            to={`/medicines/${userName || ''}`}
            className={(navData) =>
              navData.isActive ? 'icon-wrapper active' : 'icon-wrapper'
            }
          >
            <MdOutlineMedication />
            <span>Medicamentos</span>
          </NavLink>
          <NavLink
            to={`/hospitalization-history/${userName || ''}`}
            className={(navData) =>
              navData.isActive ? 'icon-wrapper active' : 'icon-wrapper'
            }
          >
            <MdOutlineMedicalServices />
            <span>Histórico de Internações</span>
          </NavLink>
        </header>
      )}
    </>
  );
}
