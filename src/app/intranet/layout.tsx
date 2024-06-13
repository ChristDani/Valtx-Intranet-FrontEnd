'use client'
import Sidebar from "./componentes/Sidebar";
import Navbar from "./componentes/navbar";
import "./../globals.css";
import { Footer } from "./componentes/footer";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Loader from "./componentes/loader";
import LogoutService from "../authentication/services/logout.service";
import secureLocalStorage from "react-secure-storage";

const IdleTimer = ({ timeout, onIdle } : any) => {
    const [isIdle, setIsIdle] = useState(false);
    const timer: any = useRef(null);
  
    const resetTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current  = setTimeout(() => {
        setIsIdle(true);
        onIdle();
      }, timeout);
    };
  
    const handleUserActivity = () => {
      if (isIdle) {
        setIsIdle(false);
      }
      resetTimer();
    };
  
    useEffect(() => {
      const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
      events.forEach(event => window.addEventListener(event, handleUserActivity));
      resetTimer();
  
      return () => {
        events.forEach(event => window.removeEventListener(event, handleUserActivity));
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [timeout]);
  
    return null;
  };
export default function IntranetLayout( {children} : {children: React.ReactNode}){

    
    const {dtiempo_inactividad}:any = secureLocalStorage.getItem("user");
    
    const tiempo = dtiempo_inactividad  * 1000 * 60


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
                <IdleTimer timeout={tiempo} onIdle={handleIdle}/>

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