'use client';
import { useEffect, useState } from "react";
import { bannerServices } from '../../../services/mantenedores/banner.service';

import Image from 'next/image';
import Link from "next/link";

const BannPage = () => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getBanners()
    }, [])

    const getBanners = async () => {
        const bannersList = await bannerServices.getBanners(1, 10);

        setBanners(bannersList.data)
    }

    return (

        <div /*className="mt-12 pt-6 ml-80"*/>
            <div>
                <h1>Banners</h1>
                <div>
                    <select name="numberOfBanners" id="numberOfBanners">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                {
                    banners.map(banner => (

                        <Link href={"#"} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`/images/${banner.vimagen}`} alt={`${banner.vtextobreve}`} width={200} height={500} key={banner.iid_banner}></Image>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{banner.vtitulo}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{banner.vtextobreve}</p>
                            </div>

                        </Link>

                    ))
                }
            </div>
        </div>

    );
}

export default BannPage;