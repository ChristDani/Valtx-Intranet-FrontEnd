export const Enterate = () =>{

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex flex-col rounded-2xl justify-between">

                <div className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full">
                    <span className="flex absolute align-middle h-full justify-center  w-full">     
                        <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>                  
                    </span>
                    
                    <img src="https://ii.ct-stc.com/3/logos/empresas/2022/08/22//valtx181622541thumbnail.jpg"></img>
                </div>
                <div className="relative bg-[white] cursor-pointer h-40 rounded-2xl mt-3 overflow-hidden w-full">
                    <span className="flex absolute align-middle h-full justify-center  w-full">     
                        <img src="/icons/play-icon.svg" className="hover:w-11 w-10"></img>                  
                    </span>
                    
                    <img src="https://www.valtx.pe/img/share/blog.jpg"></img>
                </div>
                
            </div>
        </div>
    );
}