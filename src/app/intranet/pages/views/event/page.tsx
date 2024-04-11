'use client';
import { useEffect, useRef, useState } from "react";
import { eventServices } from '../../../services/mantenedores/eventos.service';
import { parametrosServices } from '../../../services/parametros.service';

import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import { format } from "path";

const EventsViewPage = () => {

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


    useEffect(() => {
        getData(currentPage, itemsPorPagina, searchTitle);
        obtenerPath();
    }, [])


    const getData = async (page: number, items: number, titulo: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await eventServices.getList(page, items, "", 3, getCurrentDate(), 'asc');

        setDataInfo(itemsList);
        setDataList(itemsList.data);
        const pages = Math.ceil(itemsList.TotalRecords / items) != 0 ? Math.ceil(itemsList.TotalRecords / items) : 1;
        setPages(pages);
        iniciarPaginacion(page, pages);
    }
    const [dataEvent,setDataEvent] = useState<any[]>([])
    const group = ()=>{
        const list = dataList.map((item:any)=>{
            const date= new Date(item.dfecha)
            return {
                'year' : date.getFullYear(),
                'month' : date.getMonth(),
                'day' : date.getDate(),
                'dayNumber': date.getDay(),
                'titulo': item.vtitulo,
                'desc' : item.vtextobreve 
            }
        })
        setDataEvent(list)
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
            setNameImage(item.vimagen),
            setEditOrden(item.iorden),
            setEditState(item.iid_estado_registro),
            setRedirecction(item.vredireccion),
            setFecha(obDate(item.dfecha).toString()),
            formatFech(item.dfecha)
        ))
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

    const capitalize = (text: String) => {
        const first = text.charAt(0);
        const rest = text.slice(1).toLowerCase();
        return first + rest
    }

    const validarOrder = (e: any) => {
        e.value = e.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        setEditOrden(e.value);
    }

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const obDate=(date:string)=>{
        const aux = new Date(date)
        const year = aux.getUTCFullYear();
        const month = String(aux.getUTCMonth() + 1).padStart(2, '0');
        const day = String(aux.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const dayNumber =(date:string)=>{
        const aux = new Date(date)
        const day = String(aux.getUTCDate()).padStart(2, '0');
        return day;
    }
    const dayName =(date:string)=>{
        const day = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
        const aux = new Date(date)
        const dayname = aux.getDay()
        return day[dayname];
    }

    const year =(date:string)=>{
        const aux = new Date(date)
        const day = aux.getFullYear()
        return day;
    }
    const month =(date:string)=>{
        const aux = new Date(date)
        const day = aux.getMonth()
        return day;
    }
    const monthName =(date:string)=>{
        const day = ['En.','Feb.','Abr.','May.','Jun','Jul','Ag.','Set','Oct','Nov','Dic'];
        const aux = new Date(date)
        const dayname = aux.getDay()
        return day[dayname];
    }
    const mes =()=>{
        const aux = new Date()
        const day = aux.getMonth()
        return day;
    }
    return (

        <>
            <div className="w-3/4 mx-auto my-6 bg-slate-50 rounded-lg overflow-hidden p-4">
                <div className="flex flex-row text-2xl items-center gap-4">
                    <div>
                        <span className="ml-1">{monthName(mes().toString())}</span>
                        <span className="ml-1">2024</span>
                    </div>
                    <hr className="my-8 h-0.5 w-full bg-black "/>
                </div>
                {
                    datInfo.IsSuccess ? (
                        dataList.filter((item:any) => month(item.dfecha)===mes()).map((item: any,key) => (
                                <div key={key} className="flex flex-row w-full ">
                                <div className="w-1/4 h-20 flex flex-col justify-center items-center">
                                        <span className=" text-slate-500">{dayName(item.dfecha)}</span>
                                        <span className="font-bold text-3xl">{dayNumber(item.dfecha)}</span>
                                </div>
                                <div className="w-3/4 flex border-b border-b-slate-400">
                                    <span className="flex w-2/6 justify-center items-center text-slate-600">{item.vtitulo}</span>
                                    <span className="flex w-4/6 justify-center items-center font-medium">{item.vtextobreve}</span>
                                </div>
                            </div>
                    ))) : (
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 text-center">
                                Lo sentimos, aún no se han registrado datos!
                            </th>
                        </tr>

                    )
                }
                
            </div>
            {/* tabla */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3 text-center hidden">
                                Imagen
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace the following <tr> elements with your actual product data */}
                        {
                            datInfo.IsSuccess ? (
                                dataList.map((item: any, key) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_evento}>
                                        <th scope="row" className="px-6 py-4 text-center">
                                            {obDate(item.dfecha)}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.vtitulo}
                                        </th>
                                        <td className="px-6 py-4 text-start ">
                                            {item.vtextobreve}
                                        </td>
                                        <td className="px-6 py-4 text-center hidden">
                                            <img className="rounded-lg h-20 w-auto mx-auto content-center" src={`/images/${item.vimagen}`} alt={`${item.vtextobreve}`}></img>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" colSpan={4} className="px-6 py-4 font-medium text-gray-900 text-center">
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
        </>

    );
}

export default EventsViewPage;