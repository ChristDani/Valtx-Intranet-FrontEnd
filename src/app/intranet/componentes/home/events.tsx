import { GiCupidonArrow } from "react-icons/gi";
import { CgGym } from "react-icons/cg";

const Events = () =>{

    return(

        <>
            <h1 className='text-xl font-bold text-cyan-900'>Eventos</h1>
            <ul className="mt-4 w-full">
                <li className="flex justify-center items-center border border-solid border-slate-700 rounded-xl p-2">
                <GiCupidonArrow />
                    <h1 className='text-md ml-3 font-bold text-cyan-900 text-center'>San Valentín</h1>
                </li>
                <li className="flex justify-center items-center border border-solid border-slate-700 rounded-xl p-2 mt-2">
                    <CgGym />
                    <h1 className='text-md ml-3 font-bold text-cyan-900 text-center'>Vida Saludable</h1>
                </li>
            </ul>
        </>
        
    );

}

export default Events;