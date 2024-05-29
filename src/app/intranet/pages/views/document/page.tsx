'use client';
import { useEffect, useRef, useState } from "react";
import { documentacionServices } from '../../../services/mantenedores/document.service';
import { parametrosServices } from '../../../services/parametros.service';

import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import ManagerDoc from "./ManagerDocument";
import ImagenFront from "@/app/intranet/componentes/mantenedores/imagenFront";

const DocuViewPage = () => {

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
    const [repositoriesList, setRepositoriesList] = useState([]);

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
        setShow({
            state: false,
            id_doc: 0
        })
    };

    useEffect(() => {
        getData(currentPage, itemsPorPagina, searchTitle);
        obtenerPath();
        getStates();
    }, [])

    const getStates = async () => {
        const { data } = await parametrosServices.getStates()

        setStatesList(data)
    }


    const getData = async (page: number, items: number, titulo: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await documentacionServices.getListWeb(page, items, titulo, -1, 'asc');

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
        const onlyOneItem = await documentacionServices.getOne(id);

        const edittttt = onlyOneItem.data

        edittttt.map((item: any) => (
            setEditId(item.iid_documentacion),
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
        console.log(onlyOneItem.data);
        
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
            if (Image != null) {
                const res = await documentacionServices.create(Image, editTitle, editDesc, editLink, editOrden, editState, editId);
            } else {
                alert('debe elegir una imagen')
            }
        } else if (modalState.update) {
            if (Image != null) {
                const res = await documentacionServices.update(editTitle, editDesc, editLink, editOrden, editState, editId, Image)
            } else {
                const res = await documentacionServices.update(editTitle, editDesc, editLink, editOrden, editState, editId)
            }
        } else if (modalState.delete) {
            const res = await documentacionServices.delete(editId);
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

    const imageRef = useRef<any>(null)


    const [show, setShow] = useState({
        state: false,
        id_doc: 0
    });

    const showDataFiles = (e: any, id: number) => {
        setShow({
            state: true,
            id_doc: id
        })
        openModal()
    }

    return (

            <> 
            <div className="grid grid-cols-3 gap-2 m-5 justify-center w-full max-sm:grid-cols-1 max-lg:grid-cols-2" >
           {
                datInfo.IsSuccess ? (
                    dataList.map((item: any) => ( 
                    <div key={item.idd_blog} className=" max-w-xs my-4 h-[350px] rounded-lg overflow-hidden shadow-lg bg-slate-50">
                    <ImagenFront className="object-cover h-40 w-full" src={item.vimagen} alt={`${item.vtextobreve}`}/>
                    <div className="flex flex-col gap-4 w-full p-4">
                            <div className="h-10 font-bold text-xl">{item.vtitulo}</div>
                            <div className="h-[70px] text-gray-700 text-base line-clamp-3 overflow-hidden">
                                {item.vtextobreve}
                            </div>
                        </div>
                        <div className="flex justify-end mr-3">
                            <Link href=""  className="global-secondary-text" onClick={(e) => showDataFiles(e, item.iid_documentacion)}>
                                Ver Documentos -{'>'}
                            </Link>
                        </div>
                    </div> 
                    ))
                ):(
                    <div className="bg-white border-b hover:bg-gray-50">
                    <div  className="px-6 py-4 font-medium text-gray-900 text-center">
                            Lo sentimos, aún no se han registrado datos!
                        </div>
                    </div>
                )
            }
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
                        {pagesToShow.map((item:any) => (
                            (currentPage == item) ? (
                                <li key={item}>
                                    <Link href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">{item}</Link>
                                </li>
                            ) : (
                                <li key={item}>
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
                {
                    show.state ? <ManagerDoc close={closeModal} idDoc={show.id_doc} />:<></>
                }
            </ModalComponent>
            </>
    );
}

export default DocuViewPage;