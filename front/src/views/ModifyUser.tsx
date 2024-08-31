import { FC, useEffect, useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import axios from "axios";

// CSS

import "../styles/index.css";
import { format } from "@formkit/tempo";

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

  const [toggleAlert, setToggleAlert] = useState<string>("");

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
    const newPayDate = format(date, "DD/MM/YYYY", "es");

    setPayDateState(date);

    setInputValue({
      ...inputValue,
      payDate: newPayDate,
    });
  };

  const handleChangeExpireDate = (date: Date) => {
    const newExpireDate = format(date, "DD/MM/YYYY", "es");

    setExpireDateState(date);

    setInputValue({
      ...inputValue,
      expireDate: newExpireDate,
    });
  };

  const authAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/protected", {
        withCredentials: true,
      });
      if (response.data) {
        console.log("Authorized");
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleModifyUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/updateUser",
        inputValue,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setToggleAlert("create");
        setSuccessMessage(true);
      } else {
        return console.error("Error at /updateUser");
      }
    } catch (error) {
      console.error("ERROR AL GENERAR USUARIO");
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      const response = await axios.delete("http://localhost:3000/deleteUser", {
        data: { email },
        withCredentials: true,
      });

      if (response) {
        navigate("/admin");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setToggleAlert("");
    navigate("/admin");
  };

  useEffect(() => {
    authAdmin();
  }, []);

  return (
    <div className="container-fluid layout">
      {toggleAlert === "create" ? (
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
                      ? "Usuario modificado con éxito"
                      : "Error al modificar usuario"}
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
      ) : toggleAlert === "delete" ? (
        <div className={"alert-overlay"}>
          <div className="container text-center">
            <div className="row justify-content-center align-items-center">
              <div className="col-8 col-md-6 col-lg-4 bg-black bg-gradient rounded-4 ">
                <div className="p-4">
                  <span className="text-danger fw-bold fs-1 mb-4 ">
                    {`¿Está seguro de eliminar a ${state.data.name}?`}
                  </span>
                </div>
                <div className="row justify-content-around align-items-center p-4">
                  <button
                    onClick={() => setToggleAlert("")}
                    className="btn btn-success text-white text-centered w-25 mt-4"
                  >
                    NO
                  </button>
                  <button
                    onClick={() => handleDeleteUser(state.data.email)}
                    className="btn btn-danger text-white text-centered w-25 mt-4"
                  >
                    SI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="row justify-content-around align-items-center">
          <button
            className="btn btn-secondary mx-3 w-25"
            onClick={() => navigate("/admin")}
          >
            Volver
          </button>
          <button
            className="btn btn-danger w-25 h-25"
            onClick={() => setToggleAlert("delete")}
          >
            Eliminar
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
            <div className="row justify-content-center align-items-center text-center">
              <span className="text-white fw-bold mb-2">
                {state.data.payDate}
              </span>
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
              <span className="text-white fw-bold mb-2">
                {state.data.expireDate}
              </span>
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
                  dateFormatter(expireDateState) === dateFormatter(payDateState)
                }
                className="btn w-50 btn-secondary text-centered fw-bold"
                onClick={handleModifyUser}
              >
                Modificar Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyUser;
