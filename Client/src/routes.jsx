import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cliente from "./pages/Cliente";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";

const AppRouter = () => {
  return (
    <>
      <Router basename="/PrimerParcialSI2">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* rutas protegidas para el cliente */}
          <Route
            path="/cliente"
            element={
              <PrivateRoute role="Cliente">
                <Cliente />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<AdminPanel />}/>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
