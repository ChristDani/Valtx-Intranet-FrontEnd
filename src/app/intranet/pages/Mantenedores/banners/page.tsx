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
                {
                    banners.map(banner => (

                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Link href="#">
                                <Image className="rounded-t-lg" src={`/images/${banner.vimagen}`} alt={`${banner.vtextobreve}`} width={200} height={500} key={banner.iid_banner}></Image>
                            </Link>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{banner.vtitulo}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{banner.vtextobreve}Link</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>

    );
}

export default BannPage;