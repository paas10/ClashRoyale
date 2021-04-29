import { React, Component } from "react";
import SweetAlert from 'sweetalert-react';
import Layout from "./Layout";
import { IoMdAdd } from "react-icons/io";
import { BiPencil, BiTrash } from "react-icons/bi";
import { store } from 'react-notifications-component';
import { environment } from './../environments/environment'

const header = ["Imagen", "Nombre", "Calidad", "Tipo de Carta", "Vida", "Daño", "Velocidad" ,"Acciones"];
class Home extends Component {

  constructor(props) {
    super(props);

    // No se muestra el modal de eliminar
    this.state = {
      cards: [],
      show: false
    };
  }

  componentDidMount() {
    fetch(environment.urlCards, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(data => this.setState({ cards: data }));
  }

  deleteCard(id) {
    // console.log('Carta a eliminar ', id)

    var index = 0;
    for (var i = 0; i < this.state.cards.length; i++) {
      if(parseInt(this.state.cards[i].id) === id){
        index = i;
      }
    }

    try {
      this.state.cards.splice(index, 1);
      localStorage.setItem("cards", JSON.stringify(this.state.cards));

      store.addNotification({
        message: "La carta se ha eliminado correctamente",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
          onScreen: true
        }
      });

      this.setState({ show: false })
    } catch (e){
      console.log('Murio ', e)
      store.addNotification({
        title: "Error",
        message: "Ha ocurrido un error intesperado, intenta de nuevo más tarde",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
          onScreen: true
        }
      });

      this.setState({ show: false })
    }
  }

  buildTableHeader() {
    return header.map(item => <th className="text-center" scope="col" key={item}>{ item }</th>)
  }

  buildTableBody() {
    if(this.state.cards) {
      return this.state.cards.map(item => 
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
            <button type="button" className="btn btn-outline-dark mr-1 mt-1" onClick={() => {window.location.href="/update/" + item.id }} >
              <BiPencil className="mb-1"/>
            </button>
            <button type="button" className="btn btn-outline-danger mr-1 mt-1" onClick={() => this.setState({ show: true, id: item.id })} >
              <BiTrash className="mb-1"/>
            </button>
            <SweetAlert
              id={item.id}
              show={this.state.show}
              type="warning"
              title="¿Estás seguro de eliminar la carta?"
              text="Esta operación es irreversible"
              showCancelButton
              onConfirm={() => {
                this.deleteCard(this.state.id);
                this.setState({ show: false });
              }}
              onCancel={() => {
                this.setState({ show: false });
              }}
              onEscapeKey={() => this.setState({ show: false })}
              onOutsideClick={() => this.setState({ show: false })}
            />
          </td>
        </tr>
      );
    }
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

            <div className="table-responsive">
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
        </div>
      </Layout>
    );
  }
}

export default Home;
