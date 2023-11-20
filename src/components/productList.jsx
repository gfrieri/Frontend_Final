// ProductList.js
import React from "react";

const ProductList = ({ products }) => (
  <div>
    {products.map((product) => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        {/* Más detalles como imagen, etc. */}
      </div>
    ))}
  </div>
);

export default ProductList;
