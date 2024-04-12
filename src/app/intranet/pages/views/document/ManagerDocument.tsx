import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import Image from "next/image";
import { repositorioServices } from "@/app/intranet/services/mantenedores/repositorio.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";

interface repositorio {
    iid_repo:number,
    vtitulo:string,
    vdocumento:string,
    iid_cabecera:number,
    iid_documentacion:number
}

const ManagerDoc = ({close, idDoc}) => {
    console.log();
    
    // obtener la ruta
    const pathName = usePathname()
    const [pathFinal, setPathFinal] = useState('')

    const obtenerPath = () => {
        const resul = pathName.split('/')
        setPathFinal(resul[resul.length - 1])
        return pathFinal
    };


    // data
    const [dataList, setDataList] = useState<repositorio[]>([]);
    const [datInfo, setDataInfo] = useState<any>([]);

    // edición
    const [editId, setEditId] = useState('0'); // iid_repo
    const [editTitle, setEditTitle] = useState(''); //vtitulo
    const [editDoc, setEditDoc] = useState(null); //vdocumento
    const [editCabecera, setEditCabecera] = useState(''); //iid_cabecera
    const [editIdDoc, setIdDoc] = useState(idDoc); //iid_documentación
    const [editState, setEditState] = useState('3');

    //Tipos repositorios
    const [repositriesList, setRepositoriesList]= useState([]);
    const [state, setState]= useState('create');


    const repositoriesTipos= async () => {
        const { data } = await parametrosServices.getRepositoriesTypes();
        setRepositoriesList(data);
    }

    const getData = async () => {

        const docsListItems = await repositorioServices.getList(1, 10, 3, 'desc');
        const filterId:any = docsListItems.data.filter((item:repositorio)=>item.iid_documentacion === idDoc)
        setDataInfo(docsListItems);
        setDataList(filterId);
    }
    const getOneItem = async (id: number) => {
        const { data: item } = await repositorioServices.getOne(id);
        setEditId(item.iid_repo), // idrepositorio
-            setEditCabecera(item.iid_tabla_cabecera), // idcabecera
-            setIdDoc(item.iid_documentacion), // iddoc
-            setEditTitle(item.vtitulo),
-            setEditDoc(item.vdocumento),
-            setEditState(item.iid_estado_registro),
-            setNameDoc(nombredoc(item.vdocumento))
    }

    const editItem = (e: any, id: number) => {
       setState('update')
       getOneItem(id);
    }


    const nombredoc=(doc:string)=>{
        const parts = doc.split("-");
        return parts[parts.length -1].trim();
    }
    const capitalize = (text: String) => {
        const first = text.charAt(0);
        const rest = text.slice(1).toLowerCase();
        return first + rest
    }


    useEffect(() => {
        getData();
        obtenerPath();
        repositoriesTipos();
    }, [])

    return (

        <>  
        <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-full ">
            <div className="flex flex-row justify-end">
                <div className="cursor-pointer  rounded-full p-1 " onClick={close}>
                    <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <hr />
            <div className="flex flex-row mt-6 mb-6 ml-2">
            {/* tabla */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3 w-64 text-center">
                                Archivo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Ver
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace the following <tr> elements with your actual product data */}
                        {
                            datInfo.IsSuccess ? (
                                dataList.map((item: any) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_documentacion}>
                                        <th scope="row" className="p-4 text-center font-medium text-gray-900">
                                            {item.vtitulo}
                                        </th>
                                        <td className="px-6 py-1 text-start ">
                                            {
                                                nombredoc(item.vdocumento)
                                            }
                                        </td>
                                        <td className="flex gap-1 items-center justify-center my-auto px-4 h-28">
                                            <Link href={`/docs/${item.vdocumento}`}
                                            target="_blank"
                                            className="font-medium text-blue-600 hover:underline">
                                                <svg className=" text-dark" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                                </svg>
                                            </Link>
                                        </td>
                                        <td>
                                            <embed className="hidden" src={`http://localhost:4000/public/${item.vdocumento}`} type="application/pdf" width="100px" height="200px" />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" colSpan={3} className="px-6 py-4 font-medium text-gray-900 text-center">
                                        Lo sentimos, aún no se han registrado datos!
                                    </th>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    );
}

export default ManagerDoc;