import { GiCupidonArrow } from "react-icons/gi";
import { CgGym } from "react-icons/cg";

const Events = () =>{

    return(

        <>
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Entérate </h1>
                <span className="global-secondary-text">Ver todos</span>
            </div>
            <ul className="mt-4 w-full bg-white rounded-2xl">
                <li className="flex justify-center items-center p-4">
                <GiCupidonArrow />
                    <h1 className='text-md ml-3 font-bold text-cyan-900 text-center'>San Valentín</h1>
                </li>
                <hr></hr>
                <li className="flex justify-center items-center  p-4">
                    <CgGym />
                    <h1 className='text-md ml-3 font-bold text-cyan-900 text-center'>Vida Saludable</h1>
                </li>
            </ul>
        </>
        
    );

}

export default Events;