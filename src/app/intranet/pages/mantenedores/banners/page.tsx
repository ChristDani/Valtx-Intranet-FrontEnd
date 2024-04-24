'use client';
import { useEffect, useRef, useState } from "react";
import { bannerServices } from '../../../services/mantenedores/banner.service';
import { parametrosServices } from '../../../services/parametros.service';

import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import Paginacion from '../../../componentes/mantenedores/paginacion'
import { usePathname } from "next/navigation";
import { optionsServices } from "@/app/intranet/services/administration/perfiles-opcion.service";

const BannPage = () => {

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
    const [editId, setEditId] = useState('0');
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editLink, setEditLink] = useState('');
    const [editOrden, setEditOrden] = useState('');
    const [editState, setEditState] = useState('1');
    const [Image, setImage] = useState(null);
    const [editImage, setEditImage] = useState('');
    const [nameImage, setNameImage] = useState('');
    const [srcImage, setSrcImage] = useState<any>(null);
    const [redirecction, setRedirecction] = useState('');
    const [dfecha, setFecha] = useState('');
    const [fechaFormat, setFechaFormat] = useState('');

    // obtener opciones de usuario
  const perfilId = localStorage.getItem("perfil") || '';

  // obtener opciones por usuario
  const [optionUser, setOptionUser] = useState({
    visualizar: false,
    crear: false,
    editar: false,
    eliminar: false
  });

  const getOptionsUser = async (id: any, path : string) => {

    const resul = path.split("/");
    const finalPath = resul[resul.length - 1]
    const pathResul = "/" + finalPath

    const datos = await optionsServices.getPerfilOpcionId(id);
    const listOptionsId = datos.data;
    const options = listOptionsId.find((objeto:any) => objeto.vurl === pathResul)

    if (options) {
      setOptionUser({
        visualizar: options.ivisualizar,
        crear: options.icrear ,
        editar: options.iactualizar,
        eliminar: options.ieliminar,
      });
    }

  };

    const cambiarImagen = (e: any) => {
        const file = e.target.files[0];
        const name = e.target.files[0].name;
        setImage(file);
        setNameImage(name);
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setSrcImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        cleanData()
        setModalState({ create: false, update: false, delete: false })
        setModalIsOpen(false);
    };

    useEffect(() => {
        getData(currentPage, itemsPorPagina, searchTitle);
        obtenerPath();
        getStates();
        getOptionsUser(perfilId, pathName);
    }, [])

    const getStates = async () => {
        const { data } = await parametrosServices.getStates()

        setStatesList(data)
    }

    const getData = async (page: number, items: number, titulo: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await bannerServices.getList(page, items, titulo, -1, 'asc');

        setDataInfo(itemsList);
        setDataList(itemsList.data);
        const pages = Math.ceil(itemsList.TotalRecords / items) != 0 ? Math.ceil(itemsList.TotalRecords / items) : 1;
        setPages(pages);
        iniciarPaginacion(page, pages);
    }

    const searchData = (title: string) => {
        setSearchTitle(title)
        getData(1, itemsPorPagina, title)
    }

    const createItem = async (e:any) => {
        e.preventDefault();
        setModalState({ create: true, update: false, delete: false })
        openModal()
    }

    const formatFech = (fecha: string) => {

        let diassemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        const dateString = fecha;
        const date = new Date(dateString);
        const day = date.getDay();
        const dateNum = date.getDate();
        const month = date.getMonth() + 1; // Note: months are 0-based in JavaScript
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();// < 10 ? '0' + date.getSeconds() : date.getSeconds();
        const amOrPm = hours > 11 ? 'PM' : 'AM';

        // const formattedHours = hours % 12 || 12; // convert to 12-hour format
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;

        setFechaFormat(`${diassemana[day - 1]}, ${dateNum} de ${meses[month - 1]} del ${year} / ${formattedTime}`);
    }

    const getOneItem = async (id: number) => {
        const onlyOneItem = await bannerServices.getOne(id);

        const edittttt = onlyOneItem.data

        edittttt.map((item: any) => (
            setEditId(item.iid_banner),
            setEditTitle(item.vtitulo),
            setEditDesc(item.vtextobreve),
            setEditLink(item.vlink),
            setEditImage(item.vimagen),
            setNameImage(item.vimagen),
            setEditOrden(item.iorden),
            setEditState(item.iid_estado_registro),
            setRedirecction(item.vredireccion),
            setFecha(item.dfecha),
            formatFech(item.dfecha)
        ))
    }

    const itemDetails = (e: any, id: number) => {
        e.preventDefault();
        openModal()
        getOneItem(id)
    }

    const editItem = (e: any, id: number) => {
        e.preventDefault();
        setModalState({ create: false, update: true, delete: false })
        openModal()
        getOneItem(id)
    }

    const deleteItem = async (e: any, id: number) => {
        e.preventDefault();
        setModalState({ create: false, update: false, delete: true })
        getOneItem(id)
        openModal()
    }

    const confirmOp = async (e: any) => {
        e.preventDefault();

        if (modalState.create) {
            if (Image != null) {
                const res = await bannerServices.create(Image, editTitle, editDesc, editLink, editOrden, editState, editId);
            } else {
                alert('debe elegir una imagen')
            }
        } else if (modalState.update) {
            if (Image != null) {
                const res = await bannerServices.update(editTitle, editDesc, editLink, editOrden, editState, editId, Image)
            } else {
                const res = await bannerServices.update(editTitle, editDesc, editLink, editOrden, editState, editId)
            }
        } else if (modalState.delete) {
            const res = await bannerServices.delete(editId);
        } else {
            alert('detalles')
        }
        getData(1, itemsPorPagina, searchTitle)
        closeModal()
    }

    const cleanData = () => {
        setEditId('0')
        setEditTitle('')
        setEditDesc('')
        setEditLink('')
        setEditImage('')
        setImage(null)
        setSrcImage(null)
        setNameImage('')
        setEditState('1')
        setEditOrden('')
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

    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef: any = useRef(null);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const capitalize = (text: String) => {
        const first = text.charAt(0);
        const rest = text.slice(1).toLowerCase();
        return first + rest
    }

    const validarOrder = (e: any) => {
        e.value = e.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setEditOrden(e.value);
    }

    const imageRef = useRef<any>(null)

    const openInputImage = () => {
        imageRef.current.click();
    };

    const deleteImage = () => {
        setImage(null)
        setSrcImage(null)
        setNameImage(editImage)
    };

    return (
        <>
            <div className="max-w mt-4 flex flex-wrap items-center justify-between">
                {/*<div>
                    <label htmlFor="numberOfItems">Mostrar </label>
                    <select name="numberOfItems" id="numberOfItems" onChange={(e) => getData(1, Number(e.target.value), searchTitle)}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <label htmlFor="numberOfItems"> Registros</label>
                </div>*/}
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
                                Orden
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Imagen
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
                        {
                            datInfo.IsSuccess ? (
                                dataList.map((item: any) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_banner}>
                                        <th scope="row" className="px-6 py-4 text-center">
                                            {item.iorden}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.vtitulo}
                                        </th>
                                        <td className="px-6 py-4 text-start ">
                                            {item.vtextobreve}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <img className="rounded-lg h-20 w-auto mx-auto content-center" src={`/images/${item.vimagen}`} alt={`${item.vtextobreve}`}></img>
                                        </td>
                                        <td className='px-6 py-4'>
                                            {
                                                statesList.map((state: any) => (
                                                    <div key={state.iid_tabla_detalle}>
                                                        {
                                                            state.iid_tabla_detalle == item.iid_estado_registro ? (
                                                                <div className={`flex items-center justify-center  font-bold min-w-24 h-10 rounded-xl ${state.vvalor_texto_corto === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-200 text-rose-800'}`}>
                                                                    {
                                                                        state.vvalor_texto_corto != null ? capitalize(state.vvalor_texto_corto) : 'Sin estado'
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td className="flex gap-4 items-center justify-center my-auto px-6 h-28">
                                            {optionUser.visualizar && <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => itemDetails(e, item.iid_banner)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" fill="#0C3587" />
                                                </svg>
                                            </Link>}
                                            {optionUser.editar && <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => editItem(e, item.iid_banner)}>
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
                                            {optionUser.eliminar && <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => deleteItem(e, item.iid_banner)}>
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
                <div className={`bg-white rounded-xl m-auto p-6 min-h-52 ${modalState.create || modalState.update ? 'w-[700px]' : modalState.delete ? 'w-[500px]' : 'w-[600px]'}`}>
                    <div className="flex justify-between">
                        <div className="capitalize">
                            Mantenedores › {pathFinal} › <strong>{modalState.create ? 'Agregar' : modalState.update ? 'Actualizar' : modalState.delete ? 'Eliminar' : 'Detalles'}</strong>
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
                                    <label htmlFor="idItem" >ID</label>
                                    <input type="text" name="idItem" defaultValue={editId}></input>
                                </div>
                                <div className="mb-5 flex">
                                    <div className="flex-auto w-28 relative">
                                        <label htmlFor="iorden" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs" >Orden</label>
                                        <input type="text" name="iorden" className="bg-gray-50 border border-gray-300 rounded-lg w-3/4 block p-2" value={editOrden} onInput={(e: any) => validarOrder(e.target)}></input>
                                    </div>
                                    <div className="flex-auto w-full relative">
                                        <label htmlFor="vtitulo" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Título</label>
                                        <input required type="text" name="vtitulo" className="bg-gray-50 border border-gray-300 rounded-lg w-full block p-2" value={editTitle} onInput={(e: any) => setEditTitle(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="vtextobreve" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Descripción</label>
                                    <textarea required name="vtextobreve" className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" value={editDesc} onInput={(e: any) => setEditDesc(e.target.value)}></textarea>
                                </div>
                                <div className="mb-5  relative">
                                    <label htmlFor="vlink" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs" >Link</label>
                                    <input required type="text" name="vlink" className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" value={editLink} onInput={(e: any) => setEditLink(e.target.value)}></input>
                                </div>
                                <div className="mb-5 hidden relative">
                                    <label htmlFor="vimagen" className="absolute left-2 px-1 bg-gray-50 transform -translate-y-1/2 text-xs" >Imagen</label>
                                    <input type="file" ref={imageRef} name="vimagen" className="file:hidden bg-gray-50 border border-gray-300 rounded-lg p-2 w-full cursor-pointer" onChange={cambiarImagen}></input>
                                </div>
                                <div className="flex justify-center mb-5 relative gap-1 border border-gray-300 p-1 rounded-xl">
                                    <label className="absolute left-2 px-1 bg-transparent backdrop-blur-sm transform -translate-y-1/2 text-xs" >Imagen</label>
                                    {
                                        Image != null || editImage != '' ? (
                                            <>
                                                <div className="flex justify-center items-center h-44 bg-red-200 text-red-600 w-[20%] rounded-s-lg cursor-pointer hover:bg-red-100 hover:text-red-300" onClick={deleteImage}>
                                                    <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                    {
                                        Image != null ? (
                                            <>
                                                <img className="max-h-44 max-w-[60%] mx-auto relative" src={srcImage}></img>
                                                <label className="flex absolute px-1 transform translate-y-4 bg-gray-600 bg-opacity-10 backdrop-blur-xl text-center bottom-1 text-black rounded-md max-w-[60%] items-center justify-center">{nameImage}</label>
                                            </>
                                        ) : editImage != '' ? (
                                            <>
                                                <img className="max-h-44 max-w-[60%] mx-auto relative" src={`/images/banners/${editImage}`}></img>
                                                <label className="flex absolute px-1 transform translate-y-4 bg-gray-600 bg-opacity-10 backdrop-blur-xl text-center bottom-1 text-black rounded-md max-w-[60%] items-center justify-center">{nameImage}</label>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex justify-center items-center h-44 bg-yellow-200 text-yellow-800 w-[60%] cursor-pointer hover:bg-yellow-100 hover:text-yellow-400" onClick={openInputImage}>
                                                    <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                                    </svg>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        Image != null || editImage != '' ? (
                                            <>
                                                <div className="flex justify-center items-center h-44 bg-blue-200 text-blue-600 w-[20%] rounded-r-lg cursor-pointer hover:bg-blue-100 hover:text-blue-300" onClick={openInputImage}>
                                                    <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                                                    </svg>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="flex justify-start gap-4">
                                    <div className="mb-5 relative">
                                        <label htmlFor="stateItem" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Estado</label>
                                        <select id="stateItem" className="bg-gray-50 border border-gray-300 rounded-lg p-2" onChange={(e) => setEditState(e.target.value)} value={editState}>
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
                                                <option key="0" value="0">
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
                                <div className="text-right">
                                    <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]">Guardar</button>
                                </div>
                            </form>
                        ) : modalState.delete ? (
                            <div className="mt-5">
                                <h1>¿Está seguro que desea eliminar este elemento?</h1>
                                <p>- {editTitle}</p>
                                <br />
                                <div className="text-end">
                                    <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={closeModal}>Cancelar</button>
                                    <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]" onClick={confirmOp}>Confirmar</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href={editLink} target={redirecction}>
                                    <img className="rounded-lg max-h-72 w-auto mx-auto my-3" src={`/images/banners/${editImage}`} alt=""></img>
                                </Link>
                                <hr />
                                <div className="px-5 py-3">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{editTitle}</h5>
                                    <p className="mb-1 font-normal text-gray-700">{editDesc}</p>
                                    <p className="mb-1 font-normal text-gray-700">Orden: {editOrden}</p>
                                    <div className="mb-1 font-normal text-gray-700">Estado: {
                                        statesList.map((state: any) => (
                                            <div key={state.iid_tabla_detalle}>
                                                {
                                                    state.iid_tabla_detalle == editState ? (
                                                        state.vvalor_texto_corto != null ? capitalize(state.vvalor_texto_corto) : 'Sin estado'
                                                    ) : (
                                                        <>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                    </div>
                                    <p className="mb-1 font-normal text-gray-700">{fechaFormat}</p>
                                </div>
                            </>
                        )
                    }
                </div>
            </ModalComponent>
        </>
    );
}

export default BannPage;