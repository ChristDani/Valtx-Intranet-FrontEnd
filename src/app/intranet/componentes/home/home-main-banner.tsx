'use client'

import { useEffect } from "react";
import { bannerServices } from "../../services/mantenedores/banner.service";

const HomeMainBanner = () =>{

    useEffect(()=>{
        const banners = bannerServices.getBanners();
        console.log(banners);
    }, []);

    return(
        <div className="w-full min-w-full h-80 rounded-2xl bg-white bg-contain bg-no-repeat bg-right" style={{backgroundImage:"url(https://www.valtx.pe/img/share/share.jpg)"}}>
                        
        </div>
    );
}

export default HomeMainBanner;