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
    const [dataInfo,setDataInfo] = useState<any>([]);
    const [novedades, setNovedades] = useState<novedad[]>([]);
    const getData= async () => {
        const info = await novedadesServices.getList(1,10,"",3,"desc");
        const data = info.data
        const list: any = data.reverse((item:novedad)=>item.vdescripcion_estado==='ACTIVO');
        setDataInfo(info);
        setNovedades(data);
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
                dataInfo.IsSuccess ? (
                <div className=" relative flex w-full h-[500px] bg-white rounded-2xl mt-3 rounded-e-xl overflow-hidden">
                    <img className="w-full h-full object-cover" src={`/images/${novedades[0]?.vimagen}`}/>
                    <div className="absolute h-full w-1/2 text-white">
                                <div className="bg-[#31BAFF] h-40 p-6 rounded-br-full rounded-tl-lg w-full">
                                    <h1 className="flex text-5xl font-bold justify-center"> {novedades[0]?.vtitulo}</h1>
                                </div>
                                <div className="mt-4 p-4 text-xl">
                                    <h3><b>{novedades[0]?.vtextobreve}</b></h3>
                                </div>
                
                    </div>
                </div>
                ) : (
                    <div className="bg-white border-b hover:bg-gray-50">
                        <div className="px-6 py-4 font-medium text-gray-900 text-center">
                                        Lo sentimos, aún no se han registrado datos!
                        </div>
                    </div>

                )
            
            } 
        </div>
    );
}
