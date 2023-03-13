import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Producto } from "../interfaces/Producto";
import "./AutocompleteInput.css";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const AutocompleteInput = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [productList, setProductList] = useState<Producto[]>([]);
  const [filteredList, setFilteredList] = useState<Producto[]>([]);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const url_final = import.meta.env.VITE_URL || 'http://localhost:3000';

  useOutsideClick(wrapperRef, () => {
    setModalOpen(false);
  });

  const onChange = (e) => {
    const value = e.target.value;
    const prod = productList.filter((product) => product.id == value || product.nombre.toLowerCase().includes(value));
    setFilteredList(prod);
  };

  const onFocus = () => {
    setModalOpen(true);
  };

  const config = {
    method: "get",
    url: url_final+"/producto",
    headers: {},
  };

  const fetchData = async () => {
    // Este array va a almacenar los productos que vengan del backend. Y además, una property llamada
    // identificador esta conformada por ID + NOMBRE, esa propiedad va a aparecer en el search autpomplete.
    // Ejemplo: 1 HeladoA, 2 HeladoB.
    const res = await axios(config);
    const productos = res.data as Producto[];
    setProductList(productos);
    setFilteredList(productos);
  };
  useEffect(() => {
    console.log("desde autocomplete cambio props.modalInput",props.modalInput)
    if (props.modalInput != isModalOpen){
      setModalOpen(props.modalInput);
    }
  }, [props.modalInput])

  useEffect(() => {
    fetchData();
    props.setReiniciar(null);
  }, [props.reiniciar]);

  const selectProduct = (producto: Producto) => {
    props.selectProduct(producto);
    const productos = productList.filter((p) => p.id !== producto.id);
    console.log("selectProduct",productos);

    setProductList(productos);
    setFilteredList(productos);
    setModalOpen(false);
    inputRef.current!.value = "";
  };

  return (
    <div className="c-container" ref={wrapperRef}>
      <div className="c-input-container">
        <input ref={inputRef} className="c-input" placeholder="Agregar producto" onChange={onChange} onFocus={onFocus} />
        <label className="c-label">Agregar producto</label>
      </div>
      {isModalOpen && (
        <div className="c-modal">
          {filteredList.length ? (
            filteredList.map((item) => (
              <div className="c-item" key={item.id} onClick={() => selectProduct(item)}>
                ({item.id}) {item.nombre}
              </div>
            ))
          ) : (
            <span className="py-2">Sin resultados</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
