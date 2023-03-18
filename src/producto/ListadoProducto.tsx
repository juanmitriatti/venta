import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Producto } from "../interfaces/Producto";
import { Link } from "react-router-dom";

function ListadoProducto() {

  const [productList, setProductList] = useState<Producto[]>([]);
  const [filteredList, setFilteredList] = useState<Producto[]>([]);
  const url_final = import.meta.env.VITE_URL || 'http://localhost:3000';
  const [mensaje, setMensaje] = useState(null);

  const configuration = {
    method: "get",
    url: url_final + "/producto",
    headers: {},
  };

  const fetchData = async () => {
    // Este array va a almacenar los productos que vengan del backend. Y además, una property llamada
    // identificador esta conformada por ID + NOMBRE, esa propiedad va a aparecer en el search autpomplete.
    // Ejemplo: 1 HeladoA, 2 HeladoB.
    const res = await axios(configuration);
    const productos = res.data as Producto[];
    setProductList(productos);
    setFilteredList(productos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let configurationDelete = {
    method: "delete",
    url: url_final + "/producto",
    headers: {},
  };
  const eliminarProducto = async (id, nombre) => {
    if (window.confirm("Estas seguro que deseas eliminar " + nombre + " ?")) {
      configurationDelete.url = configurationDelete.url + "/" + id;
      const respuestaEliminar = await axios(configurationDelete);
      if (respuestaEliminar.status == 200) {
        fetchData();
        setMensaje('El producto se ha eliminado correctamente');
      } else {
        alert('El producto no se borró. Aparentemente hubo un error en el sistema.')
      }

    }
  }

  const productos = productList.map((producto, index) =>
    // Only do this if items have no stable IDs
    <tr key={index}>
      <td>
        {index}
      </td>
      <td>
        {producto.nombre}
      </td>
      <td>
        {producto.precio}
      </td>
      <td>
        <Link to={`/actualizarproducto/${producto.id}`}> Actualizar</Link>
      </td>
      <td style={{ color: "black", fontWeight: "bold" }} onClick={() => eliminarProducto(producto.id, producto.nombre)}>
        Eliminar
      </td>
    </tr>
  );
  return (
    <Container>
      {mensaje &&
        <div className='row'>
          <div className="col-md-5 text-success">
            <strong> {mensaje}</strong>
          </div>
        </div>
      }
      <Row>
        <Table striped bordered hover style={{ marginTop: '25px' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Actualizar</th>
              <th>Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {productos}
          </tbody>
        </Table>
      </Row>
    </Container>

  );
}

export default ListadoProducto;