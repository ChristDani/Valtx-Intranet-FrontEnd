"use client";

import LoaderTable from "@/app/intranet/componentes/mantenedores/loaderTable";
import ModalComponent from "@/app/intranet/componentes/mantenedores/modal";
import Paginacion from "@/app/intranet/componentes/mantenedores/paginacion";
import { TopTable } from "@/app/intranet/componentes/mantenedores/topTable";
import { optionsServices } from "@/app/intranet/services/administration/perfiles-opcion.service";
import { PerfilesService } from "@/app/intranet/services/administration/perfiles.service";
import { userServices } from "@/app/intranet/services/administration/users.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";

const UsersPage = () => {
  // busqueda
  const [searchTitle, setSearchTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // parametros
  const [statesList, setStatesList] = useState([]);

  // data
  const [dataList, setDataList] = useState([]);
  const [datInfo, setDataInfo] = useState<any>([]);
  const [datEmpresa, setDatEmpresa] = useState<any>([]);
  const [datTempleado, setDatTempleado] = useState<any>([]);

  // paginacion
  const [paginas, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagInicio, setPagInicio] = useState(1);
  const [pagFinal, setPagFinal] = useState(5);
  const [pagesToShow, setPagesToShow] = useState<number[]>([]);
  const [itemsPorPagina, setItems] = useState(10);

  // obtener la ruta
  const pathName = usePathname();
  const [pathFinal, setPathFinal] = useState("");

  // modal
  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    resetPassword: false,
  });

  //modal de aviso
  const [aviso, setAviso] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeAviso = () => {
    setAviso(false);
  };

  //Perfil
  const [listPerfil, setListPerfil] = useState<any[]>([]);

  //Documentos
  const [documentList, setDocumentList] = useState<any[]>([]);
  //Loader
  const [loader, setLoader] = useState(true);
  // edición
  const [editId, setEditId] = useState(0);
  const [editNombre, setEditNombre] = useState("");
  const [editApePat, setEditApePat] = useState("");
  const [editApeMat, setEditApeMat] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDocumento, setEditDocumento] = useState("");
  const [editIdPerfil, setEditIdPerfil] = useState("");
  const [editPerfil, setEditPerfil] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editIdDocumento, setIdDocumento] = useState("");
  const [estado, setEstado] = useState("3");
  const [editVcip, setEditVcip] = useState("");
  const [editTipoEmp, setEditTipoEmp] = useState("20");
  const [editEmpresa, setEditEmpresa] = useState("22");

  // obtener opciones por usuario
  const [optionUser, setOptionUser] = useState({
    visualizar: false,
    crear: false,
    editar: false,
    eliminar: false,
  });

  const getOptionsUser = async (id: any, path: string) => {
    const resul = path.split("/");
    const finalPath = resul[resul.length - 1];
    const pathResul = "/" + finalPath;

    const datos = await optionsServices.getPerfilOpcionId(id);
    const listOptionsId = datos.data;
    const options = listOptionsId.find(
      (objeto: any) => objeto.vurl === pathResul
    );

    if (options) {
      setOptionUser({
        visualizar: options.ivisualizar,
        crear: options.icrear,
        editar: options.iactualizar,
        eliminar: options.ieliminar,
      });
    }
  };

  const obtenerPath = () => {
    const resul = pathName.split("/");
    setPathFinal(resul[resul.length - 1]);
    return pathFinal;
  };
  useEffect(() => {
    // obtener opciones de usuario
    
    const perfilId:string = secureLocalStorage.getItem("perfil")?.toString() || ''; 
    getData(currentPage, itemsPorPagina, searchTitle);
    obtenerPath();
    getStates();
    getListPerfil();
    getDocuments();
    getOptionsUser(perfilId, pathName);
    gettipoEmpleado();
    getempresa();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchData = (e: any) => {
    const title = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(\..*)\./g, "$1");
    setSearchTitle(title);
    getData(1, itemsPorPagina, title);
  };

  const getListPerfil = async () => {
    const { data } = await PerfilesService.getList(1, 10, "", "", -1);
    setListPerfil(data);
  };

  const getStates = async () => {
    const { data } = await parametrosServices.getStates();
    setStatesList(data);
  };

  const getDocuments = async () => {
    const { data } = await parametrosServices.getDocumentsTypes();
    setDocumentList(data);
  };
  const gettipoEmpleado = async () => {
    const { data } = await parametrosServices.getEmployesTypes();
    setDatTempleado(data);
  };

  const getempresa = async () => {
    const { data } = await parametrosServices.getEnterprises();
    setDatEmpresa(data);
  };
  const getData = async (page: number, items: number, titulo: string) => {
    setCurrentPage(page);
    setItems(items);
    const itemsList: any = await userServices.getList(
      page,
      items,
      "",
      "",
      titulo,
      -1,
      -1,
      -1
    );

    setDataInfo(itemsList);
    setDataList(itemsList.data);
    const pages =
      Math.ceil(itemsList.TotalRecords / items) != 0
        ? Math.ceil(itemsList.TotalRecords / items)
        : 1;
    setPages(pages);
    iniciarPaginacion(page, pages);
    setLoader(false);
  };

  const getOneItem = async (id: number) => {
    const onlyOneItem = await userServices.getOne(id);
    
    
    const edittttt = onlyOneItem.data;
    
    edittttt.map(
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
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const createItem = async (e: any) => {
    e.preventDefault();
    setModalState({
      create: true,
      update: false,
      delete: false,
      resetPassword: false,
    });
    openModal();
  };

  const itemDetails = (e: any, id: number) => {
    e.preventDefault();
    openModal();
    getOneItem(id);
  };

  const editItem = (e: any, id: number) => {
    e.preventDefault();
    setModalState({
      create: false,
      update: true,
      delete: false,
      resetPassword: false,
    });
    openModal();
    getOneItem(id);
  };

  const deleteItem = async (e: any, id: number) => {
    e.preventDefault();
    setModalState({
      create: false,
      update: false,
      delete: true,
      resetPassword: false,
    });
    getOneItem(id);
    openModal();
  };

  const resetPassword = (e: any) => {
    e.preventDefault();
    setModalState({
      create: false,
      update: false,
      delete: false,
      resetPassword: true,
    });
  };

  const cancelResetPassword = (e: any) => {
    e.preventDefault();
    setModalState({
      create: false,
      update: true,
      delete: false,
      resetPassword: false,
    });
  };

  const resetearPassword = async (e: any, id: number) => {
    e.preventDefault();
    const res = await userServices.resetPassword(id);
    setModalState({
      create: false,
      update: true,
      delete: false,
      resetPassword: false,
    });
  };

  const iniciarPaginacion = (page: number, pages: number) => {
    setPagInicio(1);
    let starPage = 1;

    if (page - 3 > 1) {
      setPagInicio(page - 2);
      starPage = page - 2;
    }

    setPagFinal(starPage + 4);
    let finishPage = starPage + 4;

    if (starPage + 4 > pages) {
      setPagFinal(pages);
      finishPage = pages;
    }

    let list = [];
    setPagesToShow([]);
    for (let i = starPage; i <= finishPage; i++) {
      list.push(i);
    }
    setPagesToShow(list);
  };

  const previusPage = (page: number) => {
    setCurrentPage(page);
    getData(page, itemsPorPagina, searchTitle);
  };

  const nextPage = (page: number) => {
    setCurrentPage(page);
    getData(page, itemsPorPagina, searchTitle);
  };

  const closeModal = () => {
    cleanData();
    setModalState({
      create: false,
      update: false,
      delete: false,
      resetPassword: false,
    });
    setModalIsOpen(false);
  };

  const confirmOp = async (e: any) => {
    e.preventDefault();
    if (modalState.create) {
        try {

          if ( editIdDocumento === "") {
            setModalMessage("Debe seleccionar un tipo de documento");
            setAviso(true);
            return;
          } else if (editIdPerfil === "") {
            setModalMessage("Debe seleccionar un perfil");
            setAviso(true);
            return;
          } else {
            const res = await userServices.setUsuario(
              editId,
              editNombre,
              editApePat,
              editApeMat,
              editDocumento,
              editEmail,
              telefono,
              editIdPerfil,
              editIdDocumento,
              editEmpresa,
              editTipoEmp,
              estado,
              editVcip
            );
            if (!res.data.IsSuccess) {
              setAviso(true);
              setModalMessage(res.data.Message);
              return;
            }
          }
        
      } catch (error) {
        console.log(error);
      }
    } else if (modalState.update) {
      try {
        const res = await userServices.updateUsuario(
          editId,
          editNombre,
          editApePat,
          editApeMat,
          editDocumento,
          editEmail,
          telefono,
          editIdPerfil,
          editIdDocumento,
          editEmpresa,
          editTipoEmp,
          estado,
          editVcip
        );
        if (!res.data.IsSuccess) {
          setAviso(true);
          setModalMessage(res.data.Message);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else if (modalState.delete) {
      const res = await userServices.deletUsuario(editId);
    } else {
      alert("detalles");
    }
    getData(1, itemsPorPagina, searchTitle);
    closeModal();
  };

  const cleanData = () => {
    setEditId(0);
    setEditNombre("");
    setEditApePat("");
    setEditApeMat("");
    setEditDocumento("");
    setEditEmail("");
    setEditIdPerfil("0");
    setEditPerfil("");
    setTelefono("");
    setEditIdPerfil("");
    setIdDocumento("0");
    setEstado("3");
    setEditEmpresa("22");
    setEditTipoEmp("20");
    setEditVcip("");
  };

  const validarTel = (e: any) => {
    e.value = e.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
    setTelefono(e.value);
  };

  const validarDoc = (e: any) => {
    editIdDocumento == "1" && (e.value = e.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1"));
    setEditDocumento(e.value);
  };

  const capitalize = (text: String) => {
    const first = text.charAt(0);
    const rest = text.slice(1).toLowerCase();
    return first + rest;
  };
  const onlyNumber = (e: any) => {
    const vcip = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(\..*)\./g, "$1");
    setEditVcip(vcip);
  };

  return (
    <>
      {
        loader ? <LoaderTable /> : (
      <div>
      <TopTable
          title="Buscar por documento"
          search={searchTitle}
          searchData={searchData}
          createItem ={createItem}
          crear={optionUser.crear}
          />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Nombre Completo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Correo Electrónico
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Documento
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Perfil
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {datInfo.IsSuccess
              ? dataList.map((item: any) => (
                  <tr
                    key={item.iid_usuario}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-center capitalize">
                      {item.vnombres}
                    </td>
                    <td className="px-6 py-4 text-center lowercase">
                      {item.vcorreo_electronico}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.vnumero_telefonico}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.vnro_documento}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.vdescripcion_perfil}
                    </td>
                    <td>
                      {statesList.map((state: any) => (
                        <div key={state.iid_tabla_detalle}>
                          {state.iid_tabla_detalle ==
                          item.iid_estado_registro ? (
                            <div
                              className={`flex items-center justify-center  font-bold min-w-24 h-10 rounded-xl ${
                                state.vvalor_texto_corto === "ACTIVO"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-rose-200 text-rose-800"
                              }`}
                            >
                              {state.vvalor_texto_corto != null
                                ? capitalize(state.vvalor_texto_corto)
                                : "Sin estado"}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </td>
                    <td className="flex gap-4 items-center justify-center my-auto px-6 h-28">
                      {optionUser.visualizar && (
                        <Link
                          href=""
                          className="font-medium text-blue-600 hover:underline"
                          onClick={(e) => itemDetails(e, item.iid_usuario)}
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
                        </Link>
                      )}
                      {optionUser.editar && (
                        <Link
                          href=""
                          className="font-medium text-blue-600 hover:underline"
                          onClick={(e) => editItem(e, item.iid_usuario)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_191_168)">
                              <path
                                d="M2.81326 15.4667L1.54659 20.9333C1.50289 21.1332 1.50439 21.3403 1.55097 21.5394C1.59756 21.7386 1.68805 21.9249 1.81583 22.0846C1.94362 22.2444 2.10547 22.3735 2.28957 22.4627C2.47368 22.5519 2.67537 22.5988 2.87992 22.6C2.97524 22.6096 3.07128 22.6096 3.16659 22.6L8.66659 21.3334L19.2266 10.8133L13.3333 4.93335L2.81326 15.4667Z"
                                fill="#31BAFF"
                              />
                              <path
                                d="M22.5466 5.54667L18.6133 1.61333C18.3547 1.35604 18.0048 1.21161 17.64 1.21161C17.2752 1.21161 16.9252 1.35604 16.6666 1.61333L14.48 3.8L20.3666 9.68667L22.5533 7.5C22.6813 7.37139 22.7826 7.2188 22.8516 7.05098C22.9205 6.88315 22.9557 6.70338 22.955 6.52195C22.9544 6.34052 22.918 6.161 22.848 5.99365C22.7779 5.82629 22.6755 5.6744 22.5466 5.54667Z"
                                fill="#31BAFF"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_191_168">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      )}
                      {optionUser.eliminar && (
                        <Link
                          href=""
                          className="font-medium text-blue-600 hover:underline"
                          onClick={(e) => deleteItem(e, item.iid_usuario)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_191_172)">
                              <path
                                d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z"
                                fill="#EA5065"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_191_172">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              : null
            }
          </tbody>
        </table>
      </div>
      </div>
        )
      }
      {/* paginacion */}

      {/*<Paginacion pagInicio={pagInicio} currentPage={currentPage} pagFinal={pagFinal} totalPages={paginas} previusPage={previusPage(currentPage - 1)} nextPage={nextPage(currentPage + 1)} getdata={getData(1, itemsPorPagina, searchTitle)} pagesToShow={pagesToShow}></Paginacion>*/}

      {paginas > 1 ? (
        <nav className="flex justify-end mt-3 w-full">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            {currentPage != pagInicio ? (
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => previusPage(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </Link>
              </li>
            ) : (
              <span></span>
            )}
            {pagInicio > 2 ? (
              <>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => getData(1, itemsPorPagina, searchTitle)}
                  >
                    1
                  </Link>
                </li>
                <li>
                  <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-block">
                    ...
                  </span>
                </li>
              </>
            ) : (
              <span></span>
            )}
            {pagesToShow.map((item, key) =>
              currentPage == item ? (
                <li key={key}>
                  <Link
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  >
                    {item}
                  </Link>
                </li>
              ) : (
                <li key={key}>
                  <Link
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => getData(item, itemsPorPagina, searchTitle)}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
            {pagFinal < paginas - 1 ? (
              <>
                <li>
                  <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    ...
                  </span>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() =>
                      getData(paginas, itemsPorPagina, searchTitle)
                    }
                  >
                    {paginas}
                  </Link>
                </li>
              </>
            ) : (
              <span></span>
            )}
            {currentPage != pagFinal ? (
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => nextPage(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </Link>
              </li>
            ) : (
              <span></span>
            )}
          </ul>
        </nav>
      ) : (
        <span></span>
      )}

      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
        <div
          className={`bg-white rounded-xl m-auto p-6 min-h-52 ${
            modalState.create || modalState.update
              ? "w-[700px]"
              : modalState.delete
              ? "w-[500px]"
              : "w-[600px]"
          }`}
        >
          <div className="flex justify-between">
            <div className="capitalize">
              Mantenedores › {pathFinal} ›{" "}
              <strong>
                {modalState.create
                  ? "Agregar"
                  : modalState.update
                  ? "Actualizar"
                  : modalState.delete
                  ? "Eliminar"
                  : modalState.resetPassword
                  ? "Reinicio de clave"
                  : "Detalles"}
              </strong>
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
          {modalState.create || modalState.update ? (
            <form onSubmit={confirmOp} className="mt-5">
              <div className="mb-5 hidden">
                <label htmlFor="idItem">ID</label>
                <input type="text" name="idItem" defaultValue={editId}></input>
              </div>
              <div className="mb-5 flex gap-2">
                <div className="flex-auto relative w-10">
                  <label
                    htmlFor="iorden"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Nombre
                  </label>
                  <input
                    required
                    type="text"
                    name="iorden"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editNombre}
                    onInput={(e: any) => setEditNombre(e.target.value)}
                  ></input>
                </div>
                {/* <div className="flex-auto relative w-14">
                  <label
                    htmlFor="vtitulo"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Apellido Paterno
                  </label>
                  <input
                    required
                    type="text"
                    name="vtitulo"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editApePat}
                    onInput={(e: any) => setEditApePat(e.target.value)}
                  ></input>
                </div>
                <div className="flex-auto relative w-14">
                  <label
                    htmlFor="vtitulo"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Apellido Materno
                  </label>
                  <input
                    required
                    type="text"
                    name="vtitulo"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editApeMat}
                    onInput={(e: any) => setEditApeMat(e.target.value)}
                  ></input>
                </div> */}
              </div>
              <div className="mb-5 flex gap-2 justify-between">
                <div className="relative">
                  <label
                    htmlFor="stateItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Tipo Documento
                  </label>
                  <select
                    id="stateItem"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2"
                    onChange={(e) => setIdDocumento(e.target.value)}
                    value={editIdDocumento}
                  >
                    <option hidden key="0" value="0">
                        Seleccione
                      </option>
                      {
                      documentList.map((document: any) =>(
                          <option
                            key={document.iid_tabla_detalle}
                            value={document.iid_tabla_detalle}
                            
                          >
                            {capitalize(document.vvalor_texto_corto)}
                          </option>
                      )) 
                    }
                  </select>
                </div>
                <div className={ editIdDocumento != "" ? "flex-auto relative w-20" : "hidden"}>
                  <label
                    htmlFor="iorden"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Documento
                  </label>
                  <input
                    required
                    type="text"
                    name="iorden"
                    maxLength={editIdDocumento == "1" ? 8 : 10}
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editDocumento}
                    onInput={(e: any) => validarDoc(e.target)}
                  ></input>
                </div>
                <div className="flex-auto relative w-20">
                  <label
                    htmlFor="iorden"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Telefono
                  </label>
                  <input
                    type="text"
                    name="iorden"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={telefono}
                    onInput={(e: any) => validarTel(e.target)}
                    maxLength={9}
                  ></input>
                </div>
              </div>
              <div className="mb-5 flex gap-2 ">
                <div className="flex-auto w-44 relative">
                  <label
                    htmlFor="iorden"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="iorden"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editEmail}
                    onInput={(e: any) => setEditEmail(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="mb-5 flex gap-2">
                <div className="flex-auto relative w-10">
                  <label
                    htmlFor="vcip"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    VCIP
                  </label>
                  <input
                    required
                    type="text"
                    name="vcip"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editVcip}
                    minLength={0}
                    maxLength={9}
                    onInput={(e: any) => onlyNumber(e)}
                  ></input>
                </div>
                <div className="flex-auto relative w-14">
                  <label
                    htmlFor="emplItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Tipo de Empleado:
                  </label>
                  <select
                    id="emplItem"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                    onChange={(e) => setEditTipoEmp(e.target.value)}
                    value={editTipoEmp}
                    required
                  >
                    
                    <option hidden key="0" value="0">
                        Seleccione
                      </option>
                    {
                      datTempleado.map((item: any) => (
                          <option
                            key={item.iid_tabla_detalle}
                            value={item.iid_tabla_detalle}
                           
                          >
                            {capitalize(item.vvalor_texto_corto)}
                          </option>
                        ) 
                      )
                    }
                  </select>
                </div>
                <div className="flex-auto relative w-14">
                  <label
                    htmlFor="empItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Empresa
                  </label>
                  <select
                    id="empItem"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                    onChange={(e) => setEditEmpresa(e.target.value)}
                    value={editEmpresa}
                  >
                    <option hidden key="0" value="0">
                        Seleccione
                      </option>
                    {
                      datEmpresa.map((item: any) =>(
                          <option
                            key={item.iid_tabla_detalle}
                            value={item.iid_tabla_detalle}
                            
                          >
                            {capitalize(item.vvalor_texto_corto)}
                          </option>
                      )
                      )
                    }
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="mb-5 relative">
                  <label
                    htmlFor="stateItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Perfil
                  </label>
                  <select
                    id="stateItem"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2"
                    onChange={(e) => setEditIdPerfil(e.target.value)}
                    value={editIdPerfil}
                  >
                    
                    <option hidden value="0" key="0">
                        Seleccione
                      </option>
                    {
                      listPerfil.map((item: any) =>(
                          <option
                            key={item.iid_perfil}
                            value={item.iid_perfil}
                            
                          >
                            {capitalize(item.vnombre_perfil)}
                          </option>
                        ) 
                    )}
                  </select>
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="stateItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Estado
                  </label>
                  <select
                    id="stateItem"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2"
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado} // Usar la prop value para controlar la opción seleccionada
                  >
                    <option hidden key="0" value="0">
                        Seleccione
                      </option>
                    {
                      statesList.map((state: any) => (
                          <option
                            key={state.iid_tabla_detalle}
                            value={state.iid_tabla_detalle}
                            
                          >
                            {capitalize(state.vvalor_texto_corto)}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
              <div className="text-right">
                {/* {modalState.update && (
                  <button
                    type="button"
                    className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white"
                    onClick={(e) => resetPassword(e)}
                  >
                    Reiniciar Contraseña
                  </button>
                )} */}
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
                  Guardar
                </button>
              </div>
            </form>
          ) : modalState.delete ? (
            <div className="mt-5">
              <h1>¿Está seguro que desea eliminar este elemento?</h1>
              <p>- {`${editNombre}`}</p>
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
                  onClick={confirmOp}
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : modalState.resetPassword ? (
            <div className="mt-5">
              <h1>¿Está seguro que desea reiniciar la clave del usuario?</h1>
              <p>- {`${editApePat} ${editApeMat} ${editNombre}`}</p>
              <br />
              <div className="text-end">
                <button
                  type="button"
                  className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white"
                  onClick={cancelResetPassword}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]"
                  onClick={(e: any) => {
                    resetearPassword(e, editId);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            <>
              <hr />
              <div className="px-5 py-3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{`${editNombre}`}</h5>
                <p className="mb-1 font-normal text-gray-700">
                  Documento: {editDocumento}
                </p>
                <p className="mb-1 font-normal text-gray-700">
                  Email: {editEmail}
                </p>
                <p className="mb-1 font-normal text-gray-700">
                  Perfil: {capitalize(editPerfil)}
                </p>

                <p className="mb-1 font-normal text-gray-700">
                  VCIP: {editVcip}
                </p>
                <p className="mb-1 font-normal text-gray-700">
                  Tipo de empleado:{" "}
                  {
                    datTempleado?.find(
                      (obj: any) => obj.iid_tabla_detalle == editTipoEmp
                    )?.vvalor_texto_corto
                  }
                </p>
                <p className="mb-1 font-normal text-gray-700">
                  Empresa:{" "}
                  {
                    datEmpresa?.find(
                      (obj: any) => obj.iid_tabla_detalle == editEmpresa
                    )?.vvalor_texto_corto
                  }
                </p>
                <div className="mb-1 font-normal text-gray-700">
                  Estado:{" "}
                  {statesList.map((state: any) => (
                    <div key={state.iid_tabla_detalle}>
                      {state.iid_tabla_detalle == estado
                        ? state.vvalor_texto_corto != null
                          ? capitalize(state.vvalor_texto_corto)
                          : "Sin estado"
                        : ""}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ModalComponent>
      {aviso && (
        <ModalComponent isOpen={aviso} closeModal={closeAviso}>
          <div className="bg-white rounded-xl m-auto p-2 min-h-52 w-60">
            <div className="flex justify-end">
              <div
                className="cursor-pointer  rounded-full p-1 "
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
            <div className="flex flex-col items-center w-full">
              <IoWarningOutline className="text-yellow-500 h-28 w-28" />
              <div className="text-center">{modalMessage}</div>
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default UsersPage;
