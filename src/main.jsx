import React from 'react'
import ReactDOM from 'react-dom/client'
import Venta from './venta/Venta'
import AltaProducto from './producto/AltaProducto'
import "./App.css";

import Menu from "./menu/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import ListadoProducto from './producto/ListadoProducto';
import ActualizarProducto from './producto/ActualizarProducto';
import VentaHoy from './venta/VentaHoy';
import VentaUltimosSiete from './venta/VentaUltimosSiete';


const NoPage = () => {
  return <h1>Esta página no existe. Error 404</h1>;
};
const Home = () => {
  return <h1>Home</h1>;
};

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="venta" element={<Venta />} />
          <Route path="venta-hoy" element={<VentaHoy />} />
          <Route path="venta-ultimos-siete" element={<VentaUltimosSiete />} />

          <Route path="altaproducto" element={<AltaProducto />} />
          <Route path="listadoproducto" element={<ListadoProducto />} />
          <Route path="actualizarproducto/:id" element={<ActualizarProducto />} />
         
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);