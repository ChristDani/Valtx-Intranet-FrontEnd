
'use client';
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const UsPage = () => {
    // obtener la ruta
    const pathName = usePathname()
    const [pathFinal, setPathFinal] = useState('')

    const obtenerPath = () => {
        const resul = pathName.split('/')
        setPathFinal(resul[resul.length - 1])
        return pathFinal
    };
    useEffect(() => {
        obtenerPath();
    })
    return (

        <div className="mb-4">
            <div className="flex flex-col justify-between w-full m-5 gap-1">
                <div className="capitalize">
                    <strong>Novedades</strong>
                </div>
                <hr />
            </div>
            <div className="flex gap-5 w-full">
                <div className="flex flex-col  gap-4 text-left bg-[#0d2f66] text-white rounded-2xl p-10">
                    <h1 className="text-3xl"><strong>Somos Valtx</strong></h1>
                    <p>Tecnología que genera resultados</p>
                    <span><strong>Garantizamos la continuidad operativa de tu negocio</strong> a través de servicios integrales de tecnología y experiencia del cliente.</span>
                </div>
                <div>

                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 bg-white border-xl rounded-2xl p-10 w-96">
                            <strong className="text-2xl">Nuestra Historia</strong>
                            <span><strong>Contamos con más de dos décadas de experiencia</strong> ofreciendo servicios integrales de tecnología y de experiencia del cliente</span>
                        </div>
                        <div className="flex flex-col gap-2 bg-white border-xl rounded-2xl p-10 w-96">
                            <strong className="text-2xl">Nuestra Visión</strong>
                            <span>Nuestro equipo de trabajo integra los ejes de procesos, tecnología y estrategia, lo cual nos permite contar con una visión 360° de los negocios, brindando a nuestros clientes servicios soportados en herramientas tecnológicas innovadoras, con profesionales altamente calificados y comprometidos.</span>

                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <strong className="flex bg-white justify-center items-center border-xl rounded-2xl p-2 text-xl w-80 h-36">Propuesta de valor de Valtx</strong>
                            <span className="flex justify-center items-center bg-[#0d2f66] text-white border-xl rounded-2xl p-2 text-center text-lg w-80 h-36">Contamos con una estructura multidisciplinaria de expertos profesionales que nos permite estar a la vanguardia.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="flex justify-center items-center bg-[#0d2f66] text-white border-xl rounded-2xl p-2 text-lg h-36">Altos estándares de calidad y seguridad</span>
                            <span className="flex justify-center items-center bg-white  border-xl rounded-2xl p-2 text-lg h-36">Flexibilidad y sensibilidad con el usuario</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UsPage;