export default function Navbar(){

    return(
        
        <div className="fixed flex items-center h-16 justify-between px-4 py-4 text-white top-0 w-full global-main-container">
                <div className="relative flex">
                    <div className="mr-3 text-4xl font-black text-center">N</div>
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l5-5m0 0l-5-5m5 5h-12"
                        />
                    </svg>
            </div>
        </div>
                <div className="flex items-center pr-16">
            <img src="https://t3.ftcdn.net/jpg/04/77/87/44/360_F_477874414_kSQ9ip26804g8B3ItYsh5XsjNRgqf693.jpg" alt="Foto de perfil" className="w-10 h-10 rounded-full mr-2" />
            <h3 className="text-white mr-2">Nombre de usuario</h3>
            <div className="flex pt-4 h-[50px] rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12l-5.707-5.707a1 1 0 0 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 0 1 1.414 1.414L10 12z" clipRule="evenodd" />
            </svg>
            </div>
        </div>
  
      </div>

    );
}