import React, { useState } from "react";
import corona from "./../images/corona.png";
import UserPool from '../UserPool';
import 'crypto-js/lib-typedarrays';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var emailError, passwordError;
  
  const onSubmit = event => {
    event.preventDefault();

    if (!validateErrors(email, password)) return;

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) console.error(err);
      console.log(data)
    });
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
                  <b>Crear Cuenta</b>
                </h3>
                <span>¿Ya tienes cuenta? </span>
                <a href="/#">
                  Inicia Sesión
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
                <input className="form-control" type="text" value={email} onChange={(event) => {setEmail(event.target.value); document.getElementById('emailError').hidden = true}} />
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
                <input className="form-control" type="password" value={password} onChange={ (event) => {setPassword(event.target.value); document.getElementById('passwordError').hidden = true}} />
                <span className="error" id="passwordError" hidden></span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <button type='submit' className="btn btn-block btnlogin" id="btnlogin" style={({ marginTop: '40px' })} >Crear Cuenta</button>
                <span className="error" id="loginError" hidden></span>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );

}
