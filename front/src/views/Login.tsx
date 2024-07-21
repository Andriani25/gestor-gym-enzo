import { ChangeEvent, FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

// CSS

import "../styles/index.css";

const Login: FC = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState<{}>({
    user: "",
    password: "",
  });

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputsValue({
      ...inputsValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3000/admin",
      inputsValue,
      {
        withCredentials: true,
      }
    );

    if (response.data.token) {
      setIsLogged(true);
    }
  };

  useEffect(() => {
    navigate("/admin");
  }, [isLogged]);

  return (
    <div className="layout container-fluid d-flex flex-column align-items-center">
      <div className="container p-5 bg-black bg-gradient rounded-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Usuario"
          name="user"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <button
          type="button"
          name="Submit"
          className="btn btn-secondary mb-3"
          onClick={handleSubmit}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
