import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { AccountContext } from '../services/Accounts';
import corona from "./../images/corona.png";
import 'crypto-js/lib-typedarrays';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var emailError, passwordError;

  const { authenticate, getSession } = useContext(AccountContext);
  const history = useHistory();

  // Validation of session state for autologin
  useEffect(() => {
    getSession().then((session) => {
      console.log('Sesión Activa', session)
      history.push("/home");
    }).catch(() => {})
  });
  
  // Sents the request to login to Amazon Cognito
  const onSubmit = event => {
    event.preventDefault();
    if (!validateErrors(email, password)) return;

    authenticate(email, password)
      .then((data) => {
        console.log('Logged In', data)
        history.push("/home");
      })
      .catch((err) => {
        console.error('ERROR', err)
        var loginError = document.getElementById('loginError');
        if (err.message === "Incorrect username or password.") {
          loginError.innerHTML = 'Usuario o contraseña incorrecta.';
          loginError.hidden = false;
          resetForm();
        } else {
          loginError.innerHTML = err.message;
          loginError.hidden = false;
        }
      })
  }

  function validateErrors() {
    var error = false;
    emailError = document.getElementById('emailError');
    passwordError = document.getElementById('passwordError');
    emailError.hidden = true;
    passwordError.hidden = true;
  
    if (email === '') {
      emailError.innerHTML = 'El correo electrónico es obligatorio.'
      emailError.hidden = false;
      error = true;
    }
  
    if (password === '') {
      passwordError.innerHTML = 'La contraseña es obligatoria.'
      passwordError.hidden = false;
      error = true;
    }
  
    if (error) {
      document.getElementById('btnlogin').style.marginTop = "20px";
      return false;
    }
  
    return true;
  }

  function resetForm() {
    setEmail('')
    setPassword('')
  }

  return (
    <div className="body">
      <div className="parent">
        <div className="tarjetaLogin p-5">
          <div className="row">
            <div className="text-center col-12 ">
              <img src={corona} className="logoCard" alt="Corona" />
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="row mt-2">
              <div className="text-center col-12">
                <h3 className="mb-1">
                  <b>Iniciar Sesión</b>
                </h3>
                <span>¿No tienes cuenta? </span>
                <a href="/signup">
                  Registrate
                </a>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <span>Correo Electrónico</span>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-12">
                <input className="form-control" type="text" value={email} onChange={(event) => {setEmail(event.target.value); document.getElementById('emailError').hidden = true; document.getElementById('loginError').hidden = true;}} />
                <span className="error" id="emailError" hidden></span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <span>Contraseña</span>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-12">
                <input className="form-control" type="password" value={password} onChange={ (event) => {setPassword(event.target.value); document.getElementById('passwordError').hidden = true; document.getElementById('loginError').hidden = true}} />
                <span className="error" id="passwordError" hidden></span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="text-right col-12">
                <a href="/reset">
                  ¿Olvidó la contraseña?
                </a>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <button type='submit' className="btn btn-block btnlogin" id="btnlogin" style={({ marginTop: '40px' })} >Iniciar Sesión</button>
                <span className="error" id="loginError" hidden></span>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default LogIn;
