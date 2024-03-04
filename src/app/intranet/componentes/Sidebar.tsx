'use client';

import { SetStateAction, useState } from 'react';
import Link from "next/link";

import { IoHomeOutline } from "react-icons/io5";
import { RiTeamLine } from "react-icons/ri";
import { LiaShareAltSolid } from "react-icons/lia";
import { GiGraduateCap } from "react-icons/gi";
import { CiBullhorn } from "react-icons/ci";


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

    return(
        <div>
        {/* Sidebar */}
        <div className="flex flex-shrink-0 bg-white h-16 justify-between left-0 top-[4rem] w-full p-3 rounded-full">
        <ul className="flex align-middle justify-center w-fit">
            <li className="flex px-6 py-3 text-gray-900 hover:bg-gray-300 rounded-2xl cursor-pointer">
                <Link href="/intranet" className="flex items-center">
                    <IoHomeOutline size={20} /> <p className="pl-3">Inicio</p>
                </Link>
            </li>
            <li className="relative">
                <div className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer" onClick={() => toggleItem('item2')}>
                    <RiTeamLine size={20} /> <p className="pl-3">Nosotros</p>
                </div>
                {expandedItem === 'item2' && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <Link href="/intranet/pages/us" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 1</Link>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 2</div>
                    </div>
                )}
            </li>
            <li className="relative">
                <div className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer" onClick={() => toggleItem('item3')}>
                    <LiaShareAltSolid size={20} /> <p className="pl-3">Áreas</p>
                </div>
                {expandedItem === 'item3' && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <Link href="/intranet/pages/areas" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 1</Link>
                    </div>
                )}
            </li>
            <li className="relative">
                <div className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer" onClick={() => toggleItem('item4')}>
                    <GiGraduateCap size={20} /> <p className="pl-3">E-learning</p>
                </div>
                {expandedItem === 'item4' && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subitem 1</div>
                    </div>
                )}
            </li>
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer">
                <CiBullhorn size={20} /><p className="pl-3">Noticias</p>
            </li>
            <li className="relative">
                <div className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer" onClick={() => toggleItem('item5')}>Mantenedores</div>
                {expandedItem === 'item5' && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Artículos</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Banners</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Blogs</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Documentaciones</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Enlaces</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Entérate</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Eventos</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Iconos</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Valtx News</div>
                    </div>
                )}
            </li>
            <li className="relative">
                <div className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-2xl cursor-pointer" onClick={() => toggleItem('item6')}>Administración</div>
                {expandedItem === 'item6' && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Auxiliares</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Parametros</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Perfiles</div>
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Usuarios</div>
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