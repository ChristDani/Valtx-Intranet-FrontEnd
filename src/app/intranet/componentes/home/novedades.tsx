'use client'

import { useEffect } from "react";
import { novedadesServices } from "../../services/mantenedores/novedades.service";

export const Novedades = () =>{

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="text-lg global-main-text"> Novedades </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex w-full h-96 bg-white rounded-2xl mt-3">
            <div className=" h-full w-2/3">
                        {/** Header */}
                        <div className="bg-[#31BAFF] h-44 p-4 rounded-br-full w-full">
                           <h1 className="flex text-6xl text-white justify-center"> Conoce al nuevo Gerente Comercial </h1>
                        </div>
                        {/** Content */}
                        <div className="p-4 pr-10">
                            <h3 className="text-xl"><b>José Antonio Becerra</b></h3>
                            <h3><b>Master of Business Administration (MBA) por la Pontificia Universidad Católica del Perú</b></h3>
                            <br></br>
                            <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores, soluta amet.</p>
                        </div>
                </div>
                <div className="h-full  w-1/3">
                        <div className="flex h-60 pt-4 justify-center w-full">
                            <div className="h-[80%] w-[60%] rounded-full bg-cover"
                                style={{ backgroundImage: `url(gerente.png)` }}>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}