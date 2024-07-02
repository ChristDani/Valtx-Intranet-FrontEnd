import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ModalComponent from '../../../componentes/mantenedores/modal';
import { usePathname } from "next/navigation";
import { repositorioServices } from "@/app/intranet/services/mantenedores/repositorio.service";
import { parametrosServices } from "@/app/intranet/services/parametros.service";
import { cabeceraServices } from "@/app/intranet/services/administration/cabecera.service";
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

const ManagerDoc = ({ close, idDoc }:{close: () => void, idDoc: any}) => {

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
    //cabecera
    const [cabeceraList, setCabeceraList] = useState([]);
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
    //Tipos repositorios
    const [repositriesList, setRepositoriesList] = useState([]);
    const [state, setState] = useState('create');
    const [openModal, setModalIsOpen] = useState(false);
    const handleCabeceraChange = async (e: any) => {
        setEditNameCabecera(e.target.children[e.target.selectedIndex].textContent); // textContent;
        setEditCabeceraMaestra(e.target.value);
        try {
            const { data } = await parametrosServices.getRepositoriesTypes(e.target.value);

            setRepositoriesList(data);
        } catch (error) {
            console.log(error);
        }
        //setEditNameRepo('')
    };

    const handleRepoChange = (e: any) => {
        setEditNameRepo(e.target.children[e.target.selectedIndex].textContent); // textContent;
        setEditCabecera(e.target.value)
    }
    const getData = async () => {

        const docsListItems = await repositorioServices.getListWeb(1, 30, 3, 'desc');
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
  

    useEffect(() => {
        getData();
        obtenerPath();
        getDataCabecera();
    }, [])

    return (
        <>
            <div className="flex flex-col m-auto bg-white rounded-xl p-4 w-full h-[500px]">
                <div className="flex flex-row justify-end items-center">
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
                                <option value="0">Selecciona un Repositorio</option>
                                {
                                    cabeceraList?.map((cabecera: any) => (
                                        <option key={cabecera.iid_tabla_cabecera} value={cabecera.iid_tabla_cabecera}>
                                            {cabecera.vdescripcion}
                                        </option>
                                    ))
                                }
                            </select>
                            <select id="carpetas" required className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full" onChange={(e) => handleRepoChange(e)}>
                                <option value="0">Seleccione una carpeta</option>
                                {
                                    repositriesList.map((tipo: any) => (
                                        <>
                                            <option className="capitalize" value={tipo.iid_tabla_detalle} selected={editCabecera == tipo.iid_tabla_detalle ? true : false}>
                                                {tipo.vvalor_texto_corto}
                                            </option>
                                        </>
                                    ))
                                }
                            </select>
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
                                                    <tr className="bg-white border-b hover:bg-gray-50" key={item.iid_documentacion}>
                                                        <th scope="row" className="p-2 text-center font-medium text-gray-900">
                                                            {item.vtitulo}
                                                        </th>
                                                        <td className="px-6 text-start ">
                                                            {
                                                                nombredoc(item.vdocumento)
                                                            }
                                                        </td>
                                                        <td className="flex gap-1 items-center justify-center my-auto px-4 h-14">
                                                            <Link href={`${process.env.NEXT_PUBLIC_API}/documentación/${item.vdocumento}`}
                                                                target="_blank"
                                                                className="font-medium text-blue-600 hover:underline">
                                                                <svg className=" text-dark" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path fillRule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                                                </svg>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                                )
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
            </div>
        </>
    );
}

export default ManagerDoc;