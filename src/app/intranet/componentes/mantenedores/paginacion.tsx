import React from 'react';
import Link from "next/link";

const Paginacion = ({ pagInicio, currentPage, pagFinal, totalPages, previusPage, nextPage, getdata, pagesToShow }) => {

    return (
        <>
            {(totalPages > 1) ? (
                <nav className="flex justify-end mt-3 w-full">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        {(currentPage != pagInicio) ? (
                            <li>
                                <Link href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => previusPage}>
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </Link>
                            </li>
                        ) : (<span></span>)}
                        {(pagInicio > 2) ? (
                            <>
                                <li>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getdata}>1</Link>
                                </li>
                                <li>
                                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-block">...</span>
                                </li>
                            </>
                        ) : (<span></span>)}
                        {pagesToShow.map((item: any) => (
                            (currentPage == item) ? (
                                <li>
                                    <Link href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">{item}</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getdata}>{item}</Link>
                                </li>
                            )
                        ))}
                        {(pagFinal < (totalPages - 1)) ? (
                            <>
                                <li>
                                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => getdata}>{totalPages}</Link>
                                </li>
                            </>
                        ) : (<span></span>)}
                        {(currentPage != pagFinal) ? (
                            <li>
                                <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => nextPage}>
                                    <span className="sr-only">Next</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </Link>
                            </li>
                        ) : (<span></span>)}
                    </ul>
                </nav>
            ) : (
                <span></span>
            )}
        </>
    );
};

export default Paginacion;