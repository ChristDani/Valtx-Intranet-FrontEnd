
'use client';
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
            <div className=" m-5">
                <hr />
            </div>
            <div className="flex flex-col gap-5 w-full items-center">
                <div className="relative w-10/12 h-[500px] text-left bg-[#0d2f66] text-white overflow-hidden rounded-2xl">
                    <img src="/us-1.jpg" className="absolute w-full" alt="" />
                    <div className="absolute flex flex-col items-center bg-gradient-to-b bg-[#0d2f66ac] w-full h-full text-center">
                        <div className="flex flex-col gap-4 w-3/5 m-auto">
                        <h1 className="text-6xl"><strong>Somos Valtx</strong></h1>
                        <p className="text-4xl">Tecnología que genera resultados</p>
                        <span className="text-xl"><strong>Garantizamos la continuidad operativa de tu negocio</strong> a través de servicios integrales de tecnología y experiencia del cliente.</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-10/12">

                    <div className="flex flex-col gap-8 mt-5">
                        <div className="flex h-64 justify-between gap-4">
                            <div className="flex justify-center items-center bg-white border-xl rounded-2xl w-3/5">
                                <div className="flex flex-col gap-3 w-4/6">
                                    <strong className="text-4xl text-[#0d2f66]">Nuestra Historia</strong>
                                    <span><strong>Contamos con más de dos décadas de experiencia</strong> ofreciendo servicios integrales de tecnología y de experiencia del cliente</span>
                                </div>
                            </div>
                            <img  className="rounded-2xl w-96" src="/us-2.jpg" alt="" />
                        </div>
                        <div className="flex h-64 justify-between gap-4">
                            <img className="rounded-2xl w-96" src="/us-3.jpg" alt="" />
                            <div className="flex justify-center items-center bg-white border-xl rounded-2xl w-3/5">
                                <div className="flex flex-col gap-3 w-9/12">
                                    <strong className="text-4xl text-[#0d2f66]">Nuestra Visión</strong>
                                    <span>Nuestro equipo de trabajo integra los ejes de procesos, tecnología y estrategia, lo cual nos permite contar con una visión 360° de los negocios, brindando a nuestros clientes servicios soportados en herramientas tecnológicas innovadoras, con profesionales altamente calificados y comprometidos.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-5 mt-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex bg-white justify-center items-center text-[#0d2f66] border-xl rounded-2xl p-5 text-xl w-96 h-48">
                                <strong className="text-4xl">
                                    Propuesta de valor de Valtx
                                </strong>
                            </div>
                            <div className="flex justify-center items-center bg-[#0d2f66] text-white border-xl rounded-2xl p-5 text-center w-96 h-48">
                                <span className="text-xl">
                                    Contamos con una estructura multidisciplinaria de expertos profesionales que nos permite estar a la vanguardia.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-center items-center bg-[#0d2f66] text-white border-xl rounded-2xl p-5 w-96 h-48">
                                <span className="text-xl">
                                    Altos estándares de calidad y seguridad
                                </span>
                            </div>
                            <div className="flex justify-center items-center bg-white text-[#0d2f66]  border-xl rounded-2xl p-5 w-96 h-48">
                                <span className="text-xl font-bold" >
                                    Flexibilidad y sensibilidad con el usuario
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UsPage;