'use client'

import { eventServices } from "../../services/mantenedores/eventos.service";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { EventResponseDTO, Evento } from "../../interfaces/event.response.dto";
import Link from "next/link";

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const Events = () => {

    const [events, setEvents] = useState<Evento[]>([]);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        const eventsResponse: EventResponseDTO = await eventServices.getList(1, 3, "", 3, getCurrentDate(), "asc");
        const eventsList: Evento[] = eventsResponse.data;
        eventsList.sort((a: any, b: any) => a.iorden - b.iorden);
        setEvents(eventsList);
    };

    return (

        <>
            <div className="flex justify-between align-bottom font-bold mt-4">
                <h1 className="text-lg global-main-text"> Celebraciones </h1>
                <Link className="cursor-pointer global-secondary-text" href="/intranet/pages/views/event">Ver todos</Link>
            </div>
            <ul className="mt-4 w-full bg-white rounded-2xl">
                {events.map((evento, index) => (
                    <>
                        <li className="flex justify-center items-center p-4" key={index}>
                            <div className="flex justify-center h-full w-1/6">
                                <img src={`images/${evento.vimagen}`}></img>
                            </div>
                            <div className="w-5/6">
                                <h1 className='text-md ml-3 text-[#0C3587]'>
                                    <b>{new Date(evento.dfecha).getDate()} de {meses[new Date(evento.dfecha).getMonth()]}</b> - {evento.vtitulo}</h1>
                            </div>
                        </li>
                        <hr className="w-full"></hr>
                    </>
                ))}

            </ul>
        </>

    );

}

export default Events;