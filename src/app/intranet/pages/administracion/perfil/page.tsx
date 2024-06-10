"use client";

import ModalComponent from "@/app/intranet/componentes/mantenedores/modal";
import { TopTable } from "@/app/intranet/componentes/mantenedores/topTable";
import { optionsServices } from "@/app/intranet/services/administration/perfiles-opcion.service";
import { PerfilesService } from "@/app/intranet/services/administration/perfiles.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";

const ProfilesPage = () => {
  // obtener la ruta
  const pathName = usePathname();
  const [pathFinal, setPathFinal] = useState("");



  // obtener opciones por usuario
  const [optionUser, setOptionUser] = useState({
    visualizar: false,
    crear: false,
    editar: false,
    eliminar: false,
  });

  const [optionsChange, setOptionChange] = useState(false);

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

  //manejo de opciones
  const [select, setSelect] = useState<any[]>([]);
  const [optionId, setOptionId] = useState<any[]>([]);
  const [newOptions, setNewOptions] = useState<any[]>([]);

  // parametros
  const [statesList, setStatesList] = useState([]);

  // busqueda
  const [searchTitle, setSearchTitle] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // data perfil
  const [dataInfo, setDataInfo] = useState<any>([]);
  const [dataList, setDataList] = useState([]);

  // data options
  const [optionInfo, setOptionInfo] = useState<any>([]);
  const [optionList, setOptionList] = useState([]);

  // edición
  const [editId, setEditId] = useState("0");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editState, setEditState] = useState("3");

  // paginacion
  const [paginas, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagInicio, setPagInicio] = useState(1);
  const [pagFinal, setPagFinal] = useState(5);
  const [pagesToShow, setPagesToShow] = useState<number[]>([]);
  const [itemsPorPagina, setItems] = useState(10);

  // modal
  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
  });

  //modal de aviso
  const [aviso, setAviso] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const closeAviso = () => {
    setAviso(false);
  };

  const obtenerPath = () => {
    const resul = pathName.split("/");
    setPathFinal(resul[resul.length - 1]);
    return pathFinal;
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

  const searchData = (e: any) => {
    const title = e.target.value;
    setSearchTitle(title);
    getData(1, itemsPorPagina, title);
  };

  useEffect(() => {
    // obtener opciones de usuario
    const perfilId: string = secureLocalStorage.getItem("perfil")?.toString() || '';
    getData(currentPage, itemsPorPagina, searchTitle);
    getOptionsData();
    obtenerPath();
    getStates();
    getOptionsUser(perfilId, pathName);
  }, []);

  const getStates = async () => {
    const { data } = await parametrosServices.getStates();
    setStatesList(data);
  };

  const getData = async (page: number, items: number, titulo: string) => {
    setCurrentPage(page);
    setItems(items);

    const itemsList: any = await PerfilesService.getList(
      page,
      items,
      titulo,
      "",
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
  };

  const getOptionsData = async () => {
    const options: any = await optionsServices.getList(1, 20);
    setOptionInfo(options);
    setOptionList(options.data);
  };

  const getOneItem = async (id: any) => {
    const onlyOneItem = await PerfilesService.getPerfilById(id);

    const data = onlyOneItem.data;

    data.map(
      (item: any) => (
        setEditId(item.iid_perfil),
        setEditTitle(item.vnombre_perfil),
        setEditDesc(item.vdescripcion_perfil),
        setEditState(item.iid_estado_registro)
      )
    );
  };

  const previusPage = (page: number) => {
    setCurrentPage(page);
    getData(page, itemsPorPagina, searchTitle);
  };

  const nextPage = (page: number) => {
    setCurrentPage(page);
    getData(page, itemsPorPagina, searchTitle);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const createItem = async (e: any) => {
    e.preventDefault();
    setModalState({ create: true, update: false, delete: false });
    openModal();
  };

  const itemDetails = (e: any, id: any) => {
    e.preventDefault();
    openModal();
    getOneItem(id);
    getOneOptionList(id);
  };

  const editItem = (e: any, id: any) => {
    e.preventDefault();
    setModalState({ create: false, update: true, delete: false });
    openModal();
    getOneItem(id);
    getOneOptionList(id);
  };

  const deleteItem = async (e: any, id: any) => {
    e.preventDefault();
    setModalState({ create: false, update: false, delete: true });
    getOneItem(id);
    openModal();
  };

  const cleanData = () => {
    setEditId("0");
    setEditTitle("");
    setEditDesc("");
    setEditState("3");
    setSelect([]);
    setOptionId([]);
    setNewOptions([]);
    setOptionChange(false);
  };

  const confirmOp = async (e: any) => {
    e.preventDefault();

    if (modalState.create) {
      if (optionsChange) {
        const datos = await PerfilesService.create(
          editTitle,
          editDesc,
          editId,
          editState
        );
        rellenarId(datos.data.Codigo);
        const data = await optionsServices.setPefilOptions(select);
        closeModal();
      } else {
        setModalMessage('No hay cambios en lista de opciones');
        setAviso(true);
      }

    } else if (modalState.update) {

      await PerfilesService.update(editTitle, editDesc, editId, editState);
      const data = await optionsServices.setPefilOptions(newOptions);
      closeModal();

    } else if (modalState.delete) {
      await PerfilesService.delete(editId);
      closeModal();
    } else {
    }
    getData(currentPage, itemsPorPagina, searchTitle);
  };

  const closeModal = () => {
    cleanData();
    setModalState({ create: false, update: false, delete: false });
    setModalIsOpen(false);
  };

  const capitalize = (text: String) => {
    const first = text.charAt(0);
    const rest = text.slice(1).toLowerCase();
    return first + rest;
  };

  const rellenarId = (id: any) => {
    // Copia del array select
    let updatedSelect = select.slice();

    updatedSelect.forEach((obj) => {
      obj.iid_perfil = id;
    });
    setSelect(updatedSelect);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    setOptionChange(true);
    const { name, checked } = e.target;
    let valor = checked ? 1 : 0;

    // Copia del array select
    let updatedSelect = select.slice();

    // Buscar si el item ya existe en el array
    let existingItemIndex = updatedSelect.findIndex(
      (item) => item.iid_opcion === id
    );

    // Si el item existe, agregar el valor al array
    if (existingItemIndex !== -1) {
      updatedSelect[existingItemIndex][name] = valor;
    } else {
      // Si el item no existe, agregarlo al array
      updatedSelect.push({
        iid_perfil_opcion: 0,
        iid_opcion: id,
        [name]: valor,
      });
    }

    // Actualizar el estado select con el nuevo array
    setSelect(updatedSelect);
  };

  const getOneOptionList = async (id: any) => {
    const datos = await optionsServices.getPerfilOpcionId(id);
    const listOptionsId = datos.data;
    setOptionId(listOptionsId);
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) => {
    setOptionChange(true);
    const { name, checked, value } = e.target;
    let valor = checked ? 1 : 0;

    // Copia del array select
    let updatedItems = optionId.slice();

    // Buscar si el item ya existe en el array
    let existingItemIndex = updatedItems.findIndex(
      (item) => item.iid_opcion === id
    );

    // Si el item existe, agregar el valor al array
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex][name] = checked;
      updatedItems[existingItemIndex][value] = valor;
    }

    // Actualizar el estado con los nuevos valores
    setOptionId(updatedItems);

    const newId = editId;

    // Copia del array select
    let newListOptions = optionId.slice();

    const newCopyOptions = newListOptions.map((item) => ({
      iid_perfil_opcion: item.iid_perfil_opcion ? item.iid_perfil_opcion : 0,
      iid_perfil: newId,
      iid_opcion: item.iid_opcion,
      iacceso_crear: item.icrear ? 1 : 0,
      iacceso_visualizar: item.ivisualizar ? 1 : 0,
      iacceso_actualizar: item.iactualizar ? 1 : 0,
      iacceso_eliminar: item.ieliminar ? 1 : 0,
    }));

    // Actualizar el estado con los nuevos valores
    setNewOptions(newCopyOptions);
  };

  return (
    <>
      <TopTable
        title="Buscar por perfil"
        search={searchTitle}
        searchData={searchData}
        createItem={createItem}
        crear={optionUser.crear}
      />
      {/* tabla */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Perfil
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Descripción
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
            {/* Replace the following <tr> elements with your actual product data */}
            {dataInfo.IsSuccess ? (
              dataList.map((item: any) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50"
                  key={item.iid_perfil}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap"
                  >
                    {capitalize(item.vnombre_perfil)}
                  </th>
                  <th scope="row" className="px-6 py-4 text-center ">
                    {capitalize(item.vdescripcion_perfil)}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    {statesList.map((state: any) => (
                      <div key={state.iid_tabla_detalle}>
                        {state.iid_tabla_detalle == item.iid_estado_registro ? (
                          <div
                            className={`flex items-center justify-center  font-bold min-w-24 h-10 rounded-xl ${state.vvalor_texto_corto === "ACTIVO"
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
                  </th>
                  <td className="flex gap-4 items-center justify-center my-auto px-6 h-28">
                    {optionUser.visualizar && (
                      <Link
                        href=""
                        className="font-medium text-blue-600 hover:underline"
                        onClick={(e) => itemDetails(e, item.iid_perfil)}
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
                    {optionUser.editar ? (
                      <Link
                        href=""
                        className="font-medium text-blue-600 hover:underline"
                        onClick={(e) => editItem(e, item.iid_perfil)}
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
                    ) : (
                      ""
                    )}
                    {optionUser.eliminar ? (
                      <Link
                        href=""
                        className="font-medium text-blue-600 hover:underline"
                        onClick={(e) => deleteItem(e, item.iid_perfil)}
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
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  colSpan={4}
                  className="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  Lo sentimos, aún no se han registrado datos!
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* paginacion */}

      {/* <Paginacion pagInicio={pagInicio} currentPage={currentPage} pagFinal={pagFinal} totalPages={paginas} previusPage={previusPage(currentPage - 1)} nextPage={nextPage(currentPage + 1)} getdata={getData(1, itemsPorPagina, searchTitle)} pagesToShow={pagesToShow}></Paginacion> */}

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
      {/* modal */}
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
        <div
          className={`bg-white rounded-xl m-auto p-6 min-h-52 ${modalState.create || modalState.update
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
              <div className="mb-5 flex flex-grow gap-2">
                <div className="flex-auto w-1/3 relative">
                  <label
                    htmlFor="vtitulo"
                    className="absolute left-2 px-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Título
                  </label>
                  <input
                    required
                    type="text"
                    name="vtitulo"
                    className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2"
                    value={editTitle}
                    onInput={(e: any) => setEditTitle(e.target.value)}
                  ></input>
                </div>
                <div className="mb-5 relative w-1/3 ">
                  <label
                    htmlFor="vtextobreve"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Descripción
                  </label>
                  <input
                    required
                    type="text"
                    name="vtextobreve"
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
                    value={editDesc}
                    onInput={(e: any) => setEditDesc(e.target.value)}
                  />
                </div>
                <div className="mb-5 relative w-1/3">
                  <label
                    htmlFor="stateItem"
                    className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs"
                  >
                    Estado
                  </label>
                  <select
                    id="stateItem"
                    className="bg-gray-50 border border-gray-300 w-full rounded-lg p-2"
                    onChange={(e) => setEditState(e.target.value)}
                    value={editState} // Usar la prop value para controlar la opción seleccionada
                  >
                    {modalState.update ? (
                      statesList.map((state: any) =>
                        state.iid_tabla_detalle === state ? (
                          <option
                            key={state.iid_tabla_detalle}
                            value={state.iid_tabla_detalle}
                          >
                            {capitalize(state.vvalor_texto_corto)}
                          </option>
                        ) : null
                      )
                    ) : (
                      <option hidden key="0" value="0">
                        Seleccione
                      </option>
                    )}

                    {statesList.map((state: any) => (
                      <option
                        key={state.iid_tabla_detalle}
                        value={state.iid_tabla_detalle}
                      >
                        {capitalize(state.vvalor_texto_corto)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="table-auto bg-gray-50 w-full ">
                  <thead>
                    <tr className="bg-gray-300">
                      <th className="p-4 border">Módulo</th>
                      <th className="p-4 border">Opción del Sistema</th>
                      <th className="p-4 border">Ver</th>
                      <th className="p-4 border">Crear</th>
                      <th className="p-4 border">Editar</th>
                      <th className="p-4 border">Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalState.create
                      ? optionInfo.IsSuccess
                        ? optionList.map((item: any) => (
                          <tr
                            key={item.iid_opcion}
                            className="bg-gray-100 hover:bg-gray-50"
                          >
                            <th className="text-start border-2">
                              {item.vtitulo_modulo}
                            </th>
                            <td className="text-start border-2">
                              {item.vtitulo}
                            </td>
                            <td className="border-b-2">
                              <label>
                                <input
                                  type="checkbox"
                                  name="iacceso_visualizar"
                                  className=""
                                  value={item.ivisualizar}
                                  onChange={(e) =>
                                    handleChange(e, item.iid_opcion)
                                  }
                                />
                                Ver
                              </label>
                            </td>
                            <td className="border-2">
                              <label>
                                <input
                                  type="checkbox"
                                  name="iacceso_crear"
                                  className=""
                                  value={item.icrear}
                                  onChange={(e) =>
                                    handleChange(e, item.iid_opcion)
                                  }
                                />
                                Crear
                              </label>
                            </td>
                            <td className="border-2">
                              <label>
                                <input
                                  type="checkbox"
                                  name="iacceso_actualizar"
                                  className=""
                                  value={item.iactualizar}
                                  onChange={(e) =>
                                    handleChange(e, item.iid_opcion)
                                  }
                                />
                                Editar
                              </label>
                            </td>
                            <td className="border-2">
                              <label>
                                <input
                                  type="checkbox"
                                  name="iacceso_eliminar"
                                  className=""
                                  value={item.ieliminar}
                                  onChange={(e) =>
                                    handleChange(e, item.iid_opcion)
                                  }
                                />
                                Eliminar
                              </label>
                            </td>
                          </tr>
                        ))
                        : ""
                      : optionId.map((item: any) => (
                        <tr
                          key={item.iid_opcion}
                          className="bg-gray-100 hover:bg-gray-50"
                        >
                          <th>{item.vtitulo_modulo}</th>
                          <td>{item.vtitulo}</td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                name="ivisualizar"
                                value="iacceso_visualizar"
                                defaultChecked={item.ivisualizar}
                                onChange={(e) =>
                                  handleChangeEdit(e, item.iid_opcion)
                                }
                              />
                              Ver
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                name="icrear"
                                value="iacceso_crear"
                                defaultChecked={item.icrear}
                                onChange={(e) =>
                                  handleChangeEdit(e, item.iid_opcion)
                                }
                              />
                              Crear
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                name="iactualizar"
                                value="iacceso_actualizar"
                                defaultChecked={item.iactualizar}
                                onChange={(e) =>
                                  handleChangeEdit(e, item.iid_opcion)
                                }
                              />
                              Editar
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                name="ieliminar"
                                value="iacceso_eliminar"
                                defaultChecked={item.ieliminar}
                                onChange={(e) =>
                                  handleChangeEdit(e, item.iid_opcion)
                                }
                              />
                              Eliminar
                            </label>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <br />
              <div className="text-right">
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
              <p>- {editTitle}</p>
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
          ) : (
            <div className="px-5 py-3">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {editTitle}
              </h5>
              <p className="mb-1 font-normal text-gray-700">{editDesc}</p>
              <div className="mb-1 font-normal text-gray-700">
                Estado:
                {statesList.map((state: any) => (
                  <div key={state.iid_tabla_detalle}>
                    {state.iid_tabla_detalle == editState ? (
                      state.vvalor_texto_corto != null ? (
                        capitalize(state.vvalor_texto_corto)
                      ) : (
                        "Sin estado"
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ModalComponent>
      {
        aviso &&
        <ModalComponent isOpen={aviso} closeModal={closeAviso} >
          <div className="bg-white rounded-xl m-auto p-2 min-h-52 w-60">
            <div className="flex justify-end">
              <div className="cursor-pointer  rounded-full p-1 " onClick={closeAviso}>
                <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <IoWarningOutline className="text-yellow-500 h-28 w-28" />
              <div className="text-center">{modalMessage}</div>
            </div>
          </div>
        </ModalComponent>
      }
    </>
  );
};

export default ProfilesPage;
