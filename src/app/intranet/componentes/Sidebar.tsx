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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0321 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94936 18.7933 8.90905 18.3913 7.93842C17.9892 6.96779 17.3999 6.08585 16.657 5.34296C15.9141 4.60007 15.0322 4.01078 14.0616 3.60874C13.0909 3.20669 12.0506 2.99976 11 2.99976C9.94942 2.99976 8.90911 3.20669 7.93848 3.60874C6.96785 4.01078 6.08591 4.60007 5.34302 5.34296C3.84269 6.84329 2.99982 8.87818 2.99982 11C2.99982 13.1217 3.84269 15.1566 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z" stroke="#7D7E8A" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;