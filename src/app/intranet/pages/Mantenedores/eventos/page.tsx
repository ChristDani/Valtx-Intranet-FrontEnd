'use client';
import { useEffect, useRef, useState } from "react";
import { eventServices } from '../../../services/mantenedores/eventos.service';

import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';

const EventPage = () =>{

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
    const [itemsTotales, setTotalItems] = useState(0);
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
    const [editImage, setEditImage] = useState(null);
    const [redirecction, setRedirecction] = useState('');
    const [dfecha, setFecha] = useState('');
    const [fechaFormat, setFechaFormat] = useState('');

    const handleFileChange = (e: any) => {
        setEditImage(e.target.files[0]);
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
        getData(currentPage, itemsPorPagina, searchTitle)
    }, [])

    const getData = async (page: number, items: number, titulo: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await eventServices.getList(page, items, titulo, -1, 'asc');

        setDataInfo(itemsList);
        setTotalItems(itemsList.TotalRecords);
        setDataList(itemsList.data);
        const pages = Math.ceil(itemsList.TotalRecords / items) != 0 ? Math.ceil(itemsList.TotalRecords / items) : 1;
        setPages(pages);
        iniciarPaginacion(page, pages);
    }

    const searchData = (title: string) => {
        setSearchTitle(title)
        getData(currentPage, itemsPorPagina, title)
    }

    const createItem = async () => {
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
        const onlyOneItem = await eventServices.getOne(id);
        onlyOneItem.data.map((item: any) => (
            setEditId(item.iid_evento),
            setEditTitle(item.vtitulo),
            setEditDesc(item.vtextobreve),
            setEditLink(item.vlink),
            setEditImage(item.vimagen),
            setEditOrden(item.iorden),
            setEditState(item.iid_estado_registro),
            setRedirecction(item.vredireccion),
            setFecha(item.dfecha),
            formatFech(item.dfecha)
        ))
    }

    const itemDetails = (e: any, id: number) => {
        openModal()
        getOneItem(id)
    }

    const editItem = (e: any, id: number) => {
        setModalState({ create: false, update: true, delete: false })
        openModal()
        getOneItem(id)
    }
    
    const deleteItem = async (e: any, id: number) => {
        setModalState({ create: false, update: false, delete: true })
        getOneItem(id)
        openModal()
    }

    const confirmOp = async (e: any) => {
        e.preventDefault();

        if (modalState.create) {
            if (editImage != null) {
                const res = await eventServices.create(editImage, editTitle, editDesc, editLink, editOrden, editState, editId);
                getData(currentPage, itemsPorPagina, searchTitle)
                closeModal()
            } else {
                alert('debe elegir una imagen')
            }
        } else if (modalState.update) {
            if (editImage != null) {
                const res = await eventServices.update(editTitle, editDesc, editLink, editOrden, editState, editId, editImage)
            } else {
                const res = await eventServices.update(editTitle, editDesc, editLink, editOrden, editState, editId)
            }
            getData(currentPage, itemsPorPagina, searchTitle)
            closeModal()
        } else if (modalState.delete) {
            const res = await eventServices.delete(editId);
            getData(currentPage, itemsPorPagina, searchTitle)
            closeModal()
        } else {
            alert('detalles')
        }
    }

    const cleanData = () => {
        setEditId('0')
        setEditTitle('')
        setEditDesc('')
        setEditLink('')
        setEditImage(null)
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

    return(

        <div className="mt-2 pt-4 ml-8 pb-8">
            <h1 className="uppercase font-bold">Mantenedor de Eventos</h1>
            <div className="max-w flex flex-wrap items-center justify-between">
                <div>
                    <label htmlFor="numberOfItems">Mostrar </label>
                    <select name="numberOfItems" id="numberOfItems" onChange={(e) => getData(1, Number(e.target.value), searchTitle)}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <label htmlFor="numberOfItems"> Registros</label>
                </div>
                <div className="mb-5">
                    <input type="text" name="itemtitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="buscar por titulo" value={searchTitle} onInput={(e: any) => searchData(e.target.value)}></input>
                </div>
                <button className="relative inline-flex cursor-pointer items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200" onClick={createItem}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Agregar
                    </span>
                </button>
            </div>

            {/* tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
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
                                Orden
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
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_evento}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.vtitulo}
                                        </th>
                                        <td className="px-6 py-4 text-center">
                                            {item.vtextobreve}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <img className="rounded-lg h-36 w-auto mx-auto content-center" src={`/images/${item.vimagen}`} alt={`${item.vtextobreve}`}></img>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.iorden}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.vdescripcion_estado}
                                        </td>
                                        <td className="flex gap-3 items-center justify-center my-auto px-6 h-44">
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => itemDetails(e, item.iid_evento)}>
                                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                            </Link>
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => editItem(e, item.iid_evento)}>
                                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                </svg>
                                            </Link>
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => deleteItem(e, item.iid_evento)}>
                                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </Link>
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
            {(paginas > 1) ? (
                <nav className="w-full">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        {(currentPage != pagInicio) ? (
                            <li>
                                <Link href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => previusPage(currentPage - 1)}>
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
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
                        {pagesToShow.map((item,key) => (
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
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
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
                {modalState.create || modalState.update ? (
                    <div className="max-w-md mx-auto block p-6 bg-white border border-gray-200 rounded-lg shadow">
                        <form onSubmit={confirmOp}>
                            {/* <div className="mb-5">
                                <>
                                    <button onClick={handleButtonClick}>Select image</button>
                                    <input type="file" onChange={handleImageChange} ref={fileInputRef} className="d-none" />
                                    {imageSrc && (
                                        <img src={imageSrc} alt="Preview" id="fotoPerfileditmuestra" />
                                    )}
                                    {!imageSrc && (
                                        <img src='' alt="Default" id="fotoPerfilmuestra" />
                                    )}
                                </>
                            </div>
                            <div className="mb-5">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 text-center"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500">SVG, PNG or JPG (MAX. 800x400px)</p>
                                        </div>
                                    </label>
                                    <input id="dropzone-file" type="file" className="hidden"></input>
                                </div>
                            </div> */}
                            <div className="mb-5 hidden">
                                <label htmlFor="idItem" className="uppercase block mb-2 text-sm font-medium text-gray-900">ID</label>
                                <input type="text" name="idItem" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editId}></input>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="vtitulo" className="uppercase block mb-2 text-sm font-medium text-gray-900">titulo</label>
                                <input required type="text" name="vtitulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editTitle} onInput={(e: any) => setEditTitle(e.target.value)}></input>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="vtextobreve" className="uppercase block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                                <input required type="text" name="vtextobreve" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editDesc} onInput={(e: any) => setEditDesc(e.target.value)}></input>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="vlink" className="uppercase block mb-2 text-sm font-medium text-gray-900">link</label>
                                <input required type="text" name="vlink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editLink} onInput={(e: any) => setEditLink(e.target.value)}></input>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="vimagen" className="uppercase block mb-2 text-sm font-medium text-gray-900">imagen</label>
                                <input type="file" name="vimagen" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" onChange={handleFileChange}></input>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="countries" className="uppercase block mb-2 text-sm font-medium text-gray-900">estado</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setEditState(e.target.value)}>
                                    {modalState.update ? (
                                        <option value={editState} selected hidden>{editState == '1' ? 'Activo' : 'Inactivo'}</option>
                                    ) : (
                                        <option value="1" selected hidden>Activo</option>
                                    )}
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="iorden" className="uppercase block mb-2 text-sm font-medium text-gray-900">orden</label>
                                <input type="text" name="iorden" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editOrden} onInput={(e: any) => setEditOrden(e.target.value)}></input>
                            </div>
                            <div>
                                <button type="submit" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Confirmar</button>
                                <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                ) : modalState.delete ? (
                    <div className="max-w-md mx-auto block p-6 bg-white border border-gray-200 rounded-lg shadow">
                        <h1>¿Esta seguro de eliminar el articulo?</h1>
                        <div>
                            <button type="submit" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={confirmOp}>Confirmar</button>
                            <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                        <Link href={editLink} target={redirecction}>
                            <img className="rounded-lg max-h-72 w-auto mx-auto my-3" src={`/images/eventos/${editImage}`} alt=""></img>
                        </Link>
                        <hr />
                        <div className="px-5 py-3">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{editTitle}</h5>
                            <p className="mb-1 font-normal text-gray-700">{editDesc}</p>
                            <p className="mb-1 font-normal text-gray-700">Orden: {editOrden}</p>
                            <p className="mb-1 font-normal text-gray-700">Estado: {editState == '1' ? 'Activo' : 'Inactivo'}</p>
                            <p className="mb-1 font-normal text-gray-700">{fechaFormat}</p>
                        </div>
                    </div>
                )}
            </ModalComponent>
        </div>

    );
}

export default EventPage;