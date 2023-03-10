import React, { useState } from "react";
import "../App.css";
import AutocompleteInput from "../components/AutocompleteInput";
import { Producto } from "../interfaces/Producto";
import ListaProductos from "../producto/ListaProductos";
import axios from "axios";
import yogurteria from '../assets/yogurteria.jpg';

function Venta() {
  const [productosAComprar, setProductosAComprar] = useState<Producto[]>([]);
  const [mensaje, setMensaje] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [total, setCompraTotal] = useState(0);
  const [reiniciar, setReiniciar] = useState(null);

  //productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
  function manejoEnter(e) {

    switch (e.key) {
      case 'F7':
        console.log('Apretaron F7.');
        break;
      case 'Enter':
      case 'enter':
        setModalOpen(true);
        break;
      default:
        console.log('la tecla es .' + e.key);
    }

  }

  const enviarDatos = async (event) => {
    event.preventDefault()

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');

    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    urlencoded.append("total", total);
    urlencoded.append("fecha", yyyy + '/' + mm + '/' + dd);
  /*  console.log("fecha", yyyy + '/' + mm + '/' + dd);
    return false;*/
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    let factura;

    // Call the API
    fetch('http://localhost:3000/factura', requestOptions).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (data) {

      // Store the post data to a variable
      factura = data;

    //  urlLineaEncoded.append("factura", factura.id); //12


      let lineasAGuardar = [];
      if (productosAComprar.length > 0) {
        let lineasFinal = productosAComprar.map(item => {
          const container = {};
          container['precio'] = item.precio;
          container['cantidad'] = item.cantidad;
          return container;
        })
        lineasAGuardar = [...lineasFinal];
      }

    //  urlLineaEncoded.append("productoLinea", lineasAGuardar);

     // requestLineaOptions.body = urlLineaEncoded;
    //  console.log("requestLineaOptions", requestLineaOptions)
      // Fetch another API
    //  return fetch('http://localhost:3000/linea', requestLineaOptions);
    return  fetch('http://localhost:3000/linea', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(
        {
          productoLinea:lineasAGuardar,
          factura: factura.id,
        }
      ) // body data type must match "Content-Type" header
    });
    
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (userData) {
      setMensaje('Se ha guardado la venta correctamente');
      setTimeout(function () {

        setMensaje(null);
        resetearProductosAComprar();
        
      }, 3000);


    }).catch(function (error) {
      console.warn(error);
    });
  }

  function guardarFormulario(e) {
    enviarDatos(e);
  }

  function getSelectedValue(producto: Producto) {
    producto.cantidad = 1; // seteando uno por defecto
    setProductosAComprar([...productosAComprar, producto]);
  }
  function resetearProductosAComprar() {
    setProductosAComprar([]);
    setReiniciar(1);
  }

  return (
    <div className="Venta" style={{ minHeight: "500px", height: "auto" }} tabIndex={0} onKeyDown={manejoEnter}>
      {mensaje &&
        <div className='row'>
          <div className="col-md-5 text-success" >
            <strong>{mensaje}</strong>
          </div>
        </div>
      }

      <div className="content">
        <div className="row">
        <div className="col-md-4 ">
          <img src={yogurteria}></img>
          </div>
          <div className="col-md-4 "> <AutocompleteInput modalInput={isModalOpen} reiniciar={reiniciar} setReiniciar={setReiniciar} selectProduct={getSelectedValue} />
            {productosAComprar.length > 0 && <ListaProductos setProductosAComprar={setProductosAComprar} productos={productosAComprar} setCompraTotal={setCompraTotal} />}
          </div>
          <div className="col-md-2">
            {productosAComprar.length > 0 && <button className="btn btn-primary btn-lg" onClick={guardarFormulario}>Guardar (F7)</button>}
          </div>
          <div className="col-md-2">
            <button onClick={resetearProductosAComprar} className="btn btn-secondary btn-lg">Nuevo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venta;
