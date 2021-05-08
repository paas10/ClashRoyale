import { useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";

const SessionStatus = () => {
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        console.log('Sesión Activa', session)
      })
      .catch(() => {
        console.warn('Inicia Sesión para continuar')
      })
  });

  return ('');
};

export { SessionStatus };