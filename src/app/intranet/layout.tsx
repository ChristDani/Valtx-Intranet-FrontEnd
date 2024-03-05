import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";

export default function IntranetLayout( {children} : {children: React.ReactNode} ){

    
    return(
            <div className="flex flex-col w-[80%] min-w-[300px] h-auto">

                {/* Navbar */}
                <Navbar />
                
                {/* Sidebar */}
                <Sidebar />
                
                {children}

            </div>

    );
}