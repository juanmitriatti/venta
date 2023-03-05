import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Producto } from "../interfaces/Producto";
import { Link } from "react-router-dom";

function VentaHoy() {

    const [facturadoHoy, setFacturadoHoy] = useState();
    

    const configuration = {
        method: "get",
        url: "http://localhost:3000/linea/factura/hoy",
        headers: {},
    };

    const fetchData = async () => {
        // Este array va a almacenar los productos que vengan del backend. Y además, una property llamada
        // identificador esta conformada por ID + NOMBRE, esa propiedad va a aparecer en el search autpomplete.
        // Ejemplo: 1 HeladoA, 2 HeladoB.
        const res = await axios(configuration);
        setFacturadoHoy(res.data[0].sum);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const isLoggedIn = facturadoHoy;
    let button;
    if (isLoggedIn) {
 
        button =  <h1>Vendido hoy:<span class="badge bg-secondary">${ Number.parseFloat(facturadoHoy).toFixed(2) }</span></h1>;

    } else {
      button = <h1>No se registran ventas en el día de hoy.</h1>;
    }
    

    return (
        <Container>
            <Row>
                {button}
            </Row>
        </Container>

    );
}

export default VentaHoy;