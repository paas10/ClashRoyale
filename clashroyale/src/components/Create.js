import { React, Component } from "react";
import ReactDOM from 'react-dom';
import Layout from "./Layout";
import { BiArrowBack } from "react-icons/bi";


var rutaImagen = "";
class Create extends Component {

  buildImage(event) {
    if(document.getElementById("rutaImg").value) {
      document.getElementById("placeImg").style.display = "initial";
      rutaImagen = document.getElementById("rutaImg").value;
      ReactDOM.render(<img className="imgIndex" src={rutaImagen} alt="La ruta de la imagen es inválida" />, document.getElementById("placeImg"))
    } else {
      document.getElementById("placeImg").style.display = "none";
    }
  }

  render() {
    return (
      <Layout>
        {/* ENCABEZADO DE LA VISTA */}
        <div className="row">
          <div className="col-10">
            <span className="rutas">CARTAS / NUEVA CARTA</span>
            <h3 className="mb-0">
              <b>NUEVA CARTA</b>
            </h3>
            <span>Crea una carta</span>
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
              <div className="col-12 text-center" id="placeImg">
              </div>
            </div>

            {/* Nombre */}
            <div className="row justify-content-center mt-4">
              <div className="col-2 col-form-label">
                <span>Nombre</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="text" />
              </div>
            </div>

            {/* Ruta Imagen */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Imagen (Ruta)</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="text" id="rutaImg" onChange={this.buildImage} />
              </div>
            </div>

            {/* Calidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Calidad</span>
              </div>
              <div className="col-6">
                <select className="selectpicker form-control" type="text" name="quality">
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
              <select className="selectpicker form-control" type="text" name="quality">
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
                <input className="form-control" type="number" step="1" min="0" />
              </div>
            </div>

            {/* Daño */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Daño</span>
              </div>
              <div className="col-6">
                <input className="form-control" type="number" step="1" min="0" />
              </div>
            </div>

            {/* Velocidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-2 col-form-label">
                <span>Velocidad</span>
              </div>
              <div className="col-6">
                <select className="selectpicker form-control" type="text" name="velocity">
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
                <span className="">CREAR</span>
              </button>
            </div>

          </div>
        </div>
      </Layout>
    );
  }
}
  
  export default Create;
  