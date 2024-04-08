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
    const [editState, setEditState] = useState('1');

    //Tipos repositorios
    const [repositriesList, setRepositoriesList]= useState([]);
    const [state, setState]= useState('create');

    useEffect(() => {
        getData();
        obtenerPath();
        repositoriesTipos();
    }, [])

    const repositoriesTipos= async () => {
        const {data} = await parametrosServices.getRepositriesTypes();
        setRepositoriesList(data);
    }

    const getData = async () => {

        const docsListItems = await repositorioServices.getList(1, 10, -1, 'desc');
        const filterId:any = docsListItems.data.filter((item:repositorio)=>{
            if(item.iid_documentacion === idDoc){
                return item
            }
        })
        console.log(docsListItems);
        console.log(filterId);
        
        setDataInfo(docsListItems);
        setDataList(filterId);
    }
    const getOneItem = async (id: number) => {
        const onlyOneItem = await repositorioServices.getOne(id);
        const edit = onlyOneItem.data
        edit.map((item: any) => (
            setEditId(item.iid_repo), // idrepositorio
            setEditCabecera(item.iid_tabla_cabecera), // idcabecera
            setIdDoc(item.iid_documentacion), // iddoc
            setEditTitle(item.vtitulo),
            setEditDoc(item.vdocumento)
        ))
    }

    const editItem = (e: any, id: number) => {
       setState('update')
       getOneItem(id);
    }

    const deleteItem = async (e: any, id: number) => {
        const res = await repositorioServices.delete(id);
        getData()
    }

    const confirmOp = async (e: any) => {
        e.preventDefault();
        if (state === 'create') {
            if (editDoc != null) {
              const res = await repositorioServices.create(editDoc,editTitle,editCabecera,editState,editId,editIdDoc);
            } else {
                alert('Debe elegir un Documento')
            }
        } else if (state === 'update') {
            if (editDoc != null) {
                const res = await repositorioServices.update(editTitle,editCabecera,editState,editId,editIdDoc,editDoc)
            } else {
                const res = await repositorioServices.update(editTitle,editCabecera,editState,editId,editIdDoc)
            }
        }
        getData()
        setState('create')
        cleanData()
    }

    const cleanData = () => {
        setEditId('0'),
        setEditCabecera('0'),
        setIdDoc('0'),
        setEditTitle(''),
        setEditDoc(null)
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
    const handleFileChange = (e: any) => {
        setEditDoc(e.target.files[0]);
    };

    const nameFileInput=(e:any)=>{
        console.log(e.target.files[0].name);
    }

    return (

        <>  
        <div className="flex h-[550px] m-auto bg-white rounded-xl">
            <div className="flex flex-row mt-6 mb-6 ml-2">
            {/* tabla */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Archivo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace the following <tr> elements with your actual product data */}
                        {
                            datInfo.IsSuccess ? (
                                dataList.map((item: any) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_documentacion}>
                                        <th scope="row" className=" text-center text-gray-900">
                                            {item.vtitulo}
                                        </th>
                                        <td className="px-6 py-1 text-start ">
                                            {
                                                nombredoc(item.vdocumento)
                                            }
                                        </td>
                                        <td className="flex gap-1 items-center justify-center my-auto px-4 h-28">
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) =>editItem(e,item.iid_repo)}>
                                                <svg className=" text-dark" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                                </svg>
                                            </Link>
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) =>editItem(e,item.iid_repo)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_191_168)">
                                                        <path d="M2.81326 15.4667L1.54659 20.9333C1.50289 21.1332 1.50439 21.3403 1.55097 21.5394C1.59756 21.7386 1.68805 21.9249 1.81583 22.0846C1.94362 22.2444 2.10547 22.3735 2.28957 22.4627C2.47368 22.5519 2.67537 22.5988 2.87992 22.6C2.97524 22.6096 3.07128 22.6096 3.16659 22.6L8.66659 21.3334L19.2266 10.8133L13.3333 4.93335L2.81326 15.4667Z" fill="#31BAFF" />
                                                        <path d="M22.5466 5.54667L18.6133 1.61333C18.3547 1.35604 18.0048 1.21161 17.64 1.21161C17.2752 1.21161 16.9252 1.35604 16.6666 1.61333L14.48 3.8L20.3666 9.68667L22.5533 7.5C22.6813 7.37139 22.7826 7.2188 22.8516 7.05098C22.9205 6.88315 22.9557 6.70338 22.955 6.52195C22.9544 6.34052 22.918 6.161 22.848 5.99365C22.7779 5.82629 22.6755 5.6744 22.5466 5.54667Z" fill="#31BAFF" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_191_168">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>
                                            <Link href="" className="font-medium text-blue-600 hover:underline" onClick={(e) => deleteItem(e, item.iid_repo)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_191_172)">
                                                        <path d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z" fill="#EA5065" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_191_172">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>
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
            <form onSubmit={confirmOp}>
                <div className="flex flex-col justify-center">
                    <span className="text-center mt-4 font-bold text-2xl">Añadir archivos</span>
                    <select name="" id="" className="m-4" onChange={(e)=>setEditCabecera(e.target.value)}>
                            <option value="0">Selecciona una Categoria</option>
                        {
                            repositriesList.map((tipo: any)=>(
                                <>
                                    <option value={tipo.iid_tabla_detalle} selected={editCabecera == tipo.iid_tabla_detalle ? true: false }>
                                        {capitalize(tipo.vvalor_texto_corto)}
                                    </option>
                                </>
                            ))
                        }
                    </select>
                    <input className="border-4 rounded-lg m-4" type="text" value={editTitle} placeholder="Titulo Documento" onChange={(e) =>  setEditTitle(e.target.value)}/>
                    <div className="flex items-center justify-center w-full p-4">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg hover:bg-gray-100 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 p-4">
                                <svg className="w-10 h-10 mb-4 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir archivo</span> o arrastralo aqui.</p>
                                <p className="text-xs text-gray-500">PDF .pdf</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf"/>
                        </label>
                    </div>
                    <div className="text-right">                
                    <div className=" mt-2 text-right">
                        <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={close}>Cancelar</button>
                        <button type="submit" className="mr-4 text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white"
                        onClick={confirmOp}>
                        Guardar
                    </button>
                    </div>
                    </div> 
                    
                </div>
            </form>
            </div>
        </div>
        </>
    );
}

export default ManagerDoc;