'use client';

import { useState } from "react";
import { loginService } from './services/login.service';
import { useRouter } from 'next/navigation';
import ModalComponent from "../intranet/componentes/mantenedores/modal";
import { IoWarningOutline } from "react-icons/io5";
import Image from "next/image";

export default function AuthenticationPage() {

    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [credentials, setCredentials] = useState({
        document: '',
        password: ''
    });


    const onInputChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }


    const onSubmit = async (e: any) => {
        e.preventDefault();
        const message = await loginService.validate(credentials);
        if(message == null){
            router.push('/intranet');
        }else{
            setModalMessage(message);
            setModalIsOpen(true);
        }
        
    }

    const validarDocument = (e: any) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        onInputChange(e);
    }

    const closeModal = () =>{
        setModalIsOpen(false);
    }

    return (
        <>
        <div className="grid grid-cols-2 h-screen max-md:grid-cols-1">
            <div className=" flex items-center justify-center max-md:hidden">
                <Image src='/icons/logoconexion.png' height="700" width="500" alt="" />
            </div>
            <div className="flex flex-col justify-center bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-2">
                    <h2 className="text-center text-3xl font-bold text-gray-900">Te damos la bienvenida</h2>
                    <p className="text-center text-xs text-gray-400">Inicia sesión con tu cuenta</p>
                    <div className="w-14 h-2 mx-auto border-2 border-sky-400 bg-sky-400 rounded"></div>
                </div>
                {/** Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                        <div>
                            <label className= "relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Usuario</label>
                            <div>
                                <input required id="document" name="document" type="text" autoComplete="email"
                                    className="block w-full 
                                    rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onInput={(e: any) => validarDocument(e)}
                                    maxLength={8}
                                ></input>
                            </div>
                            <br></br>
                            <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Constraseña</label>
                            <div className="">
                                <input required id="password" name="password" type="password"
                                    autoComplete="current-password" className="block w-full 
                                    rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onInputChange}
                                ></input>
                            </div>
                        </div>
                        <div className="flex text-sm justify-end gap-1">
                            <p>¿Olvidaste tu contraseña?</p>
                            <a href="/authentication/pages/recover-password" className="font-bold text-sky-400 underline">Recuperarlo aquí</a>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="checkbox" name="" id="" className=" appearance-none w-3 h-3 bg-[#e7e7e7] rounded-full checked:bg-[#284388f3] checked:ring-2"/>
                            <p className=" text-gray-500 text-sm">*Recordar el usuario en este dispositivo</p>
                        </div>
                        <div>
                            <button type="submit" className="w-full rounded-md h-14 font-semibold text-white shadow-sm hover:bg-[#284488] focus-visible:outline global-main-button">Ingresar</button>
                        </div>
                    </form>
                </div>    
                <div className=" relative top-20 mb-2 w-96 mx-auto">
                    <hr />
                    <p className=" text-xs">© Todos los derechos reservados</p>
                </div>
            </div>
        </div>
            
            <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} >
                <div className="flex justify-center flex-col items-center max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <IoWarningOutline className="text-[#284488] h-28 w-28" />
                    <div className="flex justify-center items-center mt-4">
                        <h1>{modalMessage}</h1>
                    </div>
                </div>
                </ModalComponent>
        </>
    );
}