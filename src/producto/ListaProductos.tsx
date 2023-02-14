import { faMinus, faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Producto } from "../interfaces/Producto";
import "./ListaProductos.scss";

const ListaProductos = (props) => {
  const [productos, setProductos] = useState<Producto[]>(props.productos);

  useEffect(() => {
    setProductos(props.productos);
  }, [props]);

  useEffect(() => {
   const total = productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
   props.setCompraTotal(total);
   console.log("movio productos, Total =",total)
  }, [productos]);

  const removeCantidad = (producto: Producto) => {
    setProductos(
      productos.map((p) => {
        if (p.id === producto.id) {
          producto.cantidad -= 1;
        }
        return p;
      })
    );
  };

  const removeItem = (producto: Producto) => {
    const filtrados =  productos.filter(p => p.id !== producto.id);
    setProductos(
      filtrados
    );
     if (filtrados.length == 0) {
      props.setCompraTotal(0);
    }
    props.setProductosAComprar(filtrados)
  };

  const addCantidad = (producto: Producto,e) => {
    e.preventDefault();
    setProductos(
      productos.map((p) => {
        if (p.id === producto.id) {
          producto.cantidad += 1;
        }
        return p;
      })
    );
  };
 
 
  return (
    <div>
      <div className="c-list">
        <div className="c-header">
          <span className="c-nombre">Nombre</span>
          <span className="c-precio">Precio</span>
          <span className="c-cantidad">Cantidad</span>
          <span className="c-quitar">Quitar</span>

        </div>
        {productos.map((producto) => (
          <div className="c-producto" key={producto.id}>
            <span className="c-nombre">{producto.nombre}</span>
            <span className="c-precio">${producto.precio}</span>
            <span className="c-cantidad">
              <FontAwesomeIcon icon={faMinus} onClick={() => removeCantidad(producto)} />
              <span>{producto.cantidad}</span>
              <FontAwesomeIcon icon={faPlus} onClick={(e) => addCantidad(producto,e)} />
            </span>
            <span className="c-quitar">
              <FontAwesomeIcon icon={faRemove} onClick={() => removeItem(producto)} />
            </span>
          </div>
        ))}
      </div>
      <div className="c-total">
        <span>Total</span>
        <span className="precioFinal">${productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}</span>
      </div>
    </div>
  );
};

export default ListaProductos;
