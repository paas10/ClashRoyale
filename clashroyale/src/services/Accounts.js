import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import 'crypto-js/lib-typedarrays';

const AccountContext = createContext();

const Account = props => {

  // Función que valida si un usuario se encuentra logeado
  const getSession = async () => 
    await new Promise ((resolve, reject) => {
      const user = Pool.getCurrentUser();      
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err)
          } else {
            resolve(session)
          }
        })
      } else {
        reject()
      }
    });

  // Función que realiza el proceso de Login directamente con Cognito
  const authenticate = async (Username, Password) => 
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: function(session) {
          // console.log('SESSION ', session);
          resolve(session);
        },

        onFailure: function(err) {
          // console.log('ERROR', err)
          reject(err)
        }
      });
    });

  return(
    <AccountContext.Provider value={{ authenticate, getSession }}>
      {props.children}
    </AccountContext.Provider>
  )
};

export { Account, AccountContext }