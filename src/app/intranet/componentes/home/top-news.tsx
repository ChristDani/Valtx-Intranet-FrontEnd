'use client'

import { useEffect, useState } from "react";
import { newsServices } from "../../services/mantenedores/news.service";
import { Noticias, NoticiasResponseDTO } from "../../interfaces/news.response.dto";
import Link from "next/link";
const TopNews = () =>{


    const [dataInfo, setDataInfo] = useState<any>([]);
    const [newsList, setNewsList] = useState<Noticias[]>([]);

    useEffect(()=>{

        getNews();

    }, []);


    const getNews = async () =>{
        try{

            const news: NoticiasResponseDTO = await newsServices.getListWeb(1, 2, "", 3, "desc");
            const newsL: Noticias[] = news.data;
            newsL.sort((a:any, b:any)=> a.iorden - b.iorden);
            setDataInfo(news);
            setNewsList(newsL);
        }catch(e){
            console.log(e);
        }
    }

    const goLink = (vlink: string, redireccion: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(`http://${vlink}`, redireccion);
      }

      
    return(
        
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="global-main-text text-lg"> Valtx news </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/noticias">Ver todos</Link>
            </div>
            <div className="flex gap-3 w-full h-64">
                {
                    dataInfo.IsSuccess ? (
                        newsList.map((item:Noticias, index)=>(
                            <div key={index} className="w-1/2 h-full" onClick={()=>{goLink(item.vlink, item.vredireccion)}}>
                                <div className="h-full rounded-2xl overflow-hidden bg-white bg-cover hover:cursor-pointer">
                                    <img className="h-full" src={`/images/${item.vimagen}`}/>
                                </div>
                            </div>
                        ))
                ):(
                    <div className="bg-white border-b hover:bg-gray-50 w-full ">
                        <div className="px-6 py-4 font-medium text-gray-900 text-center">
                                        Lo sentimos, aún no se han registrado datos!
                        </div>
                    </div>
                )
                }

            </div>
        </div>
            
    );
}

export default TopNews;