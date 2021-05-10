import { React, Component } from "react";
import { Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Layout from "./Layout";
import { BiArrowBack } from "react-icons/bi";
import { store } from 'react-notifications-component';
import { environment } from './../environments/environment';

class Create extends Component {

  constructor(props) {
    super(props);

    this.state = {
      card: {},
      rutaImagen: String,

      redirect: false
    }
  }

  // variable que establece si se redirecciona o no hacia el index
  

  componentDidMount() {
    fetch(environment.urlCards + this.props.match.params.id, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(data => {
        // console.log('DATA ', data)

        var carta = data;
        carta.calidad = carta.calidad === 'Común' ? 1  : (carta.calidad === 'Especial' ? 2 : (carta.calidad === 'Épica' ? 3 : 4));
        carta.tipoCarta = carta.tipoCarta === 'Tropa' ? 1 : (carta.tipoCarta === 'Hechizo' ? 2 : 3);
        carta.velocidad = carta.velocidad === 'Baja' ? 1 : (carta.velocidad === 'Media' ? 2 : (carta.velocidad === 'Alta' ? 3 : (carta.velocidad === 'Muy Alta' ? 4 : '')));

        document.getElementById('quality').value = data.calidad;
        document.getElementById('typeCard').value = data.tipoCarta;
        if(data.velocidad) document.getElementById('velocity').value = data.velocidad;

        this.setState({ 
          card: carta,
          rutaImagen: data.img
        });
      });
  }

  buildImage(event) {
    if(document.getElementById("urlImg").value) {
      document.getElementById("placeImgUpdate").style.display = "initial";
      ReactDOM.render(<img className="imgIndex" src={document.getElementById("urlImg").value} alt="La ruta de la imagen es inválida" />, document.getElementById("placeImgUpdate"))
    } else {
      document.getElementById("placeImgUpdate").style.display = "none";
    }
  }

  updateCard = () => {
    var quality = document.getElementById('quality').value;
    var typeCard = document.getElementById('typeCard').value;
    var velocity = document.getElementById('velocity').value;

    fetch(environment.urlCards + this.state.card._id, {
      method: 'PATCH',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.card._id,
        img: document.getElementById('urlImg').value,
        nombre: document.getElementById('name').value,
        calidad: Number(quality) === 1 ? 'Común' : (Number(quality) === 2 ? 'Especial' : (Number(quality) === 3 ? 'Épica' : 'Legendaria')),
        tipoCarta: Number(typeCard) === 1 ? 'Tropa' : (Number(typeCard) === 2 ? 'Hechizo' : 'Estructura'),
        vida: document.getElementById('health').value,
        danio: document.getElementById('damage').value,
        velocidad: Number(velocity) === 1 ? 'Baja' : (Number(velocity) === 2 ? 'Media' : (Number(velocity) === 3 ? 'Alta' : (Number(velocity) === 4 ? 'Muy Alta' : '')))
      })
    }).then(data => {
        // console.log('Carta agregada ', data);
  
        store.addNotification({
          message: "Se ha creado la carta correctamente",
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
  
        // Se establece la redirección como verdadero, lo que indica que se ha creado la carta correctamente.
        this.setState({
          redirect: true
        })
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
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname:'/home' }} />
    }
  }

  render() {
    return (
      <Layout>
        {/* ENCABEZADO DE LA VISTA */}
        <div className="row">
          <div className="col-8 col-sm-10">
            <span className="rutas">CARTAS / EDITAR CARTA</span>
            <h3 className="mb-0">
              <b>EDITAR CARTA</b>
            </h3>
            {/* <span>Actualiza las características de una carta existente</span> */}
          </div>
          <div className="text-right col-4 col-sm-2">
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
                <img className="imgIndex" src={this.state.rutaImagen} alt="La ruta de la imagen es inválida" />
              </div>
            </div>

            {/* Nombre */}
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Nombre</span>
              </div>
              <div className="col-10 col-md-6">
                <input className="form-control" type="text" id="name" name="name" defaultValue={this.state.card.nombre} />
              </div>
            </div>

            {/* Ruta Imagen */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Imagen (URL)</span>
              </div>
              <div className="col-10 col-md-6">
                <input className="form-control" type="text" id="urlImg" name="urlImg" onChange={this.buildImage} defaultValue={this.state.rutaImagen} />
              </div>
            </div>

            {/* Calidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Calidad</span>
              </div>
              <div className="col-10 col-md-6">
                <select className="selectpicker form-control" type="text" id="quality" name="quality" defaultValue={this.state.card.calidad}>
                  <option value="1">Común</option>
                  <option value="2">Especial</option>
                  <option value="3">Épica</option>
                  <option value="4">Legendaria</option>
                </select>
              </div>
            </div>

            {/* Tipo de Carta */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Tipo de Carta</span>
              </div>
              <div className="col-10 col-md-6">
              <select className="selectpicker form-control" type="text" id="typeCard" name="typeCard" defaultValue={this.state.card.tipoCarta}>
                  <option value="1">Tropa</option>
                  <option value="2">Hechizo</option>
                  <option value="3">Estructura</option>
                </select>
              </div>
            </div>

            {/* Vida */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Vida</span>
              </div>
              <div className="col-10 col-md-6">
                <input className="form-control" type="number" id="health" name="health" step="1" min="0" defaultValue={this.state.card.vida} />
              </div>
            </div>

            {/* Daño */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Daño</span>
              </div>
              <div className="col-10 col-md-6">
                <input className="form-control" type="number" id="damage" name="damage" step="1" min="0" defaultValue={this.state.card.danio} />
              </div>
            </div>

            {/* Velocidad */}
            <div className="row justify-content-center mt-3">
              <div className="col-12 col-sm-2  col-form-label">
                <span>Velocidad</span>
              </div>
              <div className="col-10 col-md-6">
                <select className="selectpicker form-control" type="text" id="velocity" name="velocity" defaultValue={this.state.velocidad} >
                  <option value="-1"></option>
                  <option value="1">Baja</option>
                  <option value="2">Media</option>
                  <option value="3">Alta</option>
                  <option value="4">Mul Alta</option>
                </select>
              </div>
            </div>

            <div className="row justify-content-center mt-4">
              <button type="button" className="btn btn-outline-primary" onClick={this.updateCard} >
                <span className="">ACTUALIZAR</span>
              </button>
            </div>

          </div>
        </div>
        {this.renderRedirect()}
      </Layout>
    );
  }
}
  
  export default Create;
  