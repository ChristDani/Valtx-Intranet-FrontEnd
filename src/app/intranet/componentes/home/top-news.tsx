
const TopNews = () =>{

    return(
        
        <div className="flex flex-col">
            <div className="flex justify-between align-bottom pt-4 font-bold">
                <h1 className="global-main-text text-lg"> Valtx news </h1>
                <span className="cursor-pointer global-secondary-text">Ver todos</span>
            </div>
            <div className="flex flex-row w-full h-64">

                <div className="w-1/2 h-[100%] p-4 pl-0">
                    <div className="h-full rounded-2xl bg-white bg-cover" style={{ backgroundImage: "url(https://www.valtx.pe/img/nosotros/certificaciones-ISO-3.png)"}}></div>
                </div>

                <div className="w-1/2 h-[100%] p-4 pr-0">
                    <div className="h-full rounded-2xl bg-white bg-contain" style={{ backgroundImage: "url(https://i.ytimg.com/vi/RykPB87_PAQ/maxresdefault.jpg)"}}></div>
                </div>

            </div>
        </div>
            
    );
}

export default TopNews;