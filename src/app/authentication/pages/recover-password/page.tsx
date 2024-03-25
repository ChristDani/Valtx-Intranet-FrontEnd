
export default function RecoverPassword(){

    return(
        <>
        <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 global-main-text">Valtx</h2>
            </div>
            {/** Form container */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label className="block font-medium text-sm leading-6 text-gray-900">Correo:</label>
                        <div className="mt-2">
                            <input required id="document" name="document" type="text" autoComplete="email"
                                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                
                            ></input>
                        </div>
                        <br></br>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">DNI:</label>
                        </div>
                        <div className="mt-2">
                            <input required id="password" name="password" type="password"
                                autoComplete="current-password" className="block w-full 
                rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></input>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#284488] focus-visible:outline global-main-button">Recuperar Contraseña</button>
                    </div>
                    <div className="flex justify-end">
                        <a href="/authentication" className="font-semibold text-sm global-main-text">Ingresar</a>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
}