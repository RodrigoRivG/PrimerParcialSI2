import React, { useState } from "react";

const AddProd = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    disponible: "si",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos para el backend
    const payload = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      dir_img: formData.imagen,
      disponible: formData.disponible === "si",
    };

    try {
      const res = await fetch("primerparcialsi2-production-9a4d.up.railway.app/api/products/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Producto registrado con éxito");
        setFormData({
          nombre: "",
          precio: "",
          stock: "",
          imagen: "",
          disponible: "si",
        });
      } else {
        alert("Error al registrar producto: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h3>Agregar Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
        <select
          name="disponible"
          value={formData.disponible}
          onChange={handleChange}
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
};

export default AddProd;
