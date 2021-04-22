import React from "react";
import corona from "./../images/corona.png";

function ResetPassword() {
  return (
    <div className="body">
      <div className="parent">
        <div className="tarjetaReset p-5">
          <div className="row">
            <div className="text-center col-12 ">
              <img src={corona} className="logoCard" alt="Corona" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="text-center col-12">
              <h3 className="mb-1">
                <b>Recuperación<br />de Contraseña</b>
              </h3>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <span>Usuario</span>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-12">
              <input className="form-control" type="text" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="btn btn-block btnlogin">Recuperar Contraseña</button>
            </div>
          </div>
          <div className="row mt-2">
            <div className="text-right col-12">
              <a href="/login">
                Iniciar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
