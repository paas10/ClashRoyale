import React from "react";
import corona from "./../images/corona.png";

function Login() {
  return (
    <div className="body">
      <div className="parent">
        <div className="tarjetaLogin p-5">
          <div className="row">
            <div className="text-center col-12 ">
              <img src={corona} className="logoCard" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="text-center col-12">
              <h3 className="mb-1">
                <b>Iniciar Sesión</b>
              </h3>
              <span>¿No tienes cuenta? </span>
              <a href="">
                Registrate
              </a>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <span>Usuario</span>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-12">
              <input className="form-control" type="text" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <span>Contraseña</span>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-12">
              <input className="form-control" type="text" />
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
              <a className="aLogIn" href="/home"><button className="btn btn-block btnlogin">Iniciar Sesión</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
