'use client';

import { useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const toggleItem = (itemName: string) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

    return(
        <div>
        {/* Sidebar */}
        <div className="flex flex-shrink-0 bg-white h-16 justify-between left-0 top-[4rem] w-full p-3 rounded-2xl">
          <ul className="flex align-middle  justify-center w-fit">
            <Link href="/intranet" className="flex px-6 py-3 text-gray-900 hover:bg-gray-300 rounded-2xl cursor-pointer">
            <IoHomeOutline size={20} /> <p className="pl-3">Inicio</p>
            </Link>
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300 rounded-xl cursor-pointer" onClick={() => toggleItem('item2')}>
            <RiTeamLine size={20} /> <p className="pl-3">Nosotros</p>
            </li>
              {expandedItems['item2'] && (
                <ul className="pl-8">
                  <Link href="/intranet/pages/us" className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Subitem 1</Link>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Subitem 2</li>
                </ul>
              )}
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300  rounded-2xl cursor-pointer" onClick={() => toggleItem('item3')}>
            <LiaShareAltSolid size={20} /> <p className="pl-3">Áreas</p>
            </li>
              {expandedItems['item3'] && (
                <ul className="pl-8">
                  <Link href="/intranet/pages/areas" className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Subitem 1</Link>
                </ul>
              )}
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300  rounded-2xl cursor-pointer" onClick={() => toggleItem('item4')}>
            <GiGraduateCap size={20} /> <p className="pl-3">E-learning</p>
            </li>
              {expandedItems['item4'] && (
                <ul className="pl-8">
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Subitem 1</li>
                </ul>
              )}
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300  rounded-2xl cursor-pointer">
            <CiBullhorn size={20} /><p className="pl-3">Noticias</p>
            </li>
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300  rounded-2xl cursor-pointer" onClick={() => toggleItem('item5')}>Mantenedores</li>
              {expandedItems['item5'] && (
                <ul className="pl-8">
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Artículos</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Banners</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Blogs</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Documentaciones</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Enlaces</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Entérate</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Eventos</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Iconos</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Valtx News</li>
                </ul>
              )}
            <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-300  rounded-2xl cursor-pointer" onClick={() => toggleItem('item6')}>Administración</li>
              {expandedItems['item6'] && (
                <ul className="pl-8">
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Auxiliares</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Parametros</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Perfiles</li>
                  <li className="flex px-6 py-3 text-gray-700 hover:bg-gray-200  rounded-xl cursor-pointer">Usuarios</li>
                </ul>
              )}
          </ul>
          <div className="relative flex">
            <input
                      type="text"
                      placeholder="Buscar"
                      className="px-4 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rounded-2xl">
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