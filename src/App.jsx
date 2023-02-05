import reactLogo from './assets/react.svg'
import ItemProducto from './producto/ItemProducto'
import ListaProductos from './producto/ListaProductos'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'
import { BS5FloatingAutocompleteList } from 'react-bootstrap-autocomplete-list';

function App() {
 
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [listadoBusqueda, setlistadoBusqueda] = useState([]);
  const [productosAComprar, setProductosAComprar] = useState([]);

  // Backend data
  const config = {
    method: 'get',
    url: 'http://localhost:3000/producto',
    headers: {}
  };

  useEffect(() => {
    const fetchData = async () => {
      // Este array va a almacenar los productos que vengan del backend. Y además, una property llamada
      // identificador esta conformada por ID + NOMBRE, esa propiedad va a aparecer en el search autpomplete.
      // Ejemplo : 1 HeladoA, 2 HeladoB.
      const arregloFinal = [];

      const result = await axios(config);

      const listadoSearch = result.data.map(function (producto) {
        arregloFinal.push(
          {
            nombre: producto.nombre,
            id: producto.id,
            precio: producto.precio,
            identificador: producto.id + " " + producto.nombre,
          }
        )
        return producto.id + " " + producto.nombre;
      });
      setData(arregloFinal);
      // Listado de busqueda, almacena solo ID + NOMBRE, para ser mostrados en el search.
      // EL objetivo es que este campo luego se use para Filter/Find contra el arregloFinal.
      setlistadoBusqueda(listadoSearch);
    };
    fetchData();
  }, []);

 

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  
  function closeModal() {
    setIsOpen(false);
  }

  function manejoEnter(e) {
    if (e.key === "Enter") {
      
       
      //this.nameInput.focus();
    }
  }

  function getSelectedValue(item) {
    // Se fija si el item seleccionado existe en data(listado de productos).
    const itemFinal = data.find(producto => item == producto.identificador);
    
    // Se fija si el item seleccionado existe en data(listado de productos).
    if (itemFinal && !productosAComprar.includes(itemFinal)) {
      // Se almacena el item seleccionado y se muestra en la table que
      // muestra los productos seleccionados.
      setProductosAComprar([...productosAComprar, itemFinal])

      // Además, se elimina el item encontrado del listado a mostrar, asi no muestra repetidos.
      setlistadoBusqueda(listadoBusqueda.filter(item => item !== itemFinal.identificador));
    }
  }

  function valueOnChange(item) {
    console.log("valueOnChange", item);
  }

  return (
    <div className="App" tabIndex="0" onKeyDown={manejoEnter}  >
      <h1>La Yogurteria</h1>
      <BS5FloatingAutocompleteList label="AGREGAR PRODUCTO" list={listadoBusqueda} valueOnChange={valueOnChange} selectedValue={getSelectedValue}></BS5FloatingAutocompleteList>
      {productosAComprar.length > 0 &&
        <ListaProductos productos={productosAComprar} />
      }
    </div>
  );
}

export default App
