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

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text">Documentos </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/document">Ver todos</Link>
            </div>
            {/** Contenido */}
            <div className="cursor-pointer flex flex-col rounded-2xl justify-between">

            {docums?.map((docum,index)=>(
                <div key={index} className="relative bg-cover cursor-pointer h-40 rounded-2xl overflow-hidden mt-3 w-full max-md:h-20" onClick={(e)=>openModal(e,docum.iid_documentacion)}>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-55 hover:opacity-25 z-30 max-md:bg-white">
                        
                    </span>
                    <span className="absolute flex gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 max-md:w-5/6">
                        <svg className="w-6 h-6 text-black hidden max-md:flex" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 16v-3h.375a.626.626 0 0 1 .625.626v1.749a.626.626 0 0 1-.626.625H6Zm6-2.5a.5.5 0 1 1 1 0v2a.5.5 0 0 1-1 0v-2Z"/>
                            <path fill-rule="evenodd" d="M11 7V2h7a2 2 0 0 1 2 2v5h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2H3a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6a2 2 0 0 0 2-2Zm7.683 6.006 1.335-.024-.037-2-1.327.024a2.647 2.647 0 0 0-2.636 2.647v1.706a2.647 2.647 0 0 0 2.647 2.647H20v-2h-1.335a.647.647 0 0 1-.647-.647v-1.706a.647.647 0 0 1 .647-.647h.018ZM5 11a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 9 15.375v-1.75A2.626 2.626 0 0 0 6.375 11H5Zm7.5 0a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 0 5 0v-2a2.5 2.5 0 0 0-2.5-2.5Z" clip-rule="evenodd"/>
                            <path d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Z"/>
                        </svg>
                        <h1 className="text-center text-white text-2xl max-md:text-[#0C3587] max-md:font-bold max-md:text-xl">
                            {docum.vtitulo}
                        </h1>
                    </span>
                    <img src={`/images/${docum.vimagen}`} className=" object-cover w-full h-full max-md:hidden"></img>
                </div>
            ))}
            
            </div>
            <ModalComponent isOpen={openIsModal} closeModal={closeModal}>
                <ManagerDoc close={closeModal} idDoc={idDoc}/>
            </ModalComponent>
        </div>
    );

}