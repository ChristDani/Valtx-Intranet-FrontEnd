'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogServices } from "../../services/mantenedores/blogs.service";
import { Article, ArticleResponseDTO } from "../../interfaces/article.response.dto";

const Articles = () =>{

    const [articles, setArticles] = useState<Article[]>([]); 

{}
    useEffect(()=>{
        getArticles();
    }, []);

    useEffect(()=>{
        
    }, [articles])

    const getArticles = async () =>{
        const articlesRes: ArticleResponseDTO = await blogServices.getList(1,3, "", 3, "asc");
        const articlesList: Article[] = articlesRes.data;
        setArticles(articlesList);
    }

    const goLink = (vlink: string, vredireccion: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(vlink, vredireccion);
      }


    return(

        <>
        <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Nuestro blog </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/blog">Ver todos</Link>
            </div>
        <div className="flex gap-5">

        {articles? articles.map((article, index) => (

            <div key={index} className="flex flex-col bg-white my-8 rounded-xl w-[32%]"
                    onClick={()=>{goLink(article.vlink, article.vredireccion)}}>

                <div className="h-52 overflow-hidden rounded-t-xl w-full">
                    <img src={`/images/${article.vimagen}`} className="w-full"></img>
                </div>
                <div className="ml-6">
                    <div className="flex mt-2">
                        <h3 className="font-bold text-xl text-[#00245F]">{article.vtitulo}</h3>
                        <div className="rounded-full h-auto ml-4 bg-sky-500 self-center"></div>
                    </div>
                    <br></br>
                    <p className="text-[#00245F] line-clamp-2">{article.vtextobreve}</p>
                </div>
                
                <div className="flex mt-9 justify-end mr-3 mb-3">
                    <Link href={''} className="global-secondary-text">Leer más -{'>'}</Link>
                </div>
            </div>
        )): null} 
        </div>
    </>

    );
}

export default Articles;