export const ListStates = ({list,status,funt}:{list:any[],status:string,funt:any}) => {
    return(
        <div>
                    {list.map((state: any) => (
                        <div key={state.iid_tabla_detalle}>
                            {
                                state.iid_tabla_detalle == status ? (
                                    <div className={`flex items-center justify-center  font-bold min-w-24 h-10 rounded-xl ${state.vvalor_texto_corto === 'ACTIVO' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-200 text-rose-800'}`}>
                                        {
                                            state.vvalor_texto_corto != null ? funt(state.vvalor_texto_corto) : 'Sin estado'
                                        }
                                    </div>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </div>))
                    }
                </div>
    );
}