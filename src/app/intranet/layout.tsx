import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";
import { Footer } from "./componentes/footer";

export default function IntranetLayout( {children} : {children: React.ReactNode} ){

    
    return(

            <div className="flex flex-col justify-center w-full">

                <div className="flex flex-col w-[80%] self-center h-auto">

                {/* Navbar */}
                <Navbar />

                {/* Sidebar */}
                <Sidebar />

                {children}

                </div>

                <Footer></Footer>

            </div>

    );
}