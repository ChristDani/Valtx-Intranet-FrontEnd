import Link from "next/link";

const Articles = () =>{

    return(

        <>
        <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Nuestro blog </h1>
                <span className="global-secondary-text">Ver todos</span>
            </div>
        <div className="flex justify-between">

            {/** Item de blog */}
            <div className="flex flex-col bg-white my-8 rounded-xl w-96">

                {/** Sección de la imágen */}
                <div className="bg-[red] h-52 overflow-hidden rounded-t-xl w-full">
                    <img src="https://rumboeconomico.com/wp-content/uploads/2023/04/Foto-equipo-tgestiona-y-Valtx-.jpg"></img>
                </div>
            
                {/** contenido */}
                <div className="ml-6">

                    <div className="flex mt-2">
                        <h3 className="font-bold global-main-text">Microservicios en desarrollo de software</h3>
                        <div className="rounded-full h-auto ml-4 bg-sky-500 self-center"></div>
                    </div>
                    <br></br>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi...</p>
                </div>
                
                {/** footer */}
                <div className="flex mt-9 justify-end mr-2">
                    <Link href={''} className="global-secondary-text">Ver detalles -{'>'}</Link>
                </div>
            </div>
            
            {/** Item de blog */}
            <div className="flex flex-col bg-white my-8 rounded-xl w-96">

                {/** Sección de la imágen */}
                <div className="bg-[red] h-52 overflow-hidden rounded-t-xl w-full">
                    <img src="https://rumboeconomico.com/wp-content/uploads/2023/04/Foto-equipo-tgestiona-y-Valtx-.jpg"></img>
                </div>
            
                {/** contenido */}
                <div className="ml-6">

                    <div className="flex mt-2">
                        <h3 className="font-bold global-main-text">5 estrategias CIO para adoptar IA generativa en los procesos</h3>
                        <div className="rounded-full h-auto ml-4 bg-sky-500 self-center"></div>
                    </div>
                    <br></br>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi...</p>
                </div>
                
                {/** footer */}
                <div className="flex mt-9 justify-end mr-2">
                    <Link href={''} className="global-secondary-text">Ver detalles -{'>'}</Link>
                </div>
            </div>

            {/** Item de blog */}
            <div className="flex flex-col bg-white my-8 rounded-xl w-96">

                {/** Sección de la imágen */}
                <div className="bg-[red] h-52 overflow-hidden rounded-t-xl w-full">
                    <img src="https://rumboeconomico.com/wp-content/uploads/2023/04/Foto-equipo-tgestiona-y-Valtx-.jpg"></img>
                </div>
            
                {/** contenido */}
                <div className="ml-6">

                    <div className="flex mt-2">
                        <h3 className="font-bold global-main-text">Seguridad en el Desarrollo de Software: Mejores Prácticas y Estrategias</h3>
                        <div className="rounded-full h-auto ml-4 bg-sky-500 self-center"></div>
                    </div>
                    <br></br>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit harum et error nulla odio nisi cum dolore eos voluptates, modi...</p>
                </div>
                
                {/** footer */}
                <div className="flex mb-3 mr-3 mt-9 justify-end">
                    <Link href={''} className="global-secondary-text">Ver detalles -{'>'}</Link>
                </div>
            </div>
            
        </div>
    </>

    );
}

export default Articles;