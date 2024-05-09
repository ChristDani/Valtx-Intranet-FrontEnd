'use client'

import { useEffect, useState } from "react";
import { documentacionServices } from "../../services/mantenedores/document.service";
import { Documentation, DocumentationResponseDTO } from "../../interfaces/documentacion.response.dto";
import ModalComponent from "../mantenedores/modal";
import ManagerDoc from "../../pages/views/document/ManagerDocument";
import Link from "next/link";
export const Documentacion = () => {
    const [openIsModal, setModalIsOpen] = useState(false);
    const [idDoc, setIdDoc] = useState(0);

    const closeModal = () => {
        setModalIsOpen(false);
        setIdDoc(0);
    }
    const openModal = (e: any, id: number) => {
        e.preventDefault();
        setModalIsOpen(true);
        setIdDoc(id);
    }
    const [docums, setDocumns] = useState<Documentation[]>([]);

    useEffect(() => {
        getAllDocumentation();
    }, []);



    const getAllDocumentation = async () => {
        const docum: DocumentationResponseDTO = await documentacionServices.getListWeb(1, 10, "", 3, "asc");
        const documList: Documentation[] = docum.data;
        setDocumns(documList);

    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text">Documentos </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/document">Ver todos</Link>
            </div>
            {/** Contenido */}
            <div className="cursor-pointer flex flex-col rounded-2xl justify-between">

                {docums?.map((docum, index) => (
                    <div key={index} className="relative bg-cover cursor-pointer h-40 rounded-2xl overflow-hidden mt-3 w-full max-md:h-20" onClick={(e) => openModal(e, docum.iid_documentacion)}>
                        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-55 hover:opacity-25 z-30 max-md:bg-white">

                        </span>
                        <span className="absolute flex gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 max-md:w-5/6">
                            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd" />
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
                <ManagerDoc close={closeModal} idDoc={idDoc} />
            </ModalComponent>
        </div>
    );

}