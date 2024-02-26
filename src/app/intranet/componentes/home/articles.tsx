const Articles = () =>{

    return(

        <>
        <div className="flex m-4 p-4 bg-gray-100 rounded-2xl justify-center"> 
        <h2 className="text-xl font-bold text-cyan-900">Atrículos recientes</h2>
        </div>

        <div className="flex mx-6 my-8">
            <img src="https://rumboeconomico.com/wp-content/uploads/2023/04/Foto-equipo-tgestiona-y-Valtx-.jpg" className=" rounded-xl w-40"></img>
            <div className="ml-6">
                <div className="flex">
                    <h3 className="text-gray-600 font-bold">Marzo 2023</h3>
                    <div className="rounded-full w-3 h-3 ml-4 bg-sky-500 self-center"></div>
                </div>
                <br></br>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi.</p>
            </div>
        </div>
        
        <div className="flex mx-6 my-8">
            <img src="https://ii.ct-stc.com/3/logos/empresas/2022/08/18//valtx201757048thumbnail.jpg" className=" rounded-xl w-40"></img>
            <div className="ml-6">
                <div className="flex">
                    <h3 className="text-gray-600 font-bold">Noviembre 2023</h3>
                    <div className="rounded-full w-3 h-3 ml-4 bg-sky-500 self-center"></div>
                </div>
                <br></br>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi.</p>
            </div>
        </div>
        
        <div className="flex mx-6 my-8">
            <img src="https://ii.ct-stc.com/3/logos/empresas/2022/08/22//valtx181622541thumbnail.jpg" className=" rounded-xl w-40"></img>
            <div className="ml-6">
                <div className="flex">
                    <h3 className="text-gray-600 font-bold">Junio 2023</h3>
                    <div className="rounded-full w-3 h-3 ml-4 bg-sky-500 self-center"></div>
                </div>
                <br></br>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi.</p>
            </div>
        </div>

    </>

    );
}

export default Articles;