import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";

export default function IntranetLayout( {children} : {children: React.ReactNode} ){

    
    return(
        <div>
            {/* Contenido principal y Sidebar */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />


                {/* Contenido principal */}
                <div className="flex-1">

                {/* Navbar */}
                <Navbar />
                
                {children}

                </div>
            </div>
        </div>

    );
}