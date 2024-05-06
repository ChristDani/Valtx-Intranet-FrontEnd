'use client';
import { useEffect, useRef, useState } from "react";
import { eventServices } from '../../../services/mantenedores/eventos.service';

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
    const [dataList, setDataList] = useState<any>([]);
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
    const [dataEvent,setDataEvent] = useState<any>([])

    useEffect(() => {
        getData(currentPage, itemsPorPagina, searchTitle);
        obtenerPath();
    }, [])


    const getData = async (page: number, items: number, titulo: string) => {
        setCurrentPage(page);
        setItems(items);

        const itemsList: any = await eventServices.getListWeb(1, items, "", 3, getCurrentDate(), "asc");

        setDataInfo(itemsList);
        
        // ordernar por dia de mes - pendiente
        const list = itemsList.data.map((item:any)=>{
            const date= new Date(item.dfecha)
            return {
                'year' : date.getUTCFullYear(),
                'month' : date.getUTCMonth(),
                'day' : date.getUTCDate(),
                'dayNumber': date.getUTCDay(),
                'titulo': item.vtitulo,
                'desc' : item.vtextobreve 
            }
        })
        const groupedByMonth = list.reduce((acc: any, currentItem) => {
          const { month, ...rest } = currentItem;
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(rest);
          return acc;
        }, {});
        
        for (const month in groupedByMonth) {
          groupedByMonth[month].sort((a, b) => a.day - b.day);
        }
        setDataList(groupedByMonth);
        const pages = Math.ceil(itemsList.TotalRecords / items) != 0 ? Math.ceil(itemsList.TotalRecords / items) : 1;
        setPages(pages);
        iniciarPaginacion(page, pages);
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

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };



    const dayName =(date:number)=>{
        const day = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
        return day[date];
    }

    const monthName =(date:number)=>{
        const day = ['En.','Feb.','Abr','May','Jun','Jul','Ag.','Set','Oct','Nov','Dic'];
        return day[date];
    }
    return (
        <div className="w-3/4 mx-auto my-6 bg-slate-50 rounded-lg overflow-hidden p-4">
        {
            datInfo.IsSuccess ? (
                <div>
                    {Object.keys(dataList).map((month) => (
                    <div key={month}>
                        <div className="flex flex-row text-2xl items-center gap-4">
                            <div>
                                <span className="ml-1">{monthName(parseInt(month) -1 )}</span>
                                <span className="ml-1">2024</span>
                            </div>
                            <hr className="my-8 h-0.5 w-full bg-black "/>
                        </div>
                        {dataList[month].map((item:any) => (
                        <div key={item} className="flex flex-row w-full ">
                        <div className="w-1/4 h-20 flex flex-col justify-center items-center">
                                <span className=" text-slate-500">{dayName(item.dayNumber)}</span>
                                <span className="font-bold text-3xl">{item.day}</span>
                        </div>
                        <div className="w-3/4 flex border-b border-b-slate-400">
                            <span className="flex w-2/6 justify-center items-center text-slate-600">{item.titulo}</span>
                            <span className="flex w-4/6 justify-center items-center font-medium">{item.desc}</span>
                        </div>
                    </div>
                        ))}
              </div>
            ))}
          </div>
            ):(<div className="bg-white border-b hover:bg-gray-50">
            <div className="px-6 py-4 font-medium text-gray-900 text-center">
                            Lo sentimos, aún no se han registrado datos!
            </div>
        </div>)
            
        }

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
        </div>

    );
}

export default EventsViewPage;