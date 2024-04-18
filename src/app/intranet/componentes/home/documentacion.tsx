'use client'

import { useEffect, useState } from "react";
import { documentacionServices } from "../../services/mantenedores/document.service";
import { Documentation, DocumentationResponseDTO } from "../../interfaces/documentacion.response.dto";
import ModalComponent from "../mantenedores/modal";
import ManagerDoc from "../../pages/views/document/ManagerDocument";
import Link from "next/link";
export const Documentacion = () =>{
    const [openIsModal, setModalIsOpen] = useState(false);
    const [idDoc, setIdDoc] = useState(0);

    const closeModal=()=>{
        setModalIsOpen(false);
        setIdDoc(0);
    }
    const openModal = (e:any,id:number) => {
        e.preventDefault();
        setModalIsOpen(true);
        setIdDoc(id);
    }
    const [docums, setDocumns] = useState<Documentation[]>([]);

    useEffect(()=>{
        getAllDocumentation();
    }, []);



    const getAllDocumentation = async () =>{
        const docum: DocumentationResponseDTO = await documentacionServices.getListWeb(1,10, "", 3, "asc");
        const documList: Documentation[]  = docum.data;
        setDocumns(documList);

    }

    const goLink = (vlink: string, redireccion: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(vlink, redireccion);
      }

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text">Documentos </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/document">Ver todos</Link>
            </div>
            {/** Contenido */}
            <div className="cursor-pointer flex flex-col rounded-2xl justify-between">

            {docums && docums.length>0 && docums.map((docum,index)=>(
                <div key={index} className="relative bg-cover cursor-pointer h-44 rounded-2xl overflow-hidden mt-3 w-full" onClick={(e)=>openModal(e,docum.iid_documentacion)}>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-55 hover:opacity-25 z-30">
                        
                    </span>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
                        <h1 className="text-white text-2xl">
                            {docum.vtitulo}
                        </h1>
                    </span>
                    <img src={`/images/${docum.vimagen}`} className=" object-cover w-full h-full"></img>
                </div>
            ))}
            
            </div>
            <ModalComponent isOpen={openIsModal} closeModal={closeModal}>
                <ManagerDoc close={closeModal} idDoc={idDoc}/>
            </ModalComponent>
        </div>
    );

}