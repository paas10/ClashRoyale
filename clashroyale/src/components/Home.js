import { React, Component } from "react";
import Layout from "./Layout";
import "./styles/Home.css";
import { IoMdAdd } from "react-icons/io";
import { BiPencil, BiTrash } from "react-icons/bi";

const header = ["Imagen", "Nombre", "Calidad", "Tipo de Carta", "Vida", "Daño", "Velocidad" ,"Acciones"];
var cards = [];

class Home extends Component {

  constructor() {
    super();
    cards = JSON.parse(localStorage.getItem("cards"));
  }

  buildTableHeader() {
    return header.map(item => <th className="text-center" scope="col" key={item}>{ item }</th>)
  }

  buildTableBody() {
    return cards.map(item => 
    <tr className="text-center" key={item.id}>
      <td className="p-1">
        <div className="foto">
          { this.buildImage(item.img) }
        </div>
      </td>
      <td className="tableRow">{ item.nombre }</td>
      <td className="tableRow">{ item.calidad }</td>
      <td className="tableRow">{ item.tipoCarta }</td>
      <td className="tableRow">{ item.vida }</td>
      <td className="tableRow">{ item.danio }</td>
      <td className="tableRow">{ item.velocidad }</td>
      <td>
        <button type="button" className="btn btn-outline-dark mr-1 mt-1">
          <BiPencil className="mb-1"/>
        </button>
        <button type="button" className="btn btn-outline-danger mr-1 mt-1">
          <BiTrash className="mb-1"/>
        </button>
      </td>
    </tr>
    );
  }

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
            <span className="rutas">CARTAS</span>
            <h3 className="mb-0">
              <b>CARTAS</b>
            </h3>
            <span>Cartas disponibles en la plataforma</span>
          </div>
          <div className="text-right col-2">
            <button type="button" className="btn btn-outline-success mt-3 mr-2" onClick={() => {window.location.href="/create"}}>
              <IoMdAdd className="icoAdd" />
              <span className="btnColor">Nuevo</span>
            </button>
          </div>
        </div>
        
        {/* CUERPO DE LA TABLA */}
        <div className="row bodyTable">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  { this.buildTableHeader() }
                </tr>
              </thead>
              <tbody>
                { this.buildTableBody() }
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
