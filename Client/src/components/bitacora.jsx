import React, { useState, useEffect } from "react";
import axios from "axios";

const Bitacora = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    axios
      .get("https://primerparcialsi2-production.up.railway.app/api/users/admin/bitacora/") // Ajustá la URL a tu endpoint real
      .then((res) => setRegistros(res.data))
      .catch((err) => console.error("Error al cargar la bitácora:", err));
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="mb-4">Bitácora del Sistema</h3>

        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>IP</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => {
              const [fecha, hora] = registro.fecha_hora.split("T");
              return (
                <tr key={index} className="text-center align-middle">
                  <td>{registro.usuario}</td>
                  <td>{fecha}</td>
                  <td>{hora.substring(0, 8)}</td>
                  <td>{registro.ip}</td>
                  <td>
                    <span
                      className={`badge ${
                        registro.accion === "login" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {registro.accion}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bitacora;
