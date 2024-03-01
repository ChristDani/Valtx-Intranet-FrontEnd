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

  return (
    <div>
      {/* Sidebar */}
      <div className="flex flex-shrink-0 bg-white h-16 justify-between left-0 top-[4rem] w-full p-3 rounded-full">
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
            className="px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 bg-[#E6E6F1] placeholder-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rounded-full">
            {/* <svg
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
                      </svg> */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 19L14.657 14.657M14.657 14.657C15.3999 13.9141 15.9892 13.0321 16.3912 12.0615C16.7933 11.0909 17.0002 10.0506 17.0002 8.99996C17.0002 7.94936 16.7933 6.90905 16.3913 5.93842C15.9892 4.96779 15.3999 4.08585 14.657 3.34296C13.9141 2.60007 13.0322 2.01078 12.0616 1.60874C11.0909 1.20669 10.0506 0.999756 9.00002 0.999756C7.94942 0.999756 6.90911 1.20669 5.93848 1.60874C4.96785 2.01078 4.08591 2.60007 3.34302 3.34296C1.84269 4.84329 0.999817 6.87818 0.999817 8.99996C0.999817 11.1217 1.84269 13.1566 3.34302 14.657C4.84335 16.1573 6.87824 17.0002 9.00002 17.0002C11.1218 17.0002 13.1567 16.1573 14.657 14.657Z" stroke="#7D7E8A" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;