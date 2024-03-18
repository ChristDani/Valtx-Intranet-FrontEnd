'use client';

import Image from 'next/image'
import { useState } from 'react';

export default function Navbar() {

    const [nombre, setNombre] = useState('');

    const UserName = async () => {
        const userdoc = localStorage.getItem("userDocument");
        const userName = localStorage.getItem("userName") + ' ' + localStorage.getItem("userFirstLastName") + ' ' + localStorage.getItem("userSecondLastName");
        setNombre(userName);
    }

    return (

        <div className="flex items-center h-16 justify-between my-6 mr-4 text-white top-0 w-full">
            <div className="relative flex">
                <Image src='/icons/conexion.png' alt={''} height={200} width={200}></Image>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 bg-[#0C3587] rounded-full mr-4" />
                <h3 className="text-[#0C3587] mr-2">Hola, <br></br> <b>{localStorage.getItem("userName")} {localStorage.getItem("userFirstLastName")} {localStorage.getItem("userSecondLastName")}</b></h3> 
                {/**<div className="flex pt-4 h-[50px] rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0C3587]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12l-5.707-5.707a1 1 0 0 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 0 1 1.414 1.414L10 12z" clipRule="evenodd" />
                    </svg>
                    </div> */}
            </div>

        </div>

    );
}