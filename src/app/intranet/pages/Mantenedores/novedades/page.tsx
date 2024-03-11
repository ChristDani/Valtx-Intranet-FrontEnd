'use client';
import { useEffect, useState } from "react";
import { novedadesServices } from '../../../services/mantenedores/novedades.service';

import Image from 'next/image';
import Link from "next/link";

const NovedadesPage = () =>{

    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        getNovedades()
    }, [])

    const getNovedades = async () => {
        const novedadesList = await novedadesServices.getNovedades(1, 10);

        setNovedades(novedadesList.data)
    }
    
    return(

        <div /*className="mt-12 pt-6 ml-80"*/>
            <div>
                <h1>Novedades</h1>
                
                <div>
                    <select name="numberOfNovedades" id="numberOfNovedades">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                {
                    novedades.map(novedad => (

                        <Link href={"#"} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`/images/${novedad.vimagen}`} alt={`${novedad.vtextobreve}`} width={200} height={500} key={novedad.iid_novedad}></Image>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{novedad.vtitulo}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{novedad.vtextobreve}</p>
                            </div>

                        </Link>

                    ))
                }
            </div>
        </div>

    );
}

export default NovedadesPage;