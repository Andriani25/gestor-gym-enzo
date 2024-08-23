import { FC } from "react";
import { useNavigate } from "react-router";

// CSS

import "../styles/index.css";

const Error: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid layout">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-8 col-md-6 col-lg-4 bg-black bg-gradient py-4 rounded-4 bg-black bg-gradient">
          <div className="row justify-content-center">
            <h1 className="text-white text-center fw-bold">Oops!...</h1>
          </div>
          <div>
            <h4 className="text-white text-center fw-bold">
              {" "}
              hubo un problema de autorización{" "}
            </h4>
          </div>
          <div className="row justify-content-center">
            <button
              type="button"
              name="Continue"
              className="btn btn-secondary w-75 my-3 "
              onClick={() => navigate("/")}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
