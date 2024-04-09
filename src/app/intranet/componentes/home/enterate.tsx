'use client'

import { useEffect, useState } from "react";
import { enterateServices } from "../../services/mantenedores/enterate.service";
import { IEnterate, EnterateResponseDTO } from "../../interfaces/enterate.response.dto";
import ModalComponent from '../mantenedores/modal';

export const Enterate = () => {

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

    const [urlvideo, seturlVideo] = useState<string>();
    const [Title, setTitle] = useState<string>();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (url: string, titulo: string) => {
        seturlVideo(url)
        setTitle(titulo)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {

        getEnterate();

    }, []);

    const getEnterate = async () => {
        try {

            const enterate: EnterateResponseDTO = await enterateServices.getList(1, 2, "", 3, "asc");

            const enterateList: IEnterate[] = enterate.data;
            setItems(enterateList);

        } catch (e) {

        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex flex-col rounded-2xl justify-between">

                {items && items.length > 0 && items.map((item, index) => (
                    <div key={index} className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full"
                        onClick={() => openModal(item.vlink, item.vtitulo)}>
                        <span className="flex absolute align-middle h-full justify-center  w-full">
                            <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>
                        </span>
                        {item.vimagen && <img className="h-full w-full" src={`/images/${item.vimagen}`} />}
                    </div>))}

            </div>

            {/* modal */}
            <ModalComponent isOpen={modalIsOpen} closeModal={closeModal}>
                <>
                    {/* <div className="flex fixed rounded-xl p-6 align-middle justify-center m-auto top-0 left-0 w-full h-full modal z-40"> */}
                    <div className={`rounded-xl m-auto h-auto w-[700px]`}>
                        {/** Capa opacidad */}
                        {/* <div className="fixed top-0 left-0 bg-black opacity-50 h-full w-full modal-overlay"
                            onClick={closeModal}>

                        </div> */}

                        {/** Contenedor de video */}
                        <div className="relative video-container m-auto z-50">
                            <span className="flex absolute top-0 right-0 bg-white cursor-pointer font-bold items-center 
                justify-center rounded-full translate-x-4 -translate-y-4 w-[30px] h-[30px]"
                                onClick={closeModal}
                            >X</span>

                            <iframe
                                width={700}
                                height={400}
                                src={`/videos/${urlvideo}`}
                                title={Title}
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                    </div>
                </>
            </ModalComponent>
        </div>
    );
}