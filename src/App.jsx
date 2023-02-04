import reactLogo from './assets/react.svg'
import ItemProducto from './producto/ItemProducto'
import ListaProductos from './producto/ListaProductos'
import ReactDOM from "react-dom";
import Modal from "react-modal";
import * as ReactDOMClient from "react-dom/client";
import { StrictMode } from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const config = {
    method: 'get',
    url: 'http://localhost:3000/producto',
    headers: {}
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config);
      console.log("result", result);
      setData(result.data);
    };

    fetchData();

  }, []);
  if (!data) return null;


  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function manejoEnter(e) {

    if (e.key === "Enter") {
      setIsOpen(!modalIsOpen);
    }
  }
  
  return (
    <div className="App" tabIndex="0" onKeyDown={manejoEnter}  >

      <h1>La Yogurteria</h1>

      <ListaProductos productos={data} />


      <a
        id="modalVenta"
        href="/"
        onKeyUp={(e) => {
          console.log("e", e);
          // if (e.key === "Enter") e.currentTarget.click();
        }}
        onClick={openModal}
      >
        Open Modal
      </a>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>

    </div>
  )
}

export default App
