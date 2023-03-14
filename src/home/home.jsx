import React from "react";
import yogurteria from '../assets/yogurteria.jpg';

function Home() {

    return (
        <div style={{ textAlign:"center" }}>
            <h1 style={{ color:"green" }}>Yogurteria </h1>
            <img src={yogurteria}></img>
        </div>
    );
}

export default Home;