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

    const goLink = (vlink: string, vredireccion: string) => {
        if (vlink == null || vlink == '') return;
        window.open(vlink, vredireccion);
    }


    return (

        <>
            <div className="flex justify-between align-bottom font-bold mt-4 w-full">
                <h1 className="text-lg global-main-text"> Nuestro blog </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/blog">Ver todos</Link>
            </div>
            <div className="flex gap-4 items-center max-md:flex-col">

                {articles ? articles.map((article, index) => (

                    <div key={index} className="max-w-xs my-4 max-h-[350px] rounded-lg overflow-hidden shadow-lg bg-slate-50 max-md:w-full">
                        <ImagenFront src={article.vimagen} className="object-cover max-h-40 w-full mx-auto"/>
                        <div className="flex flex-col gap-4 first-letter:w-full p-4">
                            <div className="h-10 font-bold text-xl">{article.vtitulo}</div>
                            <p className="h-[70px] text-gray-700 text-base line-clamp-3">
                                {article.vtextobreve}
                            </p>
                            <div className="flex justify-end mb-2">
                                <Link href={`http://${article.vlink}`} className="global-secondary-text">Leer más -{'>'}</Link>
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </>

    );
}

export default Articles;