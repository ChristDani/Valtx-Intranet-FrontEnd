import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";
import { Footer } from "./componentes/footer";
import { Suspense } from "react";
import Loader from "./componentes/loader";

export default function IntranetLayout( {children} : {children: React.ReactNode} ){

    
    return(

            <div className=" flex flex-col justify-center w-full min-h-screen">

                <div className="flex flex-col flex-1 w-[80%] self-center h-auto">

                {/* Navbar */}
                <Navbar />

                {/* Sidebar */}
                <Sidebar />
                    <Suspense fallback={<Loader />}/>
                        {children}
                </div>
                <div className="">
                    <Footer></Footer>
                </div>

            </div>

    );
}