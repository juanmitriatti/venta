import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const AltaProducto = () => {
  const url_final = import.meta.env.VITE_URL || 'http://localhost:3000';

  const [mensaje, setMensaje] = useState(null);
  const [datos, setDatos] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
  })

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
 
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const enviarDatos = async (event) => {
    event.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", datos.nombre);
    urlencoded.append("precio", datos.precio);
    urlencoded.append("descripcion", datos.descripcion);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(url_final+"/producto", requestOptions)
      .then(response => response.text)
      .then(result => console.log(result))
      .then(function() {
        setMensaje('El producto se ha guardado correctamente')
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className='container'>
      <h1>Alta Producto</h1>

      {mensaje &&
        <div className='row'>
          <div className="col-md-5 text-success">
            <strong> {mensaje}</strong>
          </div>
        </div>
      }
      <form className="row" onSubmit={enviarDatos}>
        <div className="col-md-3">
          <input type="text" placeholder="Nombre" required={true} className="form-control" onChange={handleInputChange} name="nombre"></input>
        </div>
        <div className="input-group w-25">
          <span className="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
            </svg>
          </span>
          <input type="number" className="form-control" name="precio" onChange={handleInputChange} placeholder="Precio" aria-label="Input group example" aria-describedby="basic-addon1" step="any"></input>
        </div>

        <div className="col-md-3">
          <input type="text" placeholder="Descripción" className="form-control" value="" onChange={handleInputChange} name="descripcion"></input>
        </div>
        <button type="submit" className="btn btn-primary col-md-3">Guardar Producto</button>
      </form>
      <ul style={{ listStyle: "none", marginTop: "30px" }}>
        <li>Nombre : {datos.nombre}</li>
        <li>Precio: {datos.precio}</li>
        <li>Descripción: {datos.descripcion}</li>

      </ul>

    </div>
  );
}

export default AltaProducto;