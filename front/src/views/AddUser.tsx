import { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import axios from "axios";

// CSS

import "../styles/index.css";
import "react-datepicker/dist/react-datepicker.css";

// Types

export interface Data {
  name: string;
  payDate: Date;
  cellPhone?: number;
  expireDate: Date;
  email: string;
}

const AddUser: FC = () => {
  const navigate = useNavigate();

  const [payDateState, setPayDateState] = useState<Date>(new Date());

  const [expireDateState, setExpireDateState] = useState<Date>(new Date());

  const [inputValue, setInputValue] = useState<Data>({
    name: "",
    payDate: payDateState,
    cellPhone: 381,
    expireDate: expireDateState,
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const authAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:3000/protected", {
          withCredentials: true,
        });
        if (response.data === "gym_gestor") {
          console.log("Authorized");

          const getResponse = await axios.get(
            "http://localhost:3000/getUsers",
            {
              withCredentials: true,
            }
          );

          if (getResponse.data) {
            return null;
          }
        } else {
          navigate("/error");
        }
      } catch (error) {
        navigate("/error");
      }
    };

    authAdmin();
  }, []);

  const handleReturPage = () => {
    navigate("/admin");
  };

  return (
    <div className="container-fluid layout">
      <button
        onClick={handleReturPage}
        className=" z-3 btn btn-md btn-dark btn-gradient text-white mt-4"
      >
        Volver
      </button>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-10 col-md-8 col-lg-6 bg-dark bg-gradient rounded-4 p-4 ">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              !
            </span>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Nombre y Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              !
            </span>
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              !
            </span>
            <input
              name="cellPhone"
              type="number"
              className="form-control"
              placeholder="Celular"
              aria-label="cellPhone"
              aria-describedby="basic-addon1"
            />
          </div>
          <div>
            <DatePicker
              showIcon
              placeholderText="Fecha de alta"
              selected={payDateState}
              selectsStart
              startDate={payDateState}
              endDate={expireDateState}
              onChange={(date) => setPayDateState(date as Date)}
              dateFormat={"dd/MM/yy"}
              className="mb-3"
              withPortal
            />
            <DatePicker
              showIcon
              placeholderText="Fecha de expiro"
              selected={expireDateState}
              selectsEnd
              startDate={payDateState}
              endDate={expireDateState}
              onChange={(date) => setExpireDateState(date as Date)}
              dateFormat={"dd/MM/yy"}
              minDate={payDateState}
              className="mb-3"
              withPortal
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// AGREGAR BOTON PARA CREAR USUARIO CON SUS RESPECTIVAS REGLAS DE SEGURIDAD

export default AddUser;
