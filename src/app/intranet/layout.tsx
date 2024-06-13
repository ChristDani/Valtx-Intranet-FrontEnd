'use client'
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";
import { Footer } from "./componentes/footer";
import { useEffect, useState } from "react";
import Loader from "./componentes/loader";
import LogoutService from "../authentication/services/logout.service";
import secureLocalStorage from "react-secure-storage";
import { IdleTimer } from "./timer";


export default function IntranetLayout( {children} : {children: React.ReactNode}){
        
        const {dtiempo_inactividad}:any = secureLocalStorage.getItem("user");
        const time = dtiempo_inactividad*1000*60;
        
      
      const handleIdle = () => {
        
        // Aquí puedes agregar la lógica que deseas ejecutar cuando el usuario está inactivo
        LogoutService();
        window.location.pathname = '/authentication'
        
      };
      const [data, setData] = useState(true);

      useEffect(() => {
        // Simula una llamada a una API
        setTimeout(() => {
          setData(false)}, 1500); // Simula un retraso de 2 segundos
      }, []);
       
    return(
            <div className=" flex flex-col justify-center w-full min-h-screen">
                <IdleTimer timeout={time} onIdle={handleIdle}/>

                <div className="flex flex-col flex-1 w-[80%] self-center h-auto">

                {/* Navbar */}
                <Navbar />

                {/* Sidebar */}
                <Sidebar />
                    {
                       data ? <Loader /> : children
                    }
                        
                </div>
                <div className="">
                    <Footer></Footer>
                </div>

            </div>

    );
}