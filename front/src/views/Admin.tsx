import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useStore from "../zustand/store";

// CSS and Assets

import menuIcon from "../assets/icons8-menu.svg";
import loadingGif from "../assets/Magnify@1x-1.8s-200px-200px.gif";
import "../styles/index.css";

// Types

export interface Data {
  name: string;
  payDate: Date;
  cellPhone?: number;
  expireDate: Date;
  email: string;
}

export interface userData {
  email: string;
  data: Data;
}

const AdminPanel: FC = () => {
  const navigate = useNavigate();

  const allUsers = useStore((state) => state.allUsers);
  const filteredUsers = useStore((state) => state.filteredUsers);
  const updateAllUsers = useStore((state) => state.updateUsers);
  const filterUsers = useStore((state) => state.filterUsers);

  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [filterInput, setFilterInput] = useState<string>("");

  const authAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/protected", {
        withCredentials: true,
      });
      if (response.data) {
        console.log("Authorized");

        const getResponse = await axios.get("http://localhost:3000/getUsers", {
          withCredentials: true,
        });

        if (getResponse.data) {
          updateAllUsers(getResponse.data);
        }
      } else {
        navigate("/error");
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleLogOut = async () => {
    const logOut = await axios.get("http://localhost:3000/logout", {
      withCredentials: true,
    });

    if (logOut) {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    authAdmin();
  }, []);

  useEffect(() => {
    try {
      const fUsers = allUsers.filter((user) =>
        user.data.name.includes(filterInput)
      );

      if (fUsers) {
        filterUsers(filteredUsers, fUsers);
      }
    } catch (error) {
      console.error("Error at filterUser");
    }
  }, [filterInput]);

  return (
    <div className="container-fluid layout ">
      <div
        className={`side-menu ${
          menuActive ? "active" : ""
        } d-flex row bg-black bg-gradient px-4`}
      >
        {/* Contenido del menú lateral */}
        <ul className="d-flex flex-column mt-5">
          <input
            className="input-group rounded-4 text-center mt-5 "
            placeholder="Nombres"
            onChange={(e) => setFilterInput(e.target.value)}
          />
          <button
            onClick={() => navigate("/addUser")}
            className="btn btn-md btn-success rounded-2 my-4 text-white fw-bold outline"
          >
            Agregar Usuario
          </button>
          <button
            onClick={handleLogOut}
            className="btn btn-md bg-danger rounded-2 my-4 text-white fw-bold"
          >
            Cerrar Sesión
          </button>
          <button
            className="btn btn-md bg-secondary rounded-2 my-4 text-white fw-bold"
            onClick={() => setMenuActive(!menuActive)}
          >
            Cerrar Menú
          </button>
        </ul>
      </div>
      <div className="row justify-content-center align-items-center ">
        <div className="z-3 sticky-top">
          <button
            className={`btn btn-secondary mt-4 btn-sm rounded-2 button-menu ${
              menuActive ? "active" : ""
            }`}
            onClick={() => setMenuActive(!menuActive)}
          >
            <img src={menuIcon} alt="ahre" className="w-50 h-50" />
          </button>
        </div>
        <div className="col-12">
          <div className="row justify-content-center align-items-center min-vh-100">
            {filteredUsers.length ? (
              filteredUsers.map((userState, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-4 my-4 ">
                  <div className="row justify-content-center align-items-center bg-black bg-gradient rounded-4 mx-2 my-1 p-4 ">
                    <ul className="text-center fw-bold text-white">
                      {userState.data.name}
                    </ul>
                    <ul className="text-center fw-bold text-white">
                      {userState.email}
                    </ul>
                    <button
                      className="btn btn-secondary fw-bold w-50 w-md-25"
                      onClick={() =>
                        navigate("/modifyUser", {
                          state: userState,
                        })
                      }
                    >
                      Modificar
                    </button>
                  </div>
                </div>
              ))
            ) : allUsers.length ? (
              allUsers.map((userState, index) => (
                <div key={index} className="col-12 col-sm-6 col-lg-4 my-4 ">
                  <div className="row justify-content-center align-items-center bg-black bg-gradient rounded-4 mx-2 my-1 p-4 ">
                    <ul className="text-center fw-bold text-white">
                      {userState.data.name}
                    </ul>
                    <ul className="text-center fw-bold text-white">
                      {userState.email}
                    </ul>
                    <button
                      className="btn btn-secondary fw-bold w-50 w-md-25"
                      onClick={() =>
                        navigate("/modifyUser", {
                          state: userState,
                        })
                      }
                    >
                      Modificar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="container text-center">
                <div className="row justify-content-center align-items-center">
                  <div className="col-8 col-md-6 col-lg-4 bg-black bg-gradient rounded-4 p-3">
                    <h1 className="text-white fw-bold">Cargando...</h1>
                    <img src={loadingGif} alt="jaj" className="w-25 h-25" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
