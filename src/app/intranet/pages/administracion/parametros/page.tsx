'use client';
import { useEffect, useRef, useState } from "react";
import { auxiliaresServices } from "@/app/intranet/services/administration/auxiliares.service";
import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import Paginacion from '../../../componentes/mantenedores/paginacion'
import { usePathname } from "next/navigation";
import { optionsServices } from "@/app/intranet/services/administration/perfiles-opcion.service";
import { IoWarningOutline } from "react-icons/io5";
import secureLocalStorage from "react-secure-storage";

const AuxPage = () => {

    // obtener la ruta
    const pathName = usePathname()
    const [pathFinal, setPathFinal] = useState('')

    const obtenerPath = () => {
        const resul = pathName.split('/')
        setPathFinal(resul[resul.length - 1])
        return pathFinal
    };

    // parametros
    const [statesList, setStatesList] = useState([]);

    // data
    const [dataList, setDataList] = useState([]);
    const [datInfo, setDataInfo] = useState<any>([]);
    // paginacion
    const [paginas, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagInicio, setPagInicio] = useState(1);
    const [pagFinal, setPagFinal] = useState(5);
    const [pagesToShow, setPagesToShow] = useState<number[]>([]);
    const [itemsPorPagina, setItems] = useState(10);
    // busqueda
    const [searchTitle, setSearchTitle] = useState("");

    // modal
    const [modalState, setModalState] = useState({
        create: false,
        update: false,
        delete: false
    })

    // edición
  const [editId, setEditId] = useState("0");
  const [editEmpresa, setEditEmpresa] = useState("1");
  const [editDesc, setEditDesc] = useState("");
  const [editCadena, setEditCadena] = useState("");
  const [editCadena1, setEditCadena1] = useState("");
  const [editCadena2, setEditCadena2] = useState("");
  const [editEntero, setEditEntero] = useState(0);
  const [editEntero1, setEditEntero1] = useState(0);
  const [editDecimal, setEditDecimal] = useState(0);
  const [editState, setEditState] = useState(1);


    // obtener opciones por usuario
    const [optionUser, setOptionUser] = useState({
        visualizar: false,
        crear: false,
        editar: false,
        eliminar: false
    });

    const getOptionsUser = async (id: any, path: string) => {

        const resul = path.split("/");
        const finalPath = resul[resul.length - 1]
        const pathResul = "/" + finalPath

        const datos = await optionsServices.getPerfilOpcionId(id);
        const listOptionsId = datos.data;
        const options = listOptionsId.find((objeto: any) => objeto.vurl === pathResul)

        if (options) {
            setOptionUser({
                visualizar: options.ivisualizar,
                crear: options.icrear,
                editar: options.iactualizar,
                eliminar: options.ieliminar,
            });
        }

    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeError = () => {
        setErrorModal(false)
    }
    const closeModal = () => {
        cleanData()
        setModalState({ create: false, update: false, delete: false })
        setModalIsOpen(false);
        setShow({
            state: false,
            id_tabla_cabecera: 0,
            nameCabecera: ''
        })
    };

    useEffect(() => {
        // obtener opciones de usuario
        const perfilId:string = secureLocalStorage.getItem("perfil")?.toString() || '';
        getData(currentPage, itemsPorPagina, searchTitle);
        obtenerPath();
        getOptionsUser(perfilId, pathName);
    }, [])

    const getData = async (page: number, items: number, descripcion: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await auxiliaresServices.getList(page,items,descripcion,3,'asc');

        setDataInfo(itemsList);
        
        setDataList(itemsList.data);
        const pages = Math.ceil(itemsList.TotalRecords / items) != 0 ? Math.ceil(itemsList.TotalRecords / items) : 1;
        setPages(pages);
        iniciarPaginacion(page, pages);
    }

    const searchData = (desc: string) => {
        setSearchTitle(desc)
        getData(1, itemsPorPagina, desc);
    }

    const createItem = async () => {
        setModalState({ create: true, update: false, delete: false })
        openModal()
    }

    const getOneItem = async (id: number) => {
        const onlyitem= await auxiliaresServices.getOne(id);
        const itemsw=onlyitem.data
        setEditId(itemsw.iid_parametro);
        setEditDesc(itemsw.vdescripcion);
        setEditCadena(itemsw.vvalor_cadena);
        setEditCadena1(itemsw.vvalor_cadena1);
        setEditCadena2(itemsw.vvalor_cadena2);
        setEditEntero(itemsw.ivalor_entero);
        setEditEntero1(itemsw.ivalor_entero_1);
        setEditDecimal(itemsw.nvalor_decimal);
        setEditState(itemsw.iid_estado_registro);
    }
    const [show, setShow] = useState({
        state: false,
        id_tabla_cabecera: 0,
        nameCabecera: ""
    });
    const editItem = (e: any, id: number) => {
        setModalState({ create: false, update: true, delete: false })
        getOneItem(id);
        openModal();
    }

    const deleteItem = async (e: any, id: number) => {
        setModalState({ create: false, update: false, delete: true })
        getOneItem(id)
        openModal()
    }

    const confirmOp = async (e: any) => {
        e.preventDefault();

        if (modalState.create) {
            if (editDesc !== '') {
                const res = await auxiliaresServices.setParametro(
                    editId,
                    editEmpresa,
                    editDesc,
                    editCadena,
                    editCadena1,
                    editCadena2,
                    +editEntero,
                    +editEntero1,
                    +editDecimal,
                    editState
                );
                if (!res.data.IsSuccess){
                    setMessageModal(res.data.Message)
                    setErrorModal(true);
                    return;
                }
            }
        } else if (modalState.update) {
            const res = await auxiliaresServices.setParametro(
                editId,
                editEmpresa,
                editDesc,
                editCadena,
                editCadena1,
                editCadena2, 
                +editEntero,
                +editEntero1,
                +editDecimal,
                editState
            );
            if (!res.data.IsSuccess){
                setMessageModal(res.data.Message)
                setErrorModal(true);
                return;
            }
        } else if(modalState.delete) {
            const res = await auxiliaresServices.delete(editId);
        } 
        getData(1, itemsPorPagina, searchTitle);
        closeModal()
    }

    const cleanData = () => {
        setEditId("0")
        setEditDesc('')
        setEditCadena('')
        setEditCadena1('')
        setEditCadena2('')
        setEditEntero(0)
        setEditEntero1(0)
        setEditDecimal(0)
        setEditState(0)
    }

    const iniciarPaginacion = (page: number, pages: number) => {

        setPagInicio(1);
        let starPage = 1

        if (page - 3 > 1) {
            setPagInicio(page - 2);
            starPage = page - 2
        }

        setPagFinal(starPage + 4);
        let finishPage = starPage + 4

        if (starPage + 4 > pages) {
            setPagFinal(pages);
            finishPage = pages
        }

        let list = []
        setPagesToShow([]);
        for (let i = starPage; i <= finishPage; i++) {
            list.push(i)
        }
        setPagesToShow(list);
    }

    const previusPage = (page: number) => {
        setCurrentPage(page)
        getData(page, itemsPorPagina, searchTitle)
    }

    const nextPage = (page: number) => {
        setCurrentPage(page)
        getData(page, itemsPorPagina, searchTitle)
    }
    const validarNumero = (e: any, setState : any) => {
        const value =e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/(\..*)\./g, "$1");
        setState(value);
    }

    return (
        <>
            <div className="max-w mt-4 flex flex-wrap items-center justify-between">
                <div className="mb-5 w-96 relative flex ">
                    <input type="text" name="itemtitle" className="bg-gray-50 border rounded-xl border-gray-300 text-gray-900 text-sm w-full p-2.5 focus:outline-none  focus:border-gray-400" placeholder="Buscar por título" value={searchTitle} onInput={(e: any) => searchData(e.target.value)}></input>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0321 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94936 18.7933 8.90905 18.3913 7.93842C17.9892 6.96779 17.3999 6.08585 16.657 5.34296C15.9141 4.60007 15.0322 4.01078 14.0616 3.60874C13.0909 3.20669 12.0506 2.99976 11 2.99976C9.94942 2.99976 8.90911 3.20669 7.93848 3.60874C6.96785 4.01078 6.08591 4.60007 5.34302 5.34296C3.84269 6.84329 2.99982 8.87818 2.99982 11C2.99982 13.1217 3.84269 15.1566 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z" stroke="#7D7E8A" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {optionUser.crear && <button className=" flex flex-row w-32 h-10 items-center justify-center gap-1 rounded-xl bg-sky-400 hover:bg-sky-500" onClick={createItem}>
                    <svg className="text-gray-800  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    <span className=" text-white font-bold">
                        Agregar
                    </span>
                </button>}
            </div>

            {/* tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Título Parámetro
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace the following <tr> elements with your actual product data */}
                        {
                            datInfo.IsSuccess ? (
                                dataList.map((item: any) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_parametro}>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                            {item.vdescripcion}
                                        </td>

                                        <td className="flex gap-4 items-center justify-center my-auto px-6 h-28">
                                            {optionUser.editar && <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => editItem(e, item.iid_parametro)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_191_168)">
                                                        <path d="M2.81326 15.4667L1.54659 20.9333C1.50289 21.1332 1.50439 21.3403 1.55097 21.5394C1.59756 21.7386 1.68805 21.9249 1.81583 22.0846C1.94362 22.2444 2.10547 22.3735 2.28957 22.4627C2.47368 22.5519 2.67537 22.5988 2.87992 22.6C2.97524 22.6096 3.07128 22.6096 3.16659 22.6L8.66659 21.3334L19.2266 10.8133L13.3333 4.93335L2.81326 15.4667Z" fill="#31BAFF" />
                                                        <path d="M22.5466 5.54667L18.6133 1.61333C18.3547 1.35604 18.0048 1.21161 17.64 1.21161C17.2752 1.21161 16.9252 1.35604 16.6666 1.61333L14.48 3.8L20.3666 9.68667L22.5533 7.5C22.6813 7.37139 22.7826 7.2188 22.8516 7.05098C22.9205 6.88315 22.9557 6.70338 22.955 6.52195C22.9544 6.34052 22.918 6.161 22.848 5.99365C22.7779 5.82629 22.6755 5.6744 22.5466 5.54667Z" fill="#31BAFF" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_191_168">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </Link>}
                                            {optionUser.eliminar && <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => deleteItem(e, item.iid_parametro)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_191_172)">
                                                        <path d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z" fill="#EA5065" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_191_172">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" colSpan={6} className="px-6 py-4 font-medium text-gray-900 text-center">
                                        Lo sentimos, aún no se han registrado datos!
                                    </th>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* paginacion */}

            {/* <Paginacion pagInicio={pagInicio} currentPage={currentPage} pagFinal={pagFinal} totalPages={paginas} previusPage={previusPage(currentPage - 1)} nextPage={nextPage(currentPage + 1)} getdata={getData(1, itemsPorPagina, searchTitle)} pagesToShow={pagesToShow}></Paginacion> */}

            {(paginas > 1) ? (
                <nav className="flex justify-end mt-3 w-full">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        {(currentPage != pagInicio) ? (
                            <li>
                                <Link href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => previusPage(currentPage - 1)}>
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </Link>
                            </li>
                        ) : (<span></span>)}
                        {(pagInicio > 2) ? (
                            <>
                                <li>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getData(1, itemsPorPagina, searchTitle)}>1</Link>
                                </li>
                                <li>
                                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-block">...</span>
                                </li>
                            </>
                        ) : (<span></span>)}
                        {pagesToShow.map((item, key) => (
                            (currentPage == item) ? (
                                <li key={key}>
                                    <Link href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">{item}</Link>
                                </li>
                            ) : (
                                <li key={key}>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getData(item, itemsPorPagina, searchTitle)}>{item}</Link>
                                </li>
                            )
                        ))}
                        {(pagFinal < (paginas - 1)) ? (
                            <>
                                <li>
                                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getData(paginas, itemsPorPagina, searchTitle)}>{paginas}</Link>
                                </li>
                            </>
                        ) : (<span></span>)}
                        {(currentPage != pagFinal) ? (
                            <li>
                                <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => nextPage(currentPage + 1)}>
                                    <span className="sr-only">Next</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </Link>
                            </li>
                        ) : (<span></span>)}
                    </ul>
                </nav>
            ) : (
                <span></span>
            )
            }

            {/* modal */}
            <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
                <div className = {`bg-white rounded-xl m-auto p-6 min-h-52 ${modalState.create || modalState.update ? 'w-[700px]' : modalState.delete ? 'w-[500px]' : 'w-[600px]'}`}>
                    <div className="flex justify-between">
                        <div className="capitalize">
                            Administración › {pathFinal} › <strong>{modalState.create ? 'Agregar' : modalState.update ? 'Actualizar' : modalState.delete ? 'Eliminar' : 'Detalles'}</strong>
                        </div>
                        <div className="cursor-pointer  rounded-full p-1 " onClick={closeModal}>
                            <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <hr />
                    {
                        modalState.create || modalState.update ? (
                            <form onSubmit={confirmOp} className="mt-5">
                                <div className="mb-5 hidden">
                                    <input type="text" name="idItem" defaultValue={editId}></input>
                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="vdescripcion" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Descripción</label>
                                    <input required name="vdecripcion" className="bg-gray-50 border border-gray-300 rounded-lg block p-2 w-full" value={editDesc} onInput={(e: any) => setEditDesc(e.target.value)}></input>
                                </div>
                                <div className="flex w-full gap-2">
                                    <div className="mb-5 relative w-1/2">
                                        <label htmlFor="vcadeena" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Valor</label>
                                        <input required name="vcadeena" className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2 " 
                                        value={editCadena} onInput={(e: any) => setEditCadena(e.target.value)}></input>
                                    </div>
                                    <div className="mb-5 relative w-1/2">
                                        <label htmlFor="vcadena1" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Segundo Valor</label>
                                        <input required name="vcadena1" className="bg-gray-50 border border-gray-300 rounded-lg block p-2 w-full" 
                                        value={editCadena1} onInput={(e: any) => setEditCadena1(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2">

                                <div className="mb-5 relative w-1/2">
                                    <label htmlFor="vcadena2" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Tercer Valor</label>
                                    <input required name="vcadena2" className="bg-gray-50 border border-gray-300 rounded-lg block p-2 w-full" 
                                    value={editCadena2} onInput={(e: any) => setEditCadena2(e.target.value)}></input>
                                </div>
                                <div className="mb-5 relative w-1/2">
                                    <label htmlFor="ventero" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Valor Entero</label>
                                    <input required name="ventero" className="bg-gray-50 border border-gray-300 rounded-lg block p-2 w-full" 
                                    value={editEntero} onInput={(e: any) => validarNumero(e, setEditEntero)}></input>
                                </div>
                                </div>
                                <div className="flex w-full gap-2">

                                <div className="mb-5 relative w-1/2">
                                    <label htmlFor="ventero1" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Seguno valor entero</label>
                                    <input required name="ventero1" className="bg-gray-50 border border-gray-300 rounded-lg  block p-2 w-full" 
                                    value={editEntero1} onInput={(e: any) => validarNumero(e, setEditEntero1)}></input>
                                </div>
                                
                                <div className="mb-5 relative w-1/2">
                                    <label htmlFor="vdecimal" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Valor decimal</label>
                                    <input required name="vdecimal" className="bg-gray-50 border border-gray-300 rounded-lg block p-2 w-full" 
                                    value={editDecimal} onInput={(e: any) => validarNumero(e, setEditDecimal)}></input>
                                </div>
                                </div>
                                <ModalComponent isOpen={errorModal} closeModal={closeError}>
                                                <div className="bg-white rounded-xl m-auto p-2 min-h-52 w-60">
                                                    <div className="flex justify-end">
                                                        <div className="cursor-pointer  rounded-full p-1 " onClick={closeError}>
                                                            <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center w-full">
                                                        <IoWarningOutline className="text-yellow-500 h-28 w-28" />
                                                        <div className="text-center">{messageModal}</div>
                                                    </div>
                                                </div>
                                            </ModalComponent>
                                <div className="text-right">
                                    <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]">Guardar</button>
                                </div>
                            </form>
                        ) : modalState.delete ? (
                            <div className="mt-5">
                                <h1>¿Está seguro que desea eliminar este elemento?</h1>
                                <p>- {editDesc}</p>
                                <br />
                                <div className="text-end">
                                    <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]" onClick={confirmOp}>Confirmar</button>
                                </div>
                            </div>
                        ) : (
                            ""
                        )
                    }
                </div>
        </ModalComponent >
        </>
    );
}

export default AuxPage;