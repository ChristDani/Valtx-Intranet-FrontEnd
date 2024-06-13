'use client';

import { useEffect, useState } from "react";
import { loginService } from './services/login.service';
import { useRouter } from 'next/navigation';
import ModalComponent from "../intranet/componentes/mantenedores/modal";
import { IoWarningOutline } from "react-icons/io5";
import Image from "next/image";
import { userServices } from '../intranet/services/administration/users.service';
import Loader from "../intranet/componentes/loader";

export default function AuthenticationPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [credentials, setCredentials] = useState({
        document: '',
        password: '',
        email: '',
        codigo: '',
        newPassword: '',
    });
    const [email, setEmail] = useState("")
    const [codigo, setCodigo] = useState("")

    // estados de loguin 
    const [loguinState, SetLoguinState] = useState({
        loguin: true,
        generateCode: false,
        recoveryPassword: false
    })


    const onInputChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const changeView = () => {
        SetLoguinState({
            ...loguinState,
            loguin: false,
            generateCode: true
        })
    }
    const onSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        if (loguinState.loguin) {
            const message = await loginService.validate(credentials);
            if (message == null) {
                router.push('/intranet');
            } else {
                setLoading(false);
                setModalMessage(message);
                setModalIsOpen(true);
            }
        } else if (loguinState.generateCode) {
            const { IsSuccess, Message } = await userServices.generateCode(credentials.document, credentials.email)
            setModalMessage(Message);
            setModalIsOpen(true);
            if (IsSuccess) {
                SetLoguinState({
                    ...loguinState,
                    generateCode: false,
                    recoveryPassword: true
                })
            }
        } else if (loguinState.recoveryPassword) {
            const { IsSuccess, Message } = await userServices.recoveryPassword(credentials.document, credentials.email, credentials.codigo, credentials.newPassword)
            setModalMessage(Message);
            setModalIsOpen(true);
            if (IsSuccess) {
                SetLoguinState({
                    ...loguinState,
                    loguin: true,
                    recoveryPassword: false
                })
                setCredentials({
                    document: '',
                    password: '',
                    email: '',
                    codigo: '',
                    newPassword: '',
                })
            }

        }
    }

    const validarDocument = (e: any) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        onInputChange(e);
    }

    const validarCod = (e: any) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        onInputChange(e);
    }

    const closeModal = () => {
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
                        <h2 className="text-center text-3xl font-bold text-gray-900">{loguinState.loguin ? "Te damos la Bienvenida" : "Recuperemos tu Acceso"}</h2>
                        <p className="text-center text-xs text-gray-400">{loguinState.loguin ? "Inicia sesión con tu cuenta" : loguinState.generateCode ? "Ingresa tus datos para generar un código de recuperación" : "Revisa tu correo, luego ingresa tu código de recuperación y tu nueva clave."}</p>
                        <div className="w-14 h-2 mx-auto border-2 border-sky-400 bg-sky-400 rounded"></div>
                    </div>
                    {/** Form container */}
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                            <div>
                                <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Usuario:</label>
                                            <div>
                                                <input required id="document" value={credentials.document} name="document" type="text" autoComplete="off" placeholder="11111111"
                                                    className="block w-full 
                                    rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onInput={onInputChange}
                                                    // onChange={onInputChange}
                                                    maxLength={12}
                                                ></input>
                                            </div>
                                            <br></br>
                                <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Constraseña:</label>
                                <div className="">
                                    <input required id="password" name="password" type="password"
                                        autoComplete="current-password" value={credentials.password} className="block w-full 
                                        rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={onInputChange}
                                        placeholder="**************"
                                    ></input>
                                </div>
                                <br></br>
                                {/*
                                    loguinState.loguin || loguinState.generateCode ? (
                                        <>
                                            <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Usuario:</label>
                                            <div>
                                                <input required id="document" value={credentials.document} name="document" type="text" autoComplete="off" placeholder="11111111"
                                                    className="block w-full 
                                    rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onInput={onInputChange}
                                                    // onChange={onInputChange}
                                                    maxLength={12}
                                                ></input>
                                            </div>
                                            <br></br>
                                            {
                                                loguinState.loguin ? (
                                                    <>
                                                        <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Constraseña:</label>
                                                        <div className="">
                                                            <input required id="password" name="password" type="password"
                                                                autoComplete="current-password" value={credentials.password} className="block w-full 
                                        rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                onChange={onInputChange}
                                                                placeholder="**************"
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                    </>
                                                ) : loguinState.generateCode ? (
                                                    <>
                                                        <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Correo:</label>
                                                        <div className="">
                                                            <input required id="email" value={credentials.email} name="email" type="email" title="Formato correcto: usuario01@dominio.com" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                                                                autoComplete="off" placeholder="usuario01@compañia.com/pe" className="block w-full 
                                        rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                onChange={onInputChange}
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                    </>
                                                ) : (<></>)
                                            }
                                        </>
                                    ) : loguinState.recoveryPassword ? (
                                        <>
                                            <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Código:</label>
                                            <div>
                                                <input required id="codigo" name="codigo" type="text" autoComplete="off" placeholder="999999"
                                                    value={credentials.codigo}
                                                    className="block w-full 
                                rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onInput={(e: any) => validarCod(e)}
                                                    maxLength={6}
                                                ></input>
                                            </div>
                                            <br></br>
                                            <label className="relative bg-white ml-3 px-1 top-3 font-medium text-sm text-gray-900">Nueva Clave:</label>
                                            <div>
                                                <input required id="newPassword" name="newPassword" value={credentials.newPassword} type="password" autoComplete="off" placeholder="***************"
                                                    className="block w-full 
                                    rounded-md px-3 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={onInputChange}
                                                ></input>
                                            </div>
                                            <br></br>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )
                                }
                            </div>
                            {
                                loguinState.loguin ? (
                                    <>
                                        <div className="flex text-sm justify-end gap-1">
                                            <p>¿Olvidaste tu contraseña?</p>
                                            <p className="font-bold text-sky-400 underline cursor-pointer" onClick={changeView}>Recuperarlo aquí</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" name="" id="" className=" appearance-none w-3 h-3 bg-[#e7e7e7] rounded-full checked:bg-[#284388f3] checked:ring-2" />
                                            <p className=" text-gray-500 text-sm">*Recordar el usuario en este dispositivo</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            */}
                                <div>
                                    {/*<button type="submit" className="w-full rounded-md h-14 font-semibold text-white shadow-sm hover:bg-[#284488] focus-visible:outline global-main-button">{loguinState.loguin ? "Ingresar" : "Enviar Datos"}</button>*/}
                                    <button type="submit" className="w-full rounded-md h-14 font-semibold text-white shadow-sm hover:bg-[#284488] focus-visible:outline global-main-button">
                                        {loading ? 
                                            <div role="status" className="flex items-center justify-center">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        : "Ingresar"}
                                    </button>
                                </div>
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