'use client';

import Image from 'next/image'

export default function Navbar() {

    const UserName = async () => {
        const userdoc = localStorage.getItem("userDocument");
    }

    return (

        <div className="flex items-center h-16 justify-between my-6 text-white top-0 w-full">
            <div className="relative flex">
                <svg width="165" height="48" viewBox="0 0 165 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7632 0H0L14.7632 47.1842H32.1316L47.1842 0H32.1316L23.4474 27.7895L14.7632 0Z" fill="#0C3587" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M55.5843 20.2678L43.1369 19.3994C43.8124 15.1538 48.2317 6.72048 60.5054 6.95206C72.779 7.18364 76.6194 15.9257 77.0054 20.2678V45.4521H67.7422L65.4264 42.2678C63.3036 44.1012 57.7843 47.5363 52.6896 46.6099C52.4001 46.6099 40.8211 44.8731 41.1106 34.4521C41.3422 26.1152 48.9264 23.645 52.6896 23.4521C56.2598 23.4521 63.4001 23.2784 63.4001 22.5836C63.4001 21.7152 63.4001 17.9521 59.637 17.9521C56.6264 17.9521 55.6808 19.4959 55.5843 20.2678ZM54.4266 33.8731C54.1371 32.0397 55.5845 28.5468 63.6898 29.2415C63.4968 31.1713 62.2425 35.3204 58.7687 36.4783C57.7073 36.8643 55.3529 36.8836 54.4266 33.8731Z" fill="#0C3587" />
                    <rect x="79.8948" width="13.8947" height="46.8947" fill="#0C3587" />
                    <path d="M111.447 0.578979H98.421V34.4474V41.1053C98.421 45.7369 101.895 47.0877 103.632 47.1842H118.974V35.3158H111.447V22.2895H118.974V9.84214H111.447V8.39477V0.578979Z" fill="#0C3587" />
                    <path d="M143.579 19.3948C145.894 16.7899 149.946 11.2912 151.683 9.2641C151.651 9.26351 151.651 9.26319 151.684 9.26318C151.684 9.26349 151.684 9.2638 151.683 9.2641C152.204 9.27373 161 9.35409 165 9.26318L153.421 26.0527C153.035 26.9211 152.437 28.8895 153.132 29.8158C152.9 29.8158 160.947 41.3948 165 47.1842H151.105L144.158 37.3421L135.763 47.1842H121.579L133.737 29.8158C134.219 29.0439 134.895 27.2106 133.737 26.0527L122.158 9.26318H128.382H134.605L143.579 19.3948Z" fill="#0C3587" />
                </svg>
            </div>
            <div className="flex items-center">
                <img src="https://t3.ftcdn.net/jpg/04/77/87/44/360_F_477874414_kSQ9ip26804g8B3ItYsh5XsjNRgqf693.jpg" alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" />
                <h3 className="text-black mr-2">Hola, {localStorage.getItem("userName")} {localStorage.getItem("userFirstLastName")} {localStorage.getItem("userSecondLastName")}</h3>
                <div className="flex pt-4 h-[50px] rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12l-5.707-5.707a1 1 0 0 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 0 1 1.414 1.414L10 12z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

        </div>

    );
}