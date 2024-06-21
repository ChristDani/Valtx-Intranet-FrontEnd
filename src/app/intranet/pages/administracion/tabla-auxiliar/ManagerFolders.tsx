import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import { repositorioServices } from "@/app/intranet/services/mantenedores/repositorio.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";
import { detalleServices } from "@/app/intranet/services/administration/detalle.service";
import { IoWarningOutline } from "react-icons/io5";

interface repositorio {
    iid_tabla_detalle:number,
    vvalor_descripcion:string
}

const ManagerFolder = ({close, idCabecera,nameCabecera, crear, editar, eliminar} : {
    crear: boolean,
    editar: boolean,
    eliminar: boolean,
    close: () => void,
    nameCabecera:string,
    idCabecera: any
}) => {
    
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
    const [editCabecera, setEditCabecera] = useState(idCabecera); //iid_cabecera
    const [editState, setEditState] = useState(1);
    const [editNameCabecera, setEditNameCabecera] = useState(nameCabecera);
    //Tipos repositorios
    const [repositriesList, setRepositoriesList]= useState([]);
    const [state, setState]= useState('create');
    const [openModal, setModalIsOpen] = useState(false);
    
    const [errorModal, setErrorModal] = useState(false);
    const [messageModal, setMessageModal] = useState('');
    const openInterModal = () => {
        setModalIsOpen(true);
    }
    const closeInterModal = () => {
        setModalIsOpen(false);
        cleanData();
    }
    const getData = async () => {

        const docsListItems = await parametrosServices.getRepositoriesTypes(idCabecera);
        setDataInfo(docsListItems);
        
        setDataList(docsListItems.data);
    }
    const getOneItem = async (id: number) => {
        const onlyOneItem = await detalleServices.getOne(id);
        const edit = onlyOneItem.data
        edit.map((item: any) => (
            setEditId(item.iid_tabla_detalle), // iddetalle
            setEditCabecera(item.iid_tabla_cabecera), // idcabecera
            setEditTitle(item.vvalor_descripcion),
            setEditState(item.iid_estado_registro)
        ))
    }

    const editItem = (e: any, id: number) => {
       setState('update')
       getOneItem(id);
       openInterModal();
    }
    const closeError = () => {
        setErrorModal(false)
    }
    const deleteItem = async (e: any, id: number) => {
        setState('delete');
        getOneItem(id);
        openInterModal();
    }

    const confirmOp = async (e: any) => {
        e.preventDefault();
        if (state === 'create') {
            if (editTitle !== "") {
              const res = await detalleServices.create(editTitle,editState,editCabecera,editId);
              if (!res.data.IsSuccess){
                setMessageModal(res.data.Message)
                setErrorModal(true);
                return;
                }
            }else{
                setMessageModal("Por favor, ingresa el nombre de la carpeta");
                setErrorModal(true);
                return;
            }
        } else if (state === 'update') {
            if (editTitle != null) {
                const res = await detalleServices.update(editTitle,editState,editCabecera,editId);
            }
        } else if (state === 'delete') {
            const res = await detalleServices.delete(editId);
        }
        cleanData();
        closeInterModal();
        getData();
    }

    const cleanData = () => {
        setEditId('0'),
        setEditTitle(''),
        setState('create')
    }

    useEffect(() => {
        getData();
        obtenerPath();
    }, [])

    return (
        <>  
        <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-[400px] h-[500px]">
            <div className="flex flex-row justify-between items-center">
            <div className="mt-4 ml-5 capitalize">
                {editNameCabecera} › <strong>Carpetas</strong> 
            </div>
            <div className="cursor-pointer  rounded-full p-1 " onClick={close}>
                <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                 </svg>
             </div>
            </div>
            <hr />
            <div className=" mt-6 mb-6 ml-2">
            {/* tabla */}
            <div className="w-full">
                <div className="flex gap-2 mb-4 justify-end">
                    <div className="ml-10">
                        {crear && <button type="button" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 hover:text-white hover:bg-[#0e0c87]" onClick={openInterModal}>Agregar</button>}
                    </div>
                </div>
                
                <div className="overflow-auto h-[340px] shadow-md sm:rounded-lg">
                    <table className="w-full text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Titulo
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
                                    dataList.map((item:repositorio)=>(
                                            <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_tabla_detalle}>
                                                <th scope="row" className="p-2 text-center font-medium text-gray-900">
                                                    {item.vvalor_descripcion}
                                                </th>
                                                <td className="flex gap-1 items-center justify-center my-auto px-4 h-14">
                                                    <Link href="" className={`font-medium text-blue-600 hover:underline ${editar? '': 'hidden'}`} onClick={(e) =>editItem(e,item.iid_tabla_detalle)}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_191_168)">
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
                                                    <Link href="" className={`font-medium text-blue-600 hover:underline ${eliminar? '': 'hidden'}`} onClick={(e) => deleteItem(e, item.iid_tabla_detalle)}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_191_172)">
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
                                        )
                                    )
                                ) : (
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" colSpan={3} className="px-6 py-4 font-medium text-gray-900 text-center">
                                            Lo sentimos, no hay nada registrado!
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalComponent isOpen={openModal} closeModal={closeInterModal}>
                   
                <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-full ">
                <div className="flex flex-row justify-between items-center">
                    <div className="mt-4 ml-5 capitalize">
                         {editNameCabecera}› <strong>{state==='create' ? 'Nueva Carpeta' : 'Editar Carpeta'}</strong>
                    </div>
                    <div className="cursor-pointer  rounded-full p-1 " onClick={closeInterModal}>
                        <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                        </svg>
                    </div> 
                </div>
                {
                        state === 'create' || state === 'update' ? (
                            <form onSubmit={confirmOp}>
                            <div className="flex flex-col justify-start px-4 gap-3">
                                <div className="mt-4 relative">
                                    <label htmlFor="vtextobreve" className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Titulo</label>
                                    <input required name="vtextobreve"  className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" type="text" value={editTitle} placeholder="Ingrese titulo" onChange={(e) =>  setEditTitle(e.target.value)}/>
                                </div>        
                                <ModalComponent isOpen={errorModal} closeModal={closeError}>
                                                <div className="bg-white rounded-xl m-auto p-2 min-h-52 w-60">
                                                    <div className="flex justify-end">
                                                        <div className="cursor-pointer  rounded-full p-1 " onClick={closeError}>
                                                            <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center w-full">
                                                        <IoWarningOutline className="text-yellow-500 h-28 w-28" />
                                                        <div className="text-center">{messageModal}</div>
                                                    </div>
                                                </div>
                                            </ModalComponent>
                                    <div className=" text-right">
                                        <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 hover:bg-[#0C3587] hover:text-white" onClick={closeInterModal}>Cancelar</button>
                                        <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 hover:text-white hover:bg-[#0e0c87]"
                                            onClick={confirmOp}>
                                            Guardar
                                        </button>
                                    </div>
                                
                            </div>
                        </form>
                        ):(
                            <div className="mt-5">
                                <h1>¿Está seguro que desea eliminar este elemento?</h1>
                                <p>-{editTitle}</p>
                                <br />
                                <div className="text-end">
                                    <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-[#0C3587] hover:text-white" onClick={closeInterModal}>Cancelar</button>
                                    <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:text-white hover:bg-[#0e0c87]" onClick={confirmOp}>Confirmar</button>
                                </div>
                            </div>
                        ) 
                }
                </div>
            </ModalComponent>
            </div>
        </div>
        </>
    );
}

export default ManagerFolder;