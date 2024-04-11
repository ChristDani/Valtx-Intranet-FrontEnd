'use client'

import { useEffect, useState } from "react";
import { novedadesServices } from "../../services/mantenedores/novedades.service";
import Link from "next/link";
interface novedad{
    iid_novedad: number,
    vtitulo: string,
    vtextobreve: string,
    vimagen: string,
    vlink: string,
    vdescripcion_estado: string
}
export const Novedades = () =>{

    const [novedades, setNovedades] = useState<novedad>();
    const getData= async () => {
        const {data} = await novedadesServices.getList(1,10,"",3,"asc");
        const list: any = data.reverse((item:novedad)=>{
            if(item.vdescripcion_estado==='ACTIVO'){
                return item
            }
        });
        setNovedades(list[0]);
    }

    useEffect(()=>{
        getData();
    },[])

    
    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="text-lg global-main-text"> Novedades</h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/novedad">Ver todos</Link>
            </div>

            {/** Contenido */}
            {
            <div className=" relative flex w-full h-96 bg-white rounded-2xl mt-3">
            <img className="w-full" src={`/images/${novedades?.vimagen}`}/>
            <div className="absolute h-full w-1/2 text-white">
                            <div className="bg-[#31BAFF] h-44 p-6 rounded-br-full rounded-tl-lg w-full">
                                <h1 className="flex text-5xl font-bold justify-center"> {novedades?.vtitulo}</h1>
                            </div>
                            <div className="p-4 pr-10">
                                <h3><b>{novedades?.vtextobreve}</b></h3>
                            </div>
            
                </div>
            </div>
            } 
        </div>
    );
}