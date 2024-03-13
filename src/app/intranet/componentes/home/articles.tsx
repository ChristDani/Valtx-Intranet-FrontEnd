'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogServices } from "../../services/mantenedores/blogs.service";

const Articles = () =>{

    const [articles, setArticles] = useState([{vtitulo:'', vtextobreve:'', vlink:'', vimagen:''}]); 

{}
    useEffect(()=>{
        getArticles();
    }, []);

    useEffect(()=>{
        
    }, [articles])

    const getArticles = async () =>{
        const articlesRes = await blogServices.getList(1,10);
        const articlesList = articlesRes.data;
        console.log(articlesRes);
        setArticles(articlesList);
    }

    return(

        <>
        <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Nuestro blog </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>
        <div className="flex justify-between">

        {articles.map((article, index) => (

            <div className="flex flex-col bg-white my-8 rounded-xl w-[32%]">

                <div className="bg-[red] h-52 overflow-hidden rounded-t-xl w-full">
                    <img src={`/images/${article.vimagen}`}></img>
                </div>
                <div className="ml-6">

                    <div className="flex mt-2">
                        <h3 className="font-bold text-xl text-[#00245F]">{article.vtitulo}</h3>
                        <div className="rounded-full h-auto ml-4 bg-sky-500 self-center"></div>
                    </div>
                    <br></br>
                    <p className="text-[#00245F]">{article.vtextobreve}</p>
                </div>
                
                <div className="flex mt-9 justify-end mr-3 mb-3">
                    <Link href={''} className="global-secondary-text">Ver detalles -{'>'}</Link>
                </div>
            </div>
        ))}
        </div>
    </>

    );
}

export default Articles;