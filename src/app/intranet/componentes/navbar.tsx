'use client'

import LogoutService from '@/app/authentication/services/logout.service';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalComponent from './mantenedores/modal';
import { FaRegUserCircle } from 'react-icons/fa';
import { PerfilesService } from '../services/administration/perfiles.service';
import Link from 'next/link';
import { Icons, IconsResponseDTO } from '../interfaces/icons.response.dto';
import { iconServices } from '../services/mantenedores/iconos.service';


export default function Navbar() {

    
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [opened, setOpened] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [iconList, setIconList] = useState<Icons[]>([]);

    useEffect(()=>{
        validatePerfil();
        getIcons();
    }, []);

    const validatePerfil = async () =>{
        const perfilId = localStorage.getItem("perfil") || '';
        const perfil = await PerfilesService.getPerfilById(perfilId);
        
    }

    const UserName = async () => {
        const userdoc = localStorage.getItem("userDocument");
        const userName = localStorage.getItem("userName") + ' ' + localStorage.getItem("userFirstLastName") + ' ' + localStorage.getItem("userSecondLastName");
        setNombre(userName);
    }

    const toggleModal = () =>{
        setOpened(!opened);
    }



    const confirmLogout = () =>{

        LogoutService();
        router.push('/authentication');

    }

    const closeModal = () => {

        setModalIsOpen(false);

    };

    const getIcons = async () => {
        try {
            
            const icons: IconsResponseDTO = await iconServices.getList(1,10,"",3,7,"asc");
            const iconsL: Icons[] = icons.data;

            if (iconsL.length > 0) {
                const primerIcono = iconsL[0]; // Obtener el primer elemento del array
                setIconList([primerIcono]); // Establecer el estado con un array que contiene solo el primer icono
            } else {
                console.log("La lista de iconos está vacía.");
            }
            
        } catch (error) {
            
        }
    }

    return (

        <div className="flex items-center h-16 justify-between my-6 mr-4 text-white top-0 w-full">
            <div className="relative flex"> 
                {
                    iconList.map((icon) => (
                        <Link key={icon.iid_icono} href={icon.vlink}>
                            <img src={`/images/${icon.vimagen}`} alt={icon.vtitulo} height={200} width={200} />
                        </Link>
                    ))
                }
                
            </div>
            <div className="flex items-center">
                <FaRegUserCircle className="w-10 h-10 bg-[#0C3587] rounded-full mr-4" />
                <h3 className="text-[#0C3587] mr-2">Hola, <br></br> <b>{localStorage.getItem("userName")} {localStorage.getItem("userFirstLastName")} {localStorage.getItem("userSecondLastName")}</b></h3>  
                <div className="relative flex pt-4 h-[50px] rounded-md">
                    {/** DropDown */}
                    {
                        opened ? 
                        <div className="origin-top-right absolute right-0 mt-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="py-1" role="none">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Configuraciones</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Ayuda</a>
                            <div className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={()=>{setModalIsOpen(true)}}>Cerrar Sesión</div>
                        </div>
                    </div> : null
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-5 w-5 text-[#0C3587]" viewBox="0 0 20 20" fill="currentColor" onClick={toggleModal}>
                        <path fillRule="evenodd" d="M10 12l-5.707-5.707a1 1 0 0 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 0 1 1.414 1.414L10 12z" clipRule="evenodd" />
                    </svg>
            </div>    
        </div>

        {/** Modal para confirmar Logout */}
        <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
        <div className="justify-center flex-col w-[400px]  mx-auto block p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h1 className=''><strong>Cerrar sesión</strong></h1>
            <p className='text-xs mt-2'>¿Quieres salir de tu banca por internet?</p>
            <div className="flex mt-5 justify-end">
                <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 w-20 hover:bg-[#0C3587] hover:text-white"  onClick={closeModal}>No</button>
                <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-20 hover:text-white hover:bg-[#0e0c87]" onClick={confirmLogout}>Si</button>
            </div>
        </div>
    </ModalComponent>
    </div>

    );
}