'use client'

import { useEffect, useState } from "react";
import { bannerServices } from "../../services/mantenedores/banner.service";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { Banner, BannerResponseDTO } from "../../interfaces/banner.response.dto";


const HomeMainBanner = () =>{

    const initialBanner = {
            iid_banner: 1,
            vtitulo: "1",
            vtextobreve: "1",
            vimagen: "",
            vlink: "https://www.valtx.pe",
            vredireccion: "_blank",
            iorden: 1,
            dfecha: "2024-03-12T22:48:27.914Z",
            iid_estado_registro: 1,
            vdescripcion_estado: "ACTIVO"
    }

    const [banners, setBanners] = useState<Banner[]>([initialBanner]);


    useEffect(()=>{

        getAllBanners();

    }, []);

    const getAllBanners = async ()=>{
        try {

            const banners: BannerResponseDTO = await bannerServices.getListWeb(1, 10, "", 3, 'asc');
            const bannersList: Banner[] = banners.data;
            bannersList.sort((a:any, b:any)=> a.iorden - b.iorden);
            setBanners(bannersList);
            

        } catch (error) {
            console.error('Error al obtener banners:', error);
        }
        
    }

    const goLink = () =>{
      const banner = banners[currentIndex]
        if(banner.vlink== null || banner.vlink == '') return;
        window.open(`http://${banner.vlink}`, banner.vredireccion);
    }
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const goToPrevSlide = () => {
        const newIndex = (currentIndex - 1 + banners.length) % banners.length;
        setCurrentIndex(newIndex);
      };
    
      const goToNextSlide = () => {
        const newIndex = (currentIndex + 1) % banners.length;
        setCurrentIndex(newIndex);
      };
      
      // Ejecutar nextSlide cada 4000ms
      const intervalId = setTimeout(() => {
        //goToNextSlide();
      }, 4000);
      
    
      const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
      };

    return(
    <div className='relative cursor-pointer max-h-[500px] w-full group rounded-xl overflow-hidden max-sm:h-[300px]'>
        <div className='flex h-full'onClick={()=>goLink()}>
          <img className="w-full" src={`/images/${banners[currentIndex]?.vimagen}`} />
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={()=>goToPrevSlide()} size={30} />
        </div>
        
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={()=>goToNextSlide()} size={30} />
        </div>
        <div className='absolute flex bottom-10 right-10 w-full justify-end max-sm:hidden' >
          {banners.map((banner, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'active-indicator' : ''}`}
            >
              <div className="bg-white h-2 mr-2 rounded-2xl w-10" style={{ backgroundColor: slideIndex === currentIndex ? '#31BAFF' : 'white' }}></div>
            </div>
          ))}
        </div>
    </div>
    );
}

export default HomeMainBanner;

