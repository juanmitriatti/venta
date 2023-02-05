import React, {Fragment, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const AltaProducto = () => {


    const [datos, setDatos] = useState({
        nombre: '',
        precio: 0,
        descripcion: 'testDescription',

    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = async (event) => {
        event.preventDefault()
        /*try {
            let res = await fetch("http://localhost:3000/producto", {
              method: "POST",
              body: JSON.stringify({
                nombre:  datos.nombre,
                precio: datos.precio,
                descripcion: datos.descripcion,
              }),
            });
            console.log("desde react",res);
            let resJson = await res.json();
            if (res.status === 200) {
             setDatos('');
              //setMessage("User created successfully");
            } else {
              //setMessage("Some error occured");
            }

          } catch (err) {
            console.log(err);
          }*/
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
          
          var urlencoded = new URLSearchParams();
         
          urlencoded.append("nombre",datos.nombre);
          urlencoded.append("precio", datos.precio);
          urlencoded.append("descripcion",datos.descripcion);
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          };
          
          fetch("http://localhost:3000/producto", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
   
   
    }

    return (
        <Fragment>
            <h1>Formulario Alta Producto</h1>
            <form className="row" onSubmit={enviarDatos}>
                <div className="col-md-3">
                    <input type="text" placeholder="Nombre" required={true} className="form-control" onChange={handleInputChange} name="nombre"></input>
                </div>
                <div className="col-md-3">
                    <input type="number" placeholder="Precio"  step="any" className="form-control" onChange={handleInputChange} name="precio"></input>
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Descripción" className="form-control" value="testDescription" onChange={handleInputChange} name="descripcion"></input>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Producto</button>
            </form>
            <ul>
                <li>{datos.nombre}</li>
                <li>{datos.precio}</li>
                <li>{datos.descripcion}</li>

            </ul>
        </Fragment>
    );
}
 
export default AltaProducto;