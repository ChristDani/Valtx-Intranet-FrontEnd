'use client'

import { useEffect, useState } from "react";
import { enterateServices } from "../../services/mantenedores/enterate.service";

export const Enterate = () =>{

    const [items, setItems] = useState([{vimagen:'', vlink:''}]);

    useEffect(()=>{

        getEnterate();

    }, []);

    const getEnterate = async () =>{
        try{

            const enterate = await enterateServices.getEnterateList(1, 10);

            const enterateList = enterate.data;
            setItems(enterateList);

        }catch(e){

        }
    }

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex flex-col rounded-2xl justify-between">

                <div className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full">
                    <span className="flex absolute align-middle h-full justify-center  w-full">     
                        <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>                  
                    </span>
                    
                    {items.length > 1 ? <img src={`/images/${items[0].vimagen}`} /> : null}
                </div>
                <div className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full">
                    <span className="flex absolute align-middle h-full justify-center  w-full">     
                        <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>                  
                    </span>
                    
                    {items.length > 1 ? <img src={`/images/${items[1].vimagen}`} /> : null}
                </div>
                
            </div>
        </div>
    );
}