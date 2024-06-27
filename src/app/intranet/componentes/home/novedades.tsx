'use client'

import { useEffect, useState } from "react";
import { novedadesServices } from "../../services/mantenedores/novedades.service";
import Link from "next/link";
import ImagenFront from "../mantenedores/imagenFront";
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
        const info = await novedadesServices.getListWeb(1,10,"",3,"desc");
        const data = info.data
        setDataInfo(info);
        setNovedades(data);
    }

    useEffect(()=>{
        getData();
    },[])

    const goToLink = (vlink: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(`http://${vlink}`);
    }
    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="text-lg global-main-text"> Novedades</h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/novedad">Ver todos</Link>
            </div>

            {/** Contenido */}
            {
                dataInfo.IsSuccess ? (
                <div className=" relative flex w-full max-h-[500px] bg-white rounded-2xl mt-3 rounded-e-xl overflow-hidden max-md:h-[300px]" onClick={()=>goToLink(novedades[0]?.vlink)}>
                    <ImagenFront className="w-full h-full object-cover" src={novedades[0]?.vimagen}/>
                    <div className="absolute h-full w-1/2 text-white max-md:w-3/4">
                                <div className="flex items-center bg-[#31BAFF] h-1/2 p-4 rounded-br-[100px] rounded-tl-lg max-sm:h-2/5">
                                    <h1 className="p-2 text-5xl font-bold max-sm:text-3xl max-sm:w-full"> {novedades[0]?.vtitulo}</h1>
                                </div>
                                <div className="mt-4 p-4 text-xl max-sm:text-base">
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
