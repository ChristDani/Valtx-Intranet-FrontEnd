'use client'
export const Footer = () =>{

    const goToLink = (vlink: string) =>{
        if(vlink == null || vlink == '') return;
        window.open(vlink);
      }


    return(

        <div className="flex bg-[#0C3587] h-60 justify-center w-full">
            <div className="flex h-full justify-between pt-9 w-[80%]">
                
                {/** contenedor de sistemas de apoyo */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Sistemas de apoyo</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">

                        <div className="h-16 w-20 bg-gray-300 rounded-xl mr-2">

                        </div>
                        <div className="h-16 w-20 bg-gray-300 rounded-xl mr-2">

                        </div>
                        <div className="h-16 w-20 bg-gray-300 rounded-xl mr-2">

                        </div>
                    </div>

                </div>
                

                {/** contenedor de sistemas de certificaciones */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Certificaciones</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">

                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-1.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-3.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                        <div className="flex h-16 justify-center w-20 bg-white rounded-xl mr-2 bg-contain">
                            <img src="https://www.valtx.pe/img/nosotros/certificaciones-ISO-1.png"
                                className="h-[80%] m-auto w-[80%]"></img>
                        </div>
                    </div>

                </div>


                {/** contenedor de sistemas de redes */}
                <div className="flex flex-col text-xl">
                    <div>
                        <h3 className="text-white">Redes Valtx</h3>
                    </div>

                    {/** contenido */}
                    <div className="flex mt-4">

                        <div className="bg-contain cursor-pointer h-16 w-16 rounded-xl mr-2"
                            style={{backgroundImage:'url(icons/social-media/1.png)'}}
                            onClick={()=>{goToLink('https://www.facebook.com/ValtxPeru?locale=ms_MY')}}>

                        </div>
                        <div className="bg-contain cursor-pointer h-16 w-16 rounded-xl mr-2"
                            style={{backgroundImage:'url(icons/social-media/2.png)'}}
                            onClick={()=>{goToLink('https://www.valtx.pe')}}>

                        </div>
                        <div className="bg-contain cursor-pointer h-16 w-16 rounded-xl mr-2"
                            style={{backgroundImage:'url(icons/social-media/3.png)'}}
                            onClick={()=>{goToLink('https://www.youtube.com/@valtx4640')}}>

                        </div>
                        
                    </div>

                </div>


            </div>
        </div>

    );
}