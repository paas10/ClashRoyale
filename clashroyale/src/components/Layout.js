import { React, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../services/Accounts';
import SuperCell from "./../images/supercell_logo.png";
import ClashRoyale from "./../images/ClashRoyaleLogo.png";
import { GrPowerShutdown } from 'react-icons/gr';

const Layout = (props) => {
  const { getSession, logout } = useContext(AccountContext);
  const history = useHistory();

  useEffect(() => {
    getSession().catch(() => {
      logout();
      history.push("/login");
      console.warn('Inicia Sesión para continuar')
    })
  }, [getSession, history, logout]);
  
  function exit() {
    logout()
    history.push("/login");
  }

  return (
    <div>
      <div className="header">
        <div className="row rowHeader m-0">
          <div className="text-left col-2">
            <img src={SuperCell} className="SuperCellImg ml-2" alt="Description" />
          </div>
          <div className="text-center col-8">
            <img src={ClashRoyale} className="ClashRoyaleImg" alt="Description" />
          </div>
          <div className="text-right col-2">
            <div className="btnLogout">
              <a href="/#" onClick={exit}>
                <GrPowerShutdown />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="cuerpo">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;