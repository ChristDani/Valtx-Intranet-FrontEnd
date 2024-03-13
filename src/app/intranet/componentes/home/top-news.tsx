'use client'

import { useEffect, useState } from "react";
import { newsServices } from "../../services/mantenedores/news.service";

const TopNews = () =>{

    const [newsList, setNewsList] = useState([{vimagen:'', vlink:'', vredireccion:''}]);

    useEffect(()=>{

        getNews();

    }, []);


    const getNews = async () =>{
        try{

            const news = await newsServices.getNews(1,10);
            const newsL = news.data;
            newsL.sort((a:any, b:any)=> a.iorden - b.iorden);
            setNewsList(newsL);

        }catch(e){

        }
    }

    const goLink = (vlink: string, redireccion: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(vlink, redireccion);
      }


    return(
        
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="global-main-text text-lg"> Valtx news </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>
            <div className="flex flex-row w-full h-64">

                <div className="w-1/2 h-[100%] p-4 pl-0" onClick={()=>{goLink(newsList[0].vlink, newsList[0].vredireccion)}}>
                    {newsList.length > 1 ? <div className="h-full rounded-2xl bg-white bg-cover hover:cursor-pointer" style={{ backgroundImage: `url(/images/${newsList[0].vimagen})`}}></div> : null}
                </div>

                <div className="w-1/2 h-[100%] p-4 pr-0" onClick={()=>{goLink(newsList[1].vlink, newsList[1].vredireccion)}}>
                    {newsList.length > 1 ? <div className="h-full rounded-2xl bg-white bg-cover hover:cursor-pointer" style={{ backgroundImage: `url(/images/${newsList[1].vimagen})`}}></div> : null}
                </div>

            </div>
        </div>
            
    );
}

export default TopNews;