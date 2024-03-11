'use client'

import { useEffect, useState } from "react";
import { bannerServices } from "../../services/mantenedores/banner.service";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';


const HomeMainBanner = () =>{

    const [images, setImages] = useState<string[]>([]);


    useEffect(()=>{

        getAllBanners();

    }, []);

    const getAllBanners = async ()=>{
        try {

            const banners = await bannerServices.getBanners(1,10);
            const bannersList = banners.data;

            const imagesToAdd = bannersList.map((banner:any) => banner.vimagen);
            setImages(imagesToAdd);

        } catch (error) {
            console.error('Error al obtener banners:', error);
        }
    }
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
      const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
      };

    return(
        <div className='max-w-[1400px] h-[500px] w-full m-auto py-8 relative group'>
        <div
         style={{ backgroundImage: `url(${`/images/${images[currentIndex]}`})` }} 
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
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
        <div className='flex top-4 justify-center py-2'>
          {images.map((image, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    );
}

export default HomeMainBanner;

