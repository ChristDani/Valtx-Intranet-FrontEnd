export const Enterate = () =>{

    return(
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="global-secondary-text">Ver todos</span>
            </div>

            {/** Contenido */}
            <div className="flex flex-col rounded-2xl justify-between">

                <div className="w-full h-40 rounded-2xl mt-3 overflow-hidden">
                    <img src="https://ii.ct-stc.com/3/logos/empresas/2022/08/22//valtx181622541thumbnail.jpg"></img>
                </div>
                <div className="w-full h-40 bg-[red] rounded-2xl mt-4 overflow-hidden">
                    <img src="https://www.valtx.pe/img/share/blog.jpg"></img>
                </div>
                
            </div>
        </div>
    );
}