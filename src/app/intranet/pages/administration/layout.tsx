'use client';
import "../../../globals.css";
import { usePathname } from "next/navigation";

export default function MantenedoresLayout({ children }: { children: React.ReactNode }) {

    // obtener la ruta
    const pathname = usePathname().split('/')[usePathname().split('/').length - 1]

    return (
        <div className="mt-2 pt-4 ml-8 pb-8">
            <div className="flex items-center gap-3">
                <h1 className="">Administracion</h1>
                <svg className="text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                </svg>
                <h1 className="font-bold capitalize">{pathname}</h1>
            </div>
            <hr className="mt-2" />

            {children}

        </div>
    );
}