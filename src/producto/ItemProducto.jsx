import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './product.css';

const ItemProducto = () => {
  return (
    <div className="row product">
      <div className="col-md-2">
      </div>
      <div className="col-md-8 product-detail">
        <h4>Blue T-Shirt</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="col-md-2 product-price">
        $19.99
      </div>
    </div>
  );
}

export default ItemProducto;