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
        <div className="bg-gray-100">
        {/* Sidebar */}
        <div className=" fixed flex-shrink-0 h-auto left-0 top-[4rem] w-80">
          <div className="flex items-center justify-center h-16  bg-gray-100">
            <h1 className="text-xl text-gray-600 font-bold">MENÚ</h1>
          </div>
          <ul>
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
          </ul>
          <hr></hr>
        </div>
        </div>
    );
}

export default Sidebar;