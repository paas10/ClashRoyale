import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import 'crypto-js/lib-typedarrays';

const AccountContext = createContext();

const Account = props => {
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
    <AccountContext.Provider value={{authenticate}}>
      {props.children}
    </AccountContext.Provider>
  )
};

export { Account, AccountContext }