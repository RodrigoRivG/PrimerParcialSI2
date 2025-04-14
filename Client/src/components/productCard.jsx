import React from "react";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ producto, carrito, setCarrito }) => {
  const { id, nombre, precio, imagen } = producto;

  const handleAgregar = () => {
    const productoExistente = carrito.find((item) => item.id === id);

    if (productoExistente) {
      const actualizado = carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  return (
    <>
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card h-100 shadow-sm">
          <img
            src={imagen}
            className="card-img-top"
            alt={nombre}
            style={{ height: "200px", objectFit: "contain" }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text fw-bold text-success">Bs {precio}</p>
            <button className="btn btn-primary mt-auto" onClick={handleAgregar}>
              <FaCartPlus className="me-2" />
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
