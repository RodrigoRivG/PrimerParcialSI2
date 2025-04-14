import React from "react";
import ProductCard from "./productCard";

import { useState, useEffect } from "react";
import axios from "axios";

const Products = ({ carrito, setCarrito }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/getproducts/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error al cargar los productos", error));
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Productos Disponibles</h2>
        <div className="row">
          {products.map((prod) => (
            <ProductCard
              producto={prod}
              carrito={carrito}
              setCarrito={setCarrito}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
