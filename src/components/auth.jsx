import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lógica para iniciar sesión
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos de email y contraseña */}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
