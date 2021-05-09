import { React, Component } from "react";
import SweetAlert from 'sweetalert-react';
import Layout from "./Layout";
import { IoMdAdd } from "react-icons/io";
import { BiPencil, BiTrash } from "react-icons/bi";
import { store } from 'react-notifications-component';
import { environment } from './../environments/environment'

import DataTable from 'react-data-table-component';

const header = [
  {
    name: 'Imagen',
    selector: 'imagen',
    sortable: false,
    center: true
  },{
    name: 'Nombre',
    selector: 'nombre',
    sortable: true,
    center: true
  },{
    name: 'Calidad',
    selector: 'calidad',
    sortable: true,
    center: true
  },{
    name: 'Tipo de Carta',
    selector: 'tipodecarta',
    sortable: true,
    center: true
  },{
    name: 'Vida',
    selector: 'vida',
    sortable: true,
    center: true
  },{
    name: 'Daño',
    selector: 'daño',
    sortable: true,
    center: true
  },{
    name: 'Velocidad',
    selector: 'velocidad',
    sortable: true,
    center: true
  },{
    name: 'Acciones',
    selector: 'acciones',
    sortable: true,
    center: true
  }
];
class Home extends Component {

  constructor(props) {
    super(props);

    // No se muestra el modal de eliminar
    this.state = {
      cards: [],
      show: false,
      reload: true
    };
  }

  componentDidMount() {
    fetch(environment.urlCards, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(data => {
        var cartas = data.map(row => {
          return {
            id: row._id,
            imagen: this.buildImage(row.img),
            nombre: row.nombre,
            calidad: row.calidad,
            tipodecarta: row.tipoCarta,
            vida: row.vida,
            daño: row.danio,
            velocidad: row.velocidad,
            acciones: this.buildActions(row)
          }
        })

        // console.log(cartas)
        this.setState({ cards: cartas })
      });
  }

  deleteCard(id) {
    // console.log('Carta a eliminar ', id)
    // Set false to reload because it will reloaded in process end
    
    fetch(environment.urlCards + id, {
      method: 'DELETE',
      mode: 'cors',
      }).then(data => {
        // console.log('Carta eliminada ', data);

        // Se oculta el registro
        this.setState({ reload: false })

        var cartas = this.state.cards;
        var index = 0;
        for(var i = 0; i < cartas.length; i++) {
          if(cartas[i].id === id) {
            index = i;
            break;
          }
        }
        cartas.splice(index, 1);
        this.setState({ cards: cartas })

        this.setState({ reload: true })

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
      })
      .catch(error => {
        console.log('Error ', error)

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
      });
  }

  buildTableHeader() {
    return header.map(item => <th className="text-center" scope="col" key={item}>{ item }</th>)
  }

  buildTableBody() {
    if(this.state.cards) {
      return this.state.cards.map(item => 
        <tr className="text-center" key={item._id} id={item._id}>
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
            <button type="button" className="btn btn-outline-dark mr-1 mt-1" onClick={() => {window.location.href="/update/" + item._id }} >
              <BiPencil className="mb-1"/>
            </button>
            <button type="button" className="btn btn-outline-danger mr-1 mt-1" onClick={() => this.setState({ show: true, id: item._id })} >
              <BiTrash className="mb-1"/>
            </button>
            <SweetAlert
              id={item._id}
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
      return <img className="imgIndex" src={imgSrc} alt="new" style={{ height: '70px', textAlign: 'center', margin: '5px' }} />
    } else {
      return;
    }
  }

  buildActions(item) {
    return <div id={item._id} style={{ padding: "5px" }}>
      <button type="button" className="btn btn-outline-dark mr-1 mt-1" onClick={() => {window.location.href="/update/" + item._id }} >
        <BiPencil className="mb-1"/>
      </button>
      <button type="button" className="btn btn-outline-danger mr-1 mt-1" onClick={() => this.setState({ show: true, id: item._id })} >
        <BiTrash className="mb-1"/>
      </button>
    </div>
  }

  reloadTable() {

    if (this.state.reload) {
        return <DataTable id="dataTable"
            columns={header}
            data={this.state.cards}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5,10,20,50]}
          />
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
            {/* <span>Cartas disponibles en la plataforma</span> */}
          </div>
          <div className="text-right col-2">
            <button type="button" className="btn btn-outline-success mt-3 mr-2" onClick={() => {window.location.href="/create"}}>
              <IoMdAdd className="icoAdd" />
              <span className="btnColor">Nuevo</span>
            </button>
          </div>
        </div>
        
        {/* CUERPO DE LA TABLA */}
        <div>
          <div className="row bodyTable">
            <div className="col-12">

            {this.reloadTable()}

            <SweetAlert
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

              {/* <div>
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
              </div> */}

            </div>
          </div>
          &nbsp;
        </div>
      </Layout>
    );
  }
}

export default Home;
