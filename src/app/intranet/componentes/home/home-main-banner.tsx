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
            vimagen: "banners/1.png",
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

            const banners: BannerResponseDTO = await bannerServices.getList(1, 10, "", 1);
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
        window.open(banner.vlink, banner.vredireccion);
    }
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
      const nextSlide = () => {
        const isLastSlide = currentIndex === banners.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
      };

    return(
        <div className='relative cursor-pointer max-w-[1400px] h-[500px] w-full relative group'>
        <div
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
          style={{ backgroundImage: `url(${`/images/${banners[currentIndex].vimagen}`})` }} 
          onClick={goLink}
        >
        </div>
        {/* Flecha izquierda */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        
        {/* Flecha derecha */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='absolute flex bottom-10 right-10 py-2'>
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

