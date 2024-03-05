'use client';

import { useState } from 'react';
import Link from "next/link";

// Definimos un tipo para el estado
interface ExpandedItems {
    [key: string]: boolean;
}

const Sidebar = () => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleItem = (item: string) => {
        if (expandedItem === item) {
            setExpandedItem(null);
        } else {
            setExpandedItem(item);
        }
    };

    const onSelect = () => {
        setExpandedItem(null);
    }

    return (
        <div>
            {/* Sidebar */}
            <div className="flex flex-shrink-0 bg-white h-16 justify-between left-0 top-[4rem] w-full p-3 rounded-full">
                <ul className="flex align-middle justify-center w-fit">
                    <li className="flex px-6 py-3 text-gray-900 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer">
                        <Link href="/intranet" className="flex items-center">Inicio</Link>
                    </li>
                    <li className="flex px-6 py-3 text-gray-900 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer">
                        <Link href="/intranet/pages/us" className="flex items-center">Nosotros</Link>
                    </li>
                    <li className="relative">
                        <div className="flex px-6 py-3 text-gray-900 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer" onClick={() => toggleItem('item3')}>Áreas</div>
                        {expandedItem === 'item3' && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <Link href="/intranet/pages/areas" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 1</Link>
                            </div>
                        )}
                    </li>
                    <li className="relative">
                        <div className="flex px-6 py-3 text-gray-700 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer" onClick={() => toggleItem('item4')}>E-learning</div>
                        {expandedItem === 'item4' && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 1</div>
                            </div>
                        )}
                    </li>
                    <li className="flex px-6 py-3 text-gray-700 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer">
                        <Link href={""}>Noticias</Link>
                    </li>
                    <li className="relative">
                        <div className="flex px-6 py-3 text-gray-700 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer" onClick={() => toggleItem('item5')}>Mantenedores</div>
                        {expandedItem === 'item5' && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/articulos">Artículos</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/banners">Banners</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/blogs">Blogs</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/documentaciones">Documentaciones</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/enlaces">Enlaces</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/enterate">Entérate</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/eventos">Eventos</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/iconos">Iconos</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/Mantenedores/news">Valtx News</Link>
                            </div>
                        )}
                    </li>
                    <li className="relative">
                        <div className="flex px-6 py-3 text-gray-700 hover:bg-[#1aabe3] hover:text-white rounded-2xl cursor-pointer" onClick={() => toggleItem('item6')}>Administración</div>
                        {expandedItem === 'item6' && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/administration/auxiliares">Auxiliares</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/administration/parametros">Parametros</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/administration/perfiles">Perfiles</Link>
                                <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={onSelect} href="/intranet/pages/administration/users">Usuarios</Link>
                            </div>
                        )}
                    </li>
                </ul>
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 bg-[#E6E6F1] placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rounded-full">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M15 15l5-5m0 0l-5-5m5 5h-12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;