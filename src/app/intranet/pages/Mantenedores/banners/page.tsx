'use client';
import { useEffect, useState } from "react";
import { bannerServices } from '../../../services/mantenedores/banner.service';

import Image from 'next/image';

const BannPage = () => {

    const [banners, setBanners] = useState([ ]);

    useEffect(() => {
        getBanners()
    },[])

    const getBanners = async () => {
        const bannersList = await bannerServices.getBanners(1, 10);

        setBanners(bannersList.data)

        // console.log(bannersList);
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

                            <Image src={`/images/${banner.vimagen}`} alt={`${banner.vtextobreve}`} width={200} height={500} key={banner.iid_banner}></Image>
                    ))
                }
            </div>
        </div>

    );
}

export default BannPage;