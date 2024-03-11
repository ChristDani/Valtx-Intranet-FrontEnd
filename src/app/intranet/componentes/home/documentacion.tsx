'use client'

import { useEffect, useState } from "react";
import { documentacionServices } from "../../services/mantenedores/document.service";

export const Documentacion = () =>{

    const [images, setImages] = useState<string[]>([]);

    useEffect(()=>{
        getAllDocumentation();
        console.log(images);
    }, []);

    
    useEffect(()=>{
        console.log(images)
      }, [images])
  

    const getAllDocumentation = async () =>{
        const docum = await documentacionServices.getDocumentaciones(1,10);
        const documList = docum.data;
        const imagesToAdd = documList.map((docum:any) => docum.vimagen);
        setImages(imagesToAdd);

    }

    return(
        <div className="flex flex-col">
            <div className="flex align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Documentación </h1>
            </div>

            {/** Contenido */}
            <div className="cursor-pointer flex flex-col rounded-2xl justify-between">

                <div className="bg-cover cursor-pointer  w-full h-40 rounded-2xl mt-3"
                        style={{ backgroundImage: `url(${`/images/${images[0]}`})` }}>

                </div>
                <div className="bg-cover cursor-pointer  w-full h-40 rounded-2xl mt-4"
                        style={{ backgroundImage: `url(${`/images/${images[1]}`})` }}>

                </div>

                <div className="bg-cover cursor-pointer  w-full h-40 rounded-2xl mt-4"
                        style={{ backgroundImage: `url(${`/images/${images[2]}`})` }}>

                </div>
                
            </div>
        </div>
    );

}