// import React, { useState } from 'react';
// import Link from "next/link";

// const Paginacion = ({ pagInicio, currentPage, pagFinal, totalPages }) => {
//     const [paginacionCompleta, setPaginacionCompleta] = useState ('');
//     // {(totalPages > 1) ? (
//         <nav aria-label="Page navigation example">
//             <ul className="flex items-center -space-x-px h-8 text-sm">
//                 {pagInicio}
//                 <li>
//                     <Link href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => previusPage(currentPage - 1)}>
//                         <span className="sr-only">Previous</span>
//                         <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
//                         </svg>
//                     </Link>
//                 </li>
//                 <li>
//                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
//                 </li>
//                 <li>
//                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</a>
//                 </li>
//                 <li>
//                     <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
//                 </li>
//                 <li>
//                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">4</a>
//                 </li>
//                 <li>
//                     <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">5</a>
//                 </li>
//                 <li>
//                     <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => nextPage(currentPage + 1)}>
//                         <span className="sr-only">Next</span>
//                         <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
//                         </svg>
//                     </Link>
//                 </li>
//             </ul>
//         </nav>
//     // ) : (
//     //     <div></div>
//     // )}
//     return (paginacionCompleta);
//   };
  
//   export default Paginacion;