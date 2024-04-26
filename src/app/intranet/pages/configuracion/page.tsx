"use client";

import { useEffect, useState } from "react";
import { userServices } from "../../services/administration/users.service";
import Link from "next/link";
import ModalComponent from "../../componentes/mantenedores/modal";
import { IoWarningOutline } from "react-icons/io5";

export default function ConfiguracionPage() {
  // datosUsuario
  const [editId, setEditId] = useState(0);
  const [editNombre, setEditNombre] = useState("");
  const [editApePat, setEditApePat] = useState("");
  const [editApeMat, setEditApeMat] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [newEditEmail, setNewEditEmail] = useState("");
  const [editDocumento, setEditDocumento] = useState("");
  const [editIdPerfil, setEditIdPerfil] = useState("");
  const [editPerfil, setEditPerfil] = useState("");
  const [telefono, setTelefono] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [editIdDocumento, setIdDocumento] = useState("");
  const [estado, setEstado] = useState("0");
  const [editVcip, setEditVcip] = useState("");
  const [editTipoEmp, setEditTipoEmp] = useState("");
  const [editEmpresa, setEditEmpresa] = useState("");

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [aviso, setAviso] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showButton, setShowButton] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAviso(false);
  };

  const closeAviso = () => {
    setAviso(false);
    window.location.reload();
  };

  const upadtePassword = (e: any) => {
    e.preventDefault();
    openModal();
  };

  

  const getUsuario = async () => {
    const usuario = localStorage.getItem("userId");
    const userData = await userServices.getOne(usuario);
    const userInfo = userData.data;

    userInfo.map(
      (item: any) => (
        setEditId(item.iid_usuario),
        setEditNombre(item.vnombres),
        setEditApePat(item.vapellido_paterno),
        setEditApeMat(item.vapellido_materno),
        setEditEmail(item.vcorreo_electronico),
        setEditDocumento(item.vnro_documento),
        setEditPerfil(item.perfil.vdescripcion_perfil),
        setEditIdPerfil(item.perfil.iid_perfil),
        setEstado(item.iid_estado_registro),
        setTelefono(item.vnumero_telefonico),
        setIdDocumento(item.iid_tipo_documento),
        setEditVcip(item.vcip),
        setEditEmpresa(item.iid_empresa),
        setEditTipoEmp(item.itipo_empleado)
      )
    );

    console.log(userInfo);
  };

  useEffect(() => {
    getUsuario();
  }, []);

  useEffect(() => {
    if(newEditEmail.length > 0 && newEditEmail !== editEmail){ 
      setShowButton(true);
    } else if (newTelefono.length > 0 && newTelefono !== telefono) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [newEditEmail, newTelefono, editEmail, telefono]);

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    const email = newEditEmail.length > 1 ? newEditEmail : editEmail;
    const tel = newTelefono.length > 1 ? newTelefono : telefono;
    e.preventDefault();
    try {
      const res = await userServices.updateUsuario(editId, editNombre, editApePat, editApeMat, editDocumento, email, tel, editIdPerfil, editIdDocumento, editEmpresa, editTipoEmp, estado, editVcip);
      console.log(res.data.Message);
      setModalMessage(res.data.Message);
      setAviso(true);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <>
      <section className="px-4 md:px-20 flex justify-center">
        <div className="max-w-[900px] w-full h-auto py-4 m-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="bg-white border rounded-lg p-8 relative text-center lg:w-[500px] ">
                    <h1 className=" font-semibold text-center capitalize">Datos Generales </h1>
                    <br/>
                    <div className="text-left ">
                      <h2 className="font-semibold">Nombre : </h2> <p className="capitalize">{editNombre} {editApePat} {editApeMat}</p>
                      <h2 className="font-semibold">Documento: </h2> <p className="capitalize">{editDocumento}</p>
                      <h2 className="font-semibold">VCIP: </h2> <p>{editVcip}</p>
                      <h2 className="font-semibold">Perfil: </h2><p>{editPerfil}</p>
                    </div>
                    
                </div>
                <div className="bg-white border rounded-lg p-8 relative text-center lg:w-[800px]">
                    <h1 className=" font-semibold text-center capitalize">Actualizar Datos</h1>
                    <br />
                    <form onSubmit={updateUser}>
                      <div>
                        <div className="form-group text-left py-2">
                          <label className="text-left" htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            id="email"
                            
                            placeholder={editEmail ? editEmail : "Ingrese el email"}
                            onChange={(e) => setNewEditEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group text-left">
                          <label htmlFor="telefono">Celular</label>
                          <input
                            type="tel"
                            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            id="telefono"
                            
                            maxLength={9}
                            placeholder={telefono ? telefono : "Ingrese el teléfono"}
                            onChange={(e) => setNewTelefono(e.target.value)}
                          />
                        </div>
                        <br/>
                        <div className="form-group">
                          <Link
                            href=""
                            className="font-medium text-blue-600 hover:underline flex gap-1 items-center"
                            onClick={upadtePassword}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
                                fill="#0C3587"
                              />
                            </svg>
                            ¿Cambiar Contraseña?
                          </Link>
                        </div>
                        <br/>
                        <div className="text-end">
                          {showButton && <button
                            type="submit"
                            className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]"
                          >
                            Guardar
                          </button>}
                          {
                            aviso && 
                            <ModalComponent isOpen={aviso} closeModal={closeAviso} >
                              <div className="text-end">
                                <div
                                  className="cursor-pointer  rounded-full p-1"
                                  onClick={closeAviso}
                                >
                                  <svg
                                    className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex justify-center flex-col items-center max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
                                  <IoWarningOutline className="text-[#284488] h-28 w-28" />
                                  <div className="flex justify-center items-center mt-4">
                                      <h1>{modalMessage}</h1>
                                  </div>
                                  
                              </div>
                            </ModalComponent>
                          }
                        </div>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
        <div className="bg-white rounded-xl m-auto p-6 min-h-52 w-[400px]">
          <div className="flex justify-between">
            <div className="capitalize">
              <strong>Cambiar Contraseña</strong>
            </div>
            <div
              className="cursor-pointer  rounded-full p-1 "
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <hr />
          <br />
          <form>
            <div className="flex flex-col">
              <div className="py-2">
                <label
                  htmlFor="iorden"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Contraseña Actual
                </label>
                <input
                  required
                  type="password"
                  name="iorden"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  autoComplete="off"
                />
              </div>
              <div className="py-2">
                <label
                  htmlFor="iorden"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nueva Contraseña
                </label>
                <input
                  required
                  type="password"
                  name="iorden"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  autoComplete="off"
                />
              </div>
              <div className="py-2">
                <label
                  htmlFor="iorden"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirmar Contraseña
                </label>
                <input
                  required
                  type="password"
                  name="iorden"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  autoComplete="off"
                />
              </div>
              <br />
              <div className="text-end">
                <button
                  type="button"
                  className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalComponent>
    </>
  );
}
