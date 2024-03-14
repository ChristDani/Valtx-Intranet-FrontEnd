'use client';
import { useEffect, useState } from "react";
import { bannerServices } from '../../../services/mantenedores/banner.service';

import Image from 'next/image';
import Link from "next/link";
import ModalComponent from '../components/modal';

const BannPage = () => {

    const [banners, setBanners] = useState([]);
    const [bannersInfo, setBannersInfo] = useState([]);
    const [paginas, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPorPagina, setItems] = useState(10);
    const [itemsTotales, setTotalItems] = useState(0);
    const [bannerTitle, setbannerTitle] = useState("");

    const [editId, setEditId] = useState(0);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editLink, setEditLink] = useState('');
    const [editOrden, setEditOrden] = useState(0);
    const [editImage, setEditImage] = useState(null);

    const handleFileChange = (e: any) => {
        setEditImage(e.target.files[0]);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        getBanners(currentPage, itemsPorPagina, bannerTitle)
    }, [])

    const getBanners = async (page: number, items: number, titulo: string) => {
        setItems(items);

        const bannersList = await bannerServices.getList(page, items, titulo, -1);

        setBannersInfo(bannersList)
        setTotalItems(bannersList.TotalRecords)
        setBanners(bannersList.data)
        const pages = Math.ceil(bannersList.TotalRecords / items) != 0 ? Math.ceil(bannersList.TotalRecords / items) : 1
        setPages(pages)
    }

    const createBanner = async () => {
        const iamg = document.getElementsByName('vimagen')
        console.log('first')
        const res = await bannerServices.create(editImage, 'prueba de servicios', 'creando desde el back', 'example.com','_blank', '7', '', '1', '0')
    }

    const editBanner = async (e: any, id: number) => {
        e.target.preventDefault;
        // openModal()

        const onlyOneBanner = await bannerServices.getOne(id);

        const edittttt = onlyOneBanner.data

        edittttt.map(item => (
            setEditId(item.iid_banner),
            setEditTitle(item.vtitulo),
            setEditDesc(item.vtextobreve),
            setEditLink(item.vlink),
            setEditImage(item.vimagen),
            setEditOrden(item.iorden)
        ))
    }

    const deleteBanner = async (id: number) => {
        const deBaRes = await bannerServices.delete(id);
        getBanners(currentPage, itemsPorPagina, bannerTitle)
    }

    const cancel = () => {
        setEditId(0),
            setEditTitle(''),
            setEditDesc(''),
            setEditLink(''),
            setEditImage(null),
            setEditOrden(0)
    }

    return (

        <div className="mt-2 pt-4 ml-8 pb-8">
            <div>
                <h1 className="uppercase font-bold">Banners</h1>
                <div>
                    <select name="numberOfBanners" id="numberOfBanners" onChange={(e) => getBanners(1, Number(e.target.value), bannerTitle)}>
                        <option value="1">10</option>
                        <option value="2">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <p>cantidad de banners por pagina {itemsPorPagina}</p>
                <p>Total: {itemsTotales}</p>
                <p>Total páginas: {paginas}</p>
                <button className="relative inline-flex cursor-pointer items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200" onClick={createBanner}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        Agregar
                    </span>
                </button>
                {/* tabla */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
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
                                    Fecha
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
                                bannersInfo.IsSuccess ? (
                                    banners.map(item => (
                                        <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_banner}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {item.vtitulo}
                                            </th>
                                            <td className="px-6 py-4 text-center">
                                                {item.vtextobreve}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <img className="object-cover w-10 rounded-t-lg h-20 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`/images/${item.vimagen}`} alt={`${item.vtextobreve}`}></img>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.iorden}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.dfecha}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.vdescripcion_estado}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <a href="" className="font-medium text-blue-600 hover:underline" onClick={openModal}>
                                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                </a>
                                                <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => editBanner(e, item.iid_banner)}>
                                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                    </svg>
                                                </Link>
                                                <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => deleteBanner(item.iid_banner)}>
                                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" colSpan={7} className="px-6 py-4 font-medium text-gray-900 text-center">
                                            Lo sentimos, aún no se han registrado datos!
                                        </th>
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                    {/* paginacion */}
                    {/* <nav aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-8 text-sm">
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">4</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">5</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
            {/* modal */}
            <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
                <div className="max-w-md mx-auto block p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <div className="mb-5">
                        <label htmlFor="vtitulo" className="uppercase block mb-2 text-sm font-medium text-gray-900">titulo</label>
                        <input type="text" name="vtitulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="vtextobreve" className="uppercase block mb-2 text-sm font-medium text-gray-900">textobreve</label>
                        <input type="text" name="vtextobreve" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="vlink" className="uppercase block mb-2 text-sm font-medium text-gray-900">link</label>
                        <input type="text" name="vlink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="vimagen" className="uppercase block mb-2 text-sm font-medium text-gray-900">imagen</label>
                        <input type="file" name="vimagen" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="vredireccion" className="uppercase block mb-2 text-sm font-medium text-gray-900">redireccion</label>
                        <input type="text" name="vredireccion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="iorden" className="uppercase block mb-2 text-sm font-medium text-gray-900">orden</label>
                        <input type="text" name="iorden" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="dfecha" className="uppercase block mb-2 text-sm font-medium text-gray-900">fecha</label>
                        <input type="date" name="dfecha" />
                    </div>
                </div>
            </ModalComponent>
            {/* intento de modificación */}
            <div className="max-w-md mx-auto block p-6 bg-white border border-gray-200 rounded-lg shadow">
                <div className="mb-5">
                    <label htmlFor="iid_banner" className="uppercase block mb-2 text-sm font-medium text-gray-900">ID</label>
                    <input type="text" name="iid_banner" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editId} />
                </div>
                <div className="mb-5">
                    <label htmlFor="vtitulo" className="uppercase block mb-2 text-sm font-medium text-gray-900">titulo</label>
                    <input type="text" name="vtitulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editTitle} />
                </div>
                <div className="mb-5">
                    <label htmlFor="vtextobreve" className="uppercase block mb-2 text-sm font-medium text-gray-900">textobreve</label>
                    <input type="text" name="vtextobreve" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editDesc} />
                </div>
                <div className="mb-5">
                    <label htmlFor="vlink" className="uppercase block mb-2 text-sm font-medium text-gray-900">link</label>
                    <input type="text" name="vlink" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editLink} />
                </div>
                <div className="mb-5">


                    {/* <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG or JPG (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="" />
                        </label>
                    </div> */}


                    <label htmlFor="vimagen" className="uppercase block mb-2 text-sm font-medium text-gray-900">imagen</label>
                    <input type="file" name="vimagen" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" onChange={handleFileChange} /*value={editImage}*/ />
                </div>

                <div className="mb-5">
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="1" className="sr-only peer" defaultValue={1} defaultChecked/>
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">Checked toggle</span>
                    </label>
                </div>

                <div className="mb-5">
                    <label htmlFor="iorden" className="uppercase block mb-2 text-sm font-medium text-gray-900">orden</label>
                    <input type="text" name="iorden" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={editOrden} />
                </div>
                <div className="mb-5">
                    <label htmlFor="dfecha" className="uppercase block mb-2 text-sm font-medium text-gray-900">fecha</label>
                    <input type="date" name="dfecha" />
                </div>
                <div>
                    <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Confirmar</button>
                    <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default BannPage;