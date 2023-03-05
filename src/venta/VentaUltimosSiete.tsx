import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Producto } from "../interfaces/Producto";
import { Link } from "react-router-dom";

function VentaUltimosSiete() {

    const [facturadoUltimosSiete, setFacturadoUltimosSiete] = useState();
    const [facturadoUltimosSieteDetalle, setFacturadoUltimosSieteDetalle] = useState();


    const configuration = {
        method: "get",
        url: "http://localhost:3000/linea/factura/ultimossiete",
        headers: {},
    };

    const configurationDetalle = {
        method: "get",
        url: "http://localhost:3000/linea/factura/ultimossietedetalle",
        headers: {},
    };

    let todoItems = '';
    const fetchData = async () => {
        // Este array va a almacenar los productos que vengan del backend. Y además, una property llamada
        // identificador esta conformada por ID + NOMBRE, esa propiedad va a aparecer en el search autpomplete.
        // Ejemplo: 1 HeladoA, 2 HeladoB.
        const res = await axios(configuration);
        setFacturadoUltimosSiete(res.data[0].sum);
        const resDetalle = await axios(configurationDetalle);
        setFacturadoUltimosSieteDetalle(resDetalle.data);
        
    };
 
    useEffect(() => {
        fetchData();
    }, []);

    const isLoggedIn = facturadoUltimosSieteDetalle;
    let button;
    if (isLoggedIn) {
 
        button = facturadoUltimosSieteDetalle.map((todo, index) =>
           <tr key={index}>
               <td>{todo.dia}</td>
                <td>{todo.sum}</td>
           </tr>
       );
    } else {
      button = '';
    }
    

    return (
        <Container>
            <Row>
                <h1>Vendido últimos siete dias:<span className="badge bg-secondary">${Number.parseFloat(facturadoUltimosSiete).toFixed(2)}</span></h1>
            </Row>
            {facturadoUltimosSieteDetalle  &&
               
            <Row>
            <Table striped bordered hover style={{ marginTop: '25px' }}>
                <thead>
                    <tr>
                       
                        <th>Día</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                {button}
                </tbody>
            </Table>
        </Row>  
                
               
                 
            }
            
        </Container>

    );
}

export default VentaUltimosSiete;