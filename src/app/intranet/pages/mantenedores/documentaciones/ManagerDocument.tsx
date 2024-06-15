import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import { repositorioServices } from "@/app/intranet/services/mantenedores/repositorio.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";
import { cabeceraServices } from "@/app/intranet/services/administration/cabecera.service";
import { IoWarningOutline } from "react-icons/io5";
import { ActionDel, ActionEdit } from "@/app/intranet/componentes/mantenedores/actions";

interface repositorio {
    iid_repo: number,
    vtitulo: string,
    vdocumento: string,
    iid_tabla_cabecera: string,
    vdescripcion_cabecera: string,
    iid_tabla_cabeceraMaestra: string,
    vdescripcion_cabeceraMaestra: string,
    iid_documentacion: number
}

const ManagerDoc = ({ close, idDoc, crear, editar, eliminar }: {
    crear: boolean,
    editar: boolean,
    eliminar: boolean,
    close: () => void,
    idDoc: any
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
    const [editDoc, setEditDoc] = useState(null); //vdocumento
    const [editCabecera, setEditCabecera] = useState(''); //iid_cabecera
    const [editIdDoc, setIdDoc] = useState(idDoc); //iid_documentación
    const [editState, setEditState] = useState('3');
    const [editCabeceraMaestra, setEditCabeceraMaestra] = useState('');
    const [editNameCabecera, setEditNameCabecera] = useState('');
    const [editNameRepo, setEditNameRepo] = useState('');
    //cabecera
    const [cabeceraList, setCabeceraList] = useState([]);
    //Tipos repositorios
    const [repositriesList, setRepositoriesList] = useState([]);
    const [state, setState] = useState('create');
    const [openModal, setModalIsOpen] = useState(false);

    const [errorModal, setErrorModal] = useState(false)
    const closeError = () => {
        setErrorModal(false)
    }
    const openInterModal = () => {
        setModalIsOpen(true);
    }
    const closeInterModal = () => {
        setModalIsOpen(false);
        cleanData();
    }
    const handleCabeceraChange = async (e: any) => {
        setEditNameCabecera(e.target.children[e.target.selectedIndex].textContent); // textContent;
        setEditCabeceraMaestra(e.target.value);
        try {
            const { data } = await parametrosServices.getRepositoriesTypes(e.target.value);

            setRepositoriesList(data);
            setRepoSelect(false);
        } catch (error) {
            console.log(error);
        }
    };
    const [repoSelect, setRepoSelect] = useState(true);
    const handleRepoChange = (e: any) => {
        setEditNameRepo(e.target.children[e.target.selectedIndex].textContent); // textContent;
        setEditCabecera(e.target.value)
    }
    const getData = async () => {

        const docsListItems = await repositorioServices.getList(1, 30, 3, 'desc');
        const filterId: any = docsListItems.data.filter((item: repositorio) => {
            if (item.iid_documentacion === idDoc) {
                return item
            }
        })

        setDataInfo(docsListItems);
        setDataList(filterId);
    }

    const getDataCabecera = async () => {
        const cabeceraData = await cabeceraServices.getList(1, 10, "", 2, 1, 'asc');
        const cabeceraList = cabeceraData.data;
        setCabeceraList(cabeceraList);
    }
    const getOneItem = async (id: number) => {
        const onlyOneItem = await repositorioServices.getOne(id);
        const edit = onlyOneItem.data
        console.log(onlyOneItem.data);
        
        edit.map((item: any) => (
            setEditId(item.iid_repo), // idrepositorio
            setEditCabecera(item.iid_tabla_cabecera), // idcabecera
            setIdDoc(item.iid_documentacion), // iddoc
            setEditTitle(item.vtitulo),
            //setEditDoc(item.vdocumento),
            setEditState(item.iid_estado_registro),
            setNameDoc(nombredoc(item.vdocumento)),
            setEditCabeceraMaestra(item.iid_tabla_cabeceraMaestra)
        ))
    }

    const editItem = (e: any, id: number) => {
        setState('update')
        getOneItem(id);
        openInterModal();
    }

    const deleteItem = async (e: any, id: number) => {
        setState('delete');
        getOneItem(id);
        openInterModal();
    }
    const [messageModal, setMessageModal] = useState("");
    const docRef = useRef<HTMLInputElement>(null);
    const confirmOp = async (e: any) => {
        e.preventDefault();
        const fileInput = docRef.current as HTMLInputElement;
        if (state === 'create') {
            if (editDoc != null) {
                const res = await repositorioServices.create(editDoc, editTitle, editCabecera, editState, editId, editIdDoc, editNameRepo, editNameCabecera);
                if (!res.data.IsSuccess) {
                    setMessageModal(res.data.Message)
                    setErrorModal(true);
                    return;
                }
            } else if (fileInput.files && fileInput.files.length === 0) {
                setMessageModal("Seleccione un documento");
                setErrorModal(true);
                return;
            }
        } else if (state === 'update') {
            if (editDoc != null) {
                const res = await repositorioServices.update(editTitle, editCabecera, editState, editId, editIdDoc, editNameRepo, editNameCabecera, editDoc)
            } else {
                const res = await repositorioServices.update(editTitle, editCabecera, editState, editId, editIdDoc, editNameRepo, editNameCabecera)
            }
        } else if (state === 'delete') {
            const res = await repositorioServices.delete(editId);
        }
        cleanData();
        closeInterModal();
        getData();
    }

    const cleanData = () => {
        setEditId('0'),
            setEditTitle(''),
            setEditDoc(null),
            setNameDoc(''),
            setState('create')
    }

    const nombredoc = (doc: string) => {
        const parts = doc.split("-");
        return parts[parts.length - 1].trim();
    }
    const [nameDoc, setNameDoc] = useState('');
    const handleFileChange = (e: any) => {
        setEditDoc(e.target.files[0]);
        if (e.target.files[0].name !== null) {
            setNameDoc(e.target.files[0].name)
        }
    }

    useEffect(() => {
        getData();
        obtenerPath();
        getDataCabecera();
    }, [])

    return (
        <>
            <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-full h-[500px]">
                <div className="flex flex-row justify-between items-center">
                    <div className="mt-4 ml-5 capitalize">
                        Mantenedores › {pathFinal} › <strong>Repositorio</strong>
                    </div>
                    <div className="cursor-pointer  rounded-full p-1 " onClick={close}>
                        <svg className="w-6 h-6 fill-gray-300 hover:bg-gray-200  rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <hr />
                <div className="flex flex-row mt-6 mb-6 ml-2">
                    {/* tabla */}
                    <div>
                        <div className="flex flex-row gap-2 mb-4">
                            <select id="categories" required className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" onChange={(e) => handleCabeceraChange(e)}>
                                <option hidden value="0">Selecciona un Repositorio</option>
                                {
                                    cabeceraList?.map((cabecera: any) => (
                                        <option key={cabecera.iid_tabla_cabecera} value={cabecera.iid_tabla_cabecera}>
                                            {cabecera.vdescripcion}
                                        </option>
                                    ))
                                }
                            </select>
                            <select id="carpetas" required className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" disabled={repoSelect} onChange={(e) => handleRepoChange(e)}>
                                <option hidden value="0">Seleccione una carpeta</option>
                                {
                                    repositriesList.map((tipo: any) => (
                                        <option key={tipo.iid_tabla_detalle} value={tipo.iid_tabla_detalle}>
                                            {tipo.vvalor_texto_corto}
                                        </option>
                                    ))
                                }
                            </select>
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
                                        <th scope="col" className="px-6 py-3 w-64 text-center">
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
                                            dataList.filter((item: repositorio) => item.iid_tabla_cabecera == editCabecera && item.iid_tabla_cabeceraMaestra == editCabeceraMaestra)
                                                .map((item: repositorio) => (
                                                    <tr key={item.iid_repo} className="bg-white border-b hover:bg-gray-50" >
                                                        <th scope="row" className="p-2 text-center font-medium text-gray-900">
                                                            {item.vtitulo}
                                                        </th>
                                                        <td className="px-6 text-start ">
                                                            {
                                                                nombredoc(item.vdocumento)
                                                            }
                                                        </td>
                                                        <td className="flex gap-1 items-center justify-center my-auto px-4 h-14">
                                                            <Link href={`http://172.13.34.99:4000/public/documentacion/${item.vdocumento}`}
                                                                target="_blank"
                                                                className="font-medium text-blue-600 hover:underline">
                                                                <svg className=" text-dark" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path fillRule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                                                </svg>
                                                            </Link>
                                                            <ActionEdit
                                                                permiso={editar}
                                                                accion={(e) => editItem(e, item.iid_repo)}
                                                            />
                                                            <ActionDel
                                                                permiso={eliminar}
                                                                accion={(e) => deleteItem(e, item.iid_repo)}
                                                            />
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
                    <ModalComponent isOpen={openModal} closeModal={closeInterModal}>

                        <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-full ">
                            <div className="flex flex-row justify-between items-center">
                                <div className="mt-4 ml-5 capitalize">
                                    {editNameCabecera} › <strong>{editNameRepo}</strong>
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
                                            <span className="text-center font-bold">{state === 'create' ? 'Registra un Repositorio' : 'Actualizar Repositorio'}</span>
                                            <div className="mt-4 relative">
                                                <label className="absolute left-2 p-1 bg-gray-50 transform -translate-y-1/2 text-xs">Titulo</label>
                                                <input required className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" type="text" value={editTitle} placeholder="Ingrese titulo" onChange={(e) => setEditTitle(e.target.value)} />
                                            </div>
                                            <div className="">
                                                <div className="flex items-center justify-center w-80 text-center">
                                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg hover:bg-gray-200 ">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 p-4">
                                                            <svg className="w-10 h-10 mb-4 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd" />
                                                            </svg>
                                                            {
                                                                nameDoc !== '' ? (
                                                                    <>
                                                                        <p className="mb-2 text-sm text-gray-500 font-semibold">{nameDoc}</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir archivo{nameDoc}</span> o arrastralo aqui.</p>
                                                                        <p className="text-xs text-gray-500">PDF .pdf</p>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                        <input required id="dropzone-file" ref={docRef} type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                                                    </label>
                                                </div>
                                                {
                                                    errorModal &&
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
                                                }
                                            </div>
                                            <div className=" text-right">
                                                <button type="button" className="text-blue-800 border rounded-lg border-[#0C3587] text-sm px-5 py-2.5 text-center me-2 hover:bg-[#0C3587] hover:text-white" onClick={closeInterModal}>Cancelar</button>
                                                <button type="submit" className="bg-[#0C3587] border border-[#0C3587] text-white rounded-lg text-sm px-5 py-2.5 text-center me-2 hover:text-white hover:bg-[#0e0c87]"
                                                    onClick={confirmOp}>
                                                    Guardar
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                ) : (
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

export default ManagerDoc;