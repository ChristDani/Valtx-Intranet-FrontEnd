'use client'

import { useEffect, useState } from "react";
import { Icons, IconsResponseDTO } from "../interfaces/icons.response.dto";
import { iconServices } from "../services/mantenedores/iconos.service";
import { Links, LinksResponseDTO } from "../interfaces/links.response.dto";
import { linkServices } from "../services/mantenedores/enlaces.service";
import ImagenFront from "./mantenedores/imagenFront";

export const Footer = () =>{

    const [iconList, setIconList] = useState<Icons[]>([]);
    const [linkList, setLinkList] = useState<Links[]>([]);

    const goToLink = (vlink: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(`http://${vlink}`);
    }

    useEffect(()=> {
        getIcons()
        getEnlaces()
    },[])

    const getIcons = async () => {
        try {
            
            const icons: IconsResponseDTO = await iconServices.getListWeb(1,10,"",3,8,"asc");
            const iconsL: Icons[] = icons.data;
            iconsL.sort((a: any, b:any) => a.iorden - b.iorden);
            setIconList(iconsL);
            

        } catch (error) {
            
        }
    }

    const getEnlaces = async () => {
        try {
            const links: LinksResponseDTO = await linkServices.getListWeb(1,10,"",3,"asc");
            const linksL: Links[] = links.data;
            linksL.sort((a:any, b:any) => a.iorden - b.iorden);
            setLinkList(linksL)
            
        } catch (error) {
            
        }
    }



    return(

        <footer className="flex flex-row bg-[#0C3587] min-h-60 justify-center w-full ">
            <div className="flex h-full justify-between pt-9 w-[80%] max-md:gap-4 max-md:flex-col max-md:items-center max-md:text-center max-lg:gap-2 max-lg:w-full max-lg:px-4">
                
                {/** contenedor de sistemas de apoyo */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Sistemas de apoyo</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">
                        {
                            linkList.map((link) => (
                                <div key={link.iid_enlace}
                                    className="h-16 w-20 bg-gray-300 rounded-xl mr-2 cursor-pointer"
                                    onClick={()=>{goToLink(link.vlink)}}
                                >
                                    <ImagenFront src={link.vimagen} alt={link.vtitulo} className=""/>
                                </div>
                            ))
                        }

                    </div>

                </div>
                

                {/** contenedor de sistemas de certificaciones */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Certificaciones</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">
                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-1.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-3.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-1.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                    </div>

                </div>


                {/** contenedor de sistemas de redes */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Redes Valtx</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">

                        {
                            iconList.map((icon) => (
                                <div key={icon.iid_icono}
                                    className="bg-contain cursor-pointer h-16 w-16 rounded-xl mr-2"
                                    onClick={()=>{goToLink(icon.vlink)}}
                                    >
                                    <img src={`/images/${icon.vimagen}`}
                                        alt={icon.vtitulo}
                                    />
                                </div>
                            ))
                        }

                    </div>

                </div>


            </div>
        </footer>

    );
}