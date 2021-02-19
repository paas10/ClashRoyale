import { React, Component } from "react";
import ReactDOM from 'react-dom';
import Layout from "./Layout";
import { BiArrowBack } from "react-icons/bi";


var rutaImagen = "https://i.pinimg.com/originals/fc/0c/42/fc0c42ee756186e4c700f2df7f9cb4da.png";
class Create extends Component {

  buildImage(event) {
    if(document.getElementById("rutaImg").value) {
      document.getElementById("placeImgUpdate").style.display = "initial";
      rutaImagen = document.getElementById("rutaImg").value;
      ReactDOM.render(<img className="imgIndex" src={rutaImagen} alt="La ruta de la imagen es inválida" />, document.getElementById("placeImgUpdate"))
    } else {
      document.getElementById("placeImgUpdate").style.display = "none";
    }
  }

  render() {
    return (
      <Layout>
        {/* ENCABEZADO DE LA VISTA */}
        <div className="row">
          <div className="col-10">
            <span className="rutas">CARTAS / EDITAR CARTA</span>
            <h3 className="mb-0">
              <b>EDITAR CARTA</b>
            </h3>
            <span>Actualiza las características de una carta existente</span>
          </div>
          <div className="text-right col-2">
            <button type="button" className="btn btn-outline-dark mt-3 mr-2 btnRegresar" onClick={() => {window.location.href="/home"}}>
              <BiArrowBack className="icoAdd" />
              <span className="btnColor">Regresar</span>
            </button>
          </div>
        </div>
        
        {/* CUERPO DE LA TABLA */}
        <div className="row bodyTable">
          <div className="col-12">
            {/* Preview de la imagen */}
            <div className="row">
              <div className="col-12 text-center" id="placeImgUpdate">
                <img className="imgIndex" src={rutaImagen} alt="La ruta de la imagen es inválida" />
              </div>
            </div>

            {/* Nombre */}
            <div className="row justify-content-center mt-4">
              <div className="col-2 col-form-label">
                <span>Nombre</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="text" defaultValue="El Príncipe" />
              </div>
            </div>

            {/* Ruta Imagen */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Imagen (Ruta)</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="text" id="rutaImg" onChange={this.buildImage}  defaultValue="https://i.pinimg.com/originals/fc/0c/42/fc0c42ee756186e4c700f2df7f9cb4da.png"/>
              </div>
            </div>

            {/* Calidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Calidad</span>
              </div>
              <div className="col-6">
                <select className="selectpicker form-control" type="text" name="quality" defaultValue="3">
                  <option value="1">Común</option>
                  <option value="2">Especial</option>
                  <option value="3">Épica</option>
                  <option value="3">Legendaria</option>
                </select>
              </div>
            </div>

            {/* Tipo de Carta */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Tipo de Carta</span>
              </div>
              <div className="col-6">
              <select className="selectpicker form-control" type="text" name="quality" defaultValue="1">
                  <option value="1">Tropa</option>
                  <option value="2">Hechizo</option>
                  <option value="3">Estructura</option>
                </select>
              </div>
            </div>

            {/* Vida */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Vida</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="number" step="1" min="0" defaultValue="2422" />
              </div>
            </div>

            {/* Daño */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Daño</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="number" step="1" min="0" defaultValue="472" />
              </div>
            </div>

            {/* Velocidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Velocidad</span>
              </div>
              <div className="col-6">
                <select className="selectpicker form-control" type="text" name="velocity" defaultValue="2" >
                  <option value="-1"></option>
                  <option value="1">Baja</option>
                  <option value="2">Media</option>
                  <option value="3">Alta</option>
                  <option value="3">Mul Alta</option>
                </select>
              </div>
            </div>

            <div className="row justify-content-center mt-4">
              <button type="button" className="btn btn-outline-primary" onClick={() => {window.location.href="/home"}}>
                <span className="">ACTUALIZAR</span>
              </button>
            </div>

          </div>
        </div>
      </Layout>
    );
  }
}
  
  export default Create;
  