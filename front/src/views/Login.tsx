import { ChangeEvent, FC, useState, useEffect } from "react";
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

  const [logged, setLogged] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputsValue({
      ...inputsValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        inputsValue,
        {
          withCredentials: true,
        }
      );

      console.log(response);

      if (response.data.token) {
        navigate("/admin");
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      setErrorMessage(true);
      console.error("Error al intentar loguearse", error);
    }
  };

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/protected", {
          withCredentials: true,
        });
        if (response.data) {
          setLogged(true);
        } else {
          setLogged(false);
        }
      } catch (error) {
        setLogged(false);
        console.log("Not Authorized");
      }
    };

    auth();

    return () => {
      setLogged(false);
    };
  }, []);

  return (
    <>
      {logged ? (
        <div className="container-fluid layout">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-8 col-md-6 col-lg-4 bg-black bg-gradient py-4 rounded-4">
              <div className="row justify-content-center ">
                <span className="text-white text-center fw-bold">
                  Acceso permitido
                </span>
              </div>
              <div className="row justify-content-center">
                <button
                  type="button"
                  name="Continue"
                  className="btn btn-secondary w-75 my-3 "
                  onClick={() => navigate("/admin")}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid layout">
          <div className="row justify-content-center align-items-center text-center min-vh-100">
            <div className="row justify-content-center col-8 col-md-6 col-lg-4 bg-black bg-gradient rounded-4 p-4 ">
              <input
                type="text"
                className="form-control my-2 "
                placeholder="Usuario"
                name="user"
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control my-2 "
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
              <button
                type="button"
                name="Submit"
                className="btn btn-secondary w-75 my-3 "
                onClick={handleSubmit}
              >
                Ingresar
              </button>
              {errorMessage ? (
                <h6 className="text-danger">Usuario o contraseña incorrecta</h6>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
