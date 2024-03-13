'use client'

import { useEffect, useState } from "react";
import { documentacionServices } from "../../services/mantenedores/document.service";

export const Documentacion = () =>{

    const [docums, setDocumns] = useState<any[]>([]);

    useEffect(()=>{
        getAllDocumentation();
    }, []);



    const getAllDocumentation = async () =>{
        const docum = await documentacionServices.getDocumentaciones(1,10);
        const documList = docum.data;
        setDocumns(documList);

    }

    const goLink = (vlink: string, redireccion: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(vlink, redireccion);
      }

    return(
        <div className="flex flex-col">
            <div className="flex align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Documentación </h1>
            </div>

            {/** Contenido */}
            <div className="cursor-pointer flex flex-col rounded-2xl justify-between">

            {docums.map((docum,index)=>(
                <div key={index} className="relative bg-cover cursor-pointer h-44 rounded-2xl overflow-hidden mt-3 w-full" onClick={() => { goLink(docum.vlink, docum.vredireccion) }}>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-55 hover:opacity-25 z-30">
                        
                    </span>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
                        <h1 className="text-white text-2xl">
                            {docum.vtitulo}
                        </h1>
                    </span>
                    <img src={`/images/${docum.vimagen}`} className="easy-in duration-500 w-full"></img>
                </div>
            ))}
            
            </div>
        </div>
    );

}