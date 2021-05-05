import React, { useState } from "react";
import corona from "./../images/corona.png";
import UserPool from '../UserPool';
import { useHistory } from "react-router-dom";
import { store } from 'react-notifications-component';
import 'crypto-js/lib-typedarrays';

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var emailError, passwordError, loginError;
  
  const onSubmit = event => {
    event.preventDefault();

    if (!validateErrors(email, password)) return;

    UserPool.signUp(email, password, [], null, (res, data) => {
      if (data) {
        console.log('DATA ', data)

        store.addNotification({
          message: "Registro Exitoso! Confirma tu dirección de correo electrónico para continuar.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true,
            onScreen: true
          }
        });

        history.push("/login");
      }

      if (res.code && res.code.includes('Exception')){
        console.log('res ', res)
        manageErrors(res.message)
      } 
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

  function hideErrors(param) {
    document.getElementById('loginError').hidden = true

    if(param === 'pass')
      document.getElementById('passwordError').hidden = true
    if(param === 'email')
      document.getElementById('emailError').hidden = true
  }

  function manageErrors(message) {
    loginError = document.getElementById('loginError');
    emailError = document.getElementById('emailError');
    passwordError = document.getElementById('passwordError');
    loginError.hidden = true;
    emailError.hidden = true;
    passwordError.hidden = true;

    if(message === "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6" || message === "Password did not conform with policy: Password not long enough") {
      passwordError.innerHTML = "La contraseña debe tener al menos 8 caracteres."
      passwordError.hidden = false;
    } else if(message === "Password did not conform with policy: Password must have numeric characters") {
      passwordError.innerHTML = "La contraseña debe contener números."
      passwordError.hidden = false;
    } else if(message === "Password did not conform with policy: Password must have uppercase characters") {
      passwordError.innerHTML = "La contraseña debe contener letras mayúsculas."
      passwordError.hidden = false;
    } else if(message === "Password did not conform with policy: Password must have lowercase characters") {
      passwordError.innerHTML = "La contraseña debe contener letras minúsculas."
      passwordError.hidden = false;
    } else if(message === "Password did not conform with policy: Password must have symbol characters") {
      passwordError.innerHTML = "La contraseña debe contener símbolos."
      passwordError.hidden = false;
    } else if (message === "Username should be an email.") {
      emailError.innerHTML = "El correo electrónico no es válido."
      emailError.hidden = false;
    } else if (message === "An account with the given email already exists.") {
      emailError.innerHTML = "El correo electrónico ingresado no se encuentra disponible."
      emailError.hidden = false;
    } else {
      loginError.innerHTML = message
      loginError.hidden = false;
    }
    
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
                <input className="form-control" type="text" value={email} onChange={(event) => {setEmail(event.target.value); hideErrors('email')}} />
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
                <input className="form-control" type="password" value={password} onChange={ (event) => {setPassword(event.target.value); hideErrors('pass')}} />
                <span className="error" id="passwordError" hidden></span>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <button type='submit' className="btn btn-block btnlogin" id="btnlogin" style={({ marginTop: '40px' })} >Crear Cuenta</button>
                <span className="error" id="loginError" hidden style={( { marginTop: '5px' } )}></span>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default SignUp;