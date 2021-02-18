import { React, Component } from "react";
import Layout from "./Layout";
import { BiArrowBack } from "react-icons/bi";


class Create extends Component {

    buildImage(imgSrc) {
      if (imgSrc){
        return <img className="imgIndex" src={imgSrc} alt="new" />
      } else {
        return;
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
            </div>
          </div>
        </Layout>
      );
    }
  }
  
  export default Create;
  