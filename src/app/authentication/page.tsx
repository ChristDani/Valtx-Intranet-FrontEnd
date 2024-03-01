'use client';

import { useState } from "react";
import { loginService } from './services/login.service';
import { useRouter } from 'next/navigation';

export default function AuthenticationPage(){

    const router = useRouter();
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
        await loginService.validate(credentials);
        router.push('/intranet');
        
    }


    return (
        <>
            <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/**<img className="mx-auto h-10 w-auto" src="" alt="valtx"></img> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 global-main-text">Valtx</h2>
                </div>
                {/** Form container */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                        <div>
                            <label className="block font-medium text-sm leading-6 text-gray-900">Documento:</label>
                            <div className="mt-2">
                                <input id="document" name="document" type="text" autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                    focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onInputChange}
                                ></input>
                            </div>
                            {/* </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Constraseña:</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold global-main-text">Recuperar contraseña</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                            </div>
                        </div>
                <div> */}
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Constraseña:</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password"
                                    autoComplete="current-password" className="block w-full 
                    rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                    focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={onInputChange}
                                ></input>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#284488] focus-visible:outline global-main-button">Ingresar</button>
                        </div>
                        <div className="flex text-sm justify-end">
                            <a href="#" className="font-semibold global-main-text">Recuperar contraseña</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}