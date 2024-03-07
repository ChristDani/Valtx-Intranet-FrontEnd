'use client'
import Image from 'next/image'

export default function Navbar(){

    const UserName = async () => {
        const userdoc = localStorage.getItem("userDocument");
    }

    return(
        
        <div className="flex items-center h-16 justify-between my-6 text-white top-0 w-full">
                <div className="relative flex">
                    <Image src="ValtxIco.svg" alt="Descripción de la imagen" width={120} height={80} ></Image>
                </div>
                <div className="flex items-center">
            <img src="https://t3.ftcdn.net/jpg/04/77/87/44/360_F_477874414_kSQ9ip26804g8B3ItYsh5XsjNRgqf693.jpg" alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" />
            <h3 className="text-black mr-2">Hola, {localStorage.getItem("userName")} {localStorage.getItem("userFirstLastName")} {localStorage.getItem("userSecondLastName")}</h3>
            <div className="flex pt-4 h-[50px] rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12l-5.707-5.707a1 1 0 0 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 0 1 1.414 1.414L10 12z" clipRule="evenodd" />
            </svg>
            </div>
        </div>
  
      </div>

    );
}