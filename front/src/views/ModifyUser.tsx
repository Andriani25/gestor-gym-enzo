import { FC, useEffect, useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import axios from "axios";

// CSS

import "../styles/index.css";

// Types

export interface Data {
  name?: string;
  payDate: Date | string;
  cellPhone: number;
  expireDate: Date | string;
  email: string;
}

export interface userData {
  email: string;
  data: Data;
}

const ModifyUser: FC = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const [payDateState, setPayDateState] = useState<Date>(new Date());

  const [expireDateState, setExpireDateState] = useState<Date>(new Date());

  const [toggleAlert, setToggleAlert] = useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<Data>({
    name: state.data.name,
    payDate: state.data.payDate,
    expireDate: state.data.expireDate,
    cellPhone: state.data.cellPhone,
    email: state.data.email,
  });

  const dateFormatter = (d: Date) => {
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePayDate = (date: Date) => {
    const newPayDate = dateFormatter(date);

    setPayDateState(date);

    setInputValue({
      ...inputValue,
      payDate: newPayDate,
    });
  };

  const handleChangeExpireDate = (date: Date) => {
    const newExpireDate = dateFormatter(date);

    setExpireDateState(date);

    setInputValue({
      ...inputValue,
      payDate: newExpireDate,
    });
  };

  const authAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/protected", {
        withCredentials: true,
      });
      if (response.data === "gym_gestor") {
        console.log("Authorized");

        const getResponse = await axios.get("http://localhost:3000/getUsers", {
          withCredentials: true,
        });

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

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/updateUser",
        inputValue,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setToggleAlert(true);
        setSuccessMessage(true);
      } else {
        return console.error("Error at /updateUser");
      }
    } catch (error) {
      console.error("ERROR AL GENERAR USUARIO");
    }
  };

  const handleCloseAlert = () => {
    setToggleAlert(false);
    navigate("/admin");
  };

  useEffect(() => {
    authAdmin();
  }, []);

  return (
    <div className="container-fluid layout">
      {toggleAlert ? (
        <div className={"alert-overlay"}>
          <div className="container text-center">
            <div className="row justify-content-center align-items-center">
              <div className="col-8 col-md-6 col-lg-4 bg-black bg-gradient rounded-4 ">
                <div className="p-4">
                  <span
                    className={`${
                      successMessage ? "text-success" : "text-danger"
                    } fw-bold fs-1 mb-4 `}
                  >
                    {successMessage
                      ? "Usuario creado con éxito"
                      : "Error al crear usuario"}
                  </span>
                </div>
                <div className="p-4">
                  <button
                    onClick={handleCloseAlert}
                    className="btn btn-secondary text-white text-centered mt-4"
                  >
                    Regresar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="row">
          <button
            className="btn btn-secondary mx-3 w-25"
            onClick={() => navigate("/admin")}
          >
            Volver
          </button>
        </div>
        <div className="col-10 col-md-8 col-lg-6">
          <div className="container bg-dark bg-gradient p-5 rounded-4">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                !
              </span>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder={state.data.name}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                !
              </span>
              <input
                name="email"
                type="text"
                value={state.data.email}
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                disabled
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
                placeholder={state.data.cellPhone}
                aria-label="cellPhone"
                aria-describedby="basic-addon1"
                onChange={handleChange}
              />
            </div>
            <div className="row justify-content-center align-items-center">
              <DatePicker
                showIcon
                placeholderText="Fecha de alta"
                selected={payDateState}
                selectsStart
                startDate={payDateState}
                endDate={expireDateState}
                onChange={(date) => handleChangePayDate(date as Date)}
                dateFormat={"dd/MM/yy"}
                className="mb-3 w-100 rounded-2"
                withPortal
              />
              <DatePicker
                showIcon
                placeholderText="Fecha de expiro"
                selected={expireDateState}
                selectsEnd
                startDate={payDateState}
                endDate={expireDateState}
                onChange={(date) => handleChangeExpireDate(date as Date)}
                dateFormat={"dd/MM/yy"}
                minDate={payDateState}
                className="mb-3 w-100"
                withPortal
              />
              <button
                disabled={
                  dateFormatter(expireDateState) ===
                  dateFormatter(payDateState || !inputValue.email.includes("@"))
                }
                className="btn w-50 btn-secondary text-centered fw-bold"
                onClick={handleCreateUser}
              >
                Agregar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyUser;
