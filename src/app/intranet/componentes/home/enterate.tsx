'use client'

import { useEffect, useState } from "react";
import { enterateServices } from "../../services/mantenedores/enterate.service";
import VideoModal from "./video-modal";
import { IEnterate, EnterateResponseDTO } from "../../interfaces/enterate.response.dto";

export const Enterate = () =>{

    const enterateDefault: IEnterate = {
        iid_enterate: 0,
        vtitulo: "",
        vtextobreve: "",
        vimagen: "",
        vlink: "",
        vredireccion: "",
        iorden: 0,
        dfecha: "",
        iid_estado_registro: 0,
        vdescripcion_estado: ""
    }

    const [items, setItems] = useState<IEnterate[]>([enterateDefault]);

    useEffect(()=>{

        getEnterate();

    }, []);

    const getEnterate = async () =>{
        try{

            const enterate: EnterateResponseDTO = await enterateServices.getList(1, 10, "", -1, "asc");

            const enterateList: IEnterate[] = enterate.data;
            setItems(enterateList);
            
        }catch(e){

        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
     const [videoUrl, setVideoUrl] = useState('');

    const openModal = (url:string) => {
        if(url==null || url == '') return;
        setVideoUrl(url);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setVideoUrl('');
        setIsModalOpen(false);
      };

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex flex-col rounded-2xl justify-between">

            {items && items.length > 0 && items.map((item, index) => (
            <div key={index} className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full"
                onClick={() => openModal(item.vlink)}>
                <span className="flex absolute align-middle h-full justify-center  w-full">
                    <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>
                </span>
                {item.vimagen && <img src={`/images/${item.vimagen}`} />}
            </div> ))}

            </div>
            {isModalOpen && <VideoModal onClose={closeModal} videoUrl={videoUrl} />}
        </div>
    );
}