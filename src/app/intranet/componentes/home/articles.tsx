'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogServices } from "../../services/mantenedores/blogs.service";
import { Article, ArticleResponseDTO } from "../../interfaces/article.response.dto";
import ImagenFront from "../mantenedores/imagenFront";

const Articles = () => {

    const [articles, setArticles] = useState<Article[]>([]);

    { }
    useEffect(() => {
        getArticles();
    }, []);

    useEffect(() => {

    }, [articles])

    const getArticles = async () => {
        const articlesRes: ArticleResponseDTO = await blogServices.getListWeb(1, 3, "", 3, "asc");
        const articlesList: Article[] = articlesRes.data;
        setArticles(articlesList);
    }

    const goLink = (link:string) =>{
        let banner = link
          if(banner== null || banner == '') return;
          if(!banner.startsWith("https://")){
            banner = `https://${banner}`
        }
          window.open(`${banner}`, "blank");
      }


    return (

        <>
            <div className="flex justify-between align-bottom font-bold mt-4 w-full">
                <h1 className="text-lg global-main-text"> Nuestro blog </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/blog">Ver todos</Link>
            </div>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-2 justify-items-center">

                {articles ? articles.map((article, index) => (

                    <div key={index} className="max-w-xs my-4 max-h-[400px] rounded-lg overflow-hidden shadow-lg bg-slate-50 max-md:w-full">
                        <ImagenFront src={article.vimagen} className="object-cover max-h-40 w-full mx-auto"/>
                        <div className="flex flex-col gap-4 p-4">
                            <div className="font-bold text-xl line-clamp-2">{article.vtitulo}</div>
                            <p className="max-h-[70px] text-gray-700 text-base line-clamp-3">
                                {article.vtextobreve}
                            </p>
                            <div className="flex justify-end mb-2 text-sky-500 cursor-pointer" onClick={()=>goLink(article.vlink)}>
                                Leer más -{'>'}
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </>

    );
}

export default Articles;