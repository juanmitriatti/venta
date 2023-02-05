import React, { useState } from "react";
import "./App.css";
import AutocompleteInput from "./components/AutocompleteInput";
import { Producto } from "./interfaces/Producto";
import ListaProductos from "./producto/ListaProductos";

function App() {
  const [productosAComprar, setProductosAComprar] = useState<Producto[]>([]);

  // Backend data
  const config = {
    method: "get",
    url: "http://localhost:3000/producto",
    headers: {},
  };

  function manejoEnter(e) {
    if (e.key === "Enter") {
      //this.nameInput.focus();
    }
  }

  function getSelectedValue(producto: Producto) {
    producto.cantidad = 1;
    console.log(producto.cantidad);
    
    setProductosAComprar([...productosAComprar, producto]);
  }

  return (
    <div className="App" tabIndex={0} onKeyDown={manejoEnter}>
      <div className="content">
        <h1>La Yogurteria</h1>
        <AutocompleteInput selectProduct={getSelectedValue} />
        {productosAComprar.length > 0 && <ListaProductos productos={productosAComprar} />}
      </div>
    </div>
  );
}

export default App;
