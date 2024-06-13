import { ActionInf, ActionEdit, ActionDel } from "./actions";
import { ListStates } from "./states";

export const Table = ({optionUser,listHead,listData,exist}:{optionUser:object,listHead:Array<string>,listData:Array<any>,exist:boolean})=>{
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {
                        listHead.map((item: any) => (
                            <th scope="col" className="px-6 py-3 text-center">
                                {item.Desc}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    exist ? (
                        <tr className="bg-white border-b hover:bg-gray-50">
                            {listData.map((item: any) => (
                                <th scope="row" className="px-6 py-4 text-center" key={item}>
                                    {item}
                                </th>
                            
                              ))}
                        </tr>
                    ) : (
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" colSpan={6} className="px-6 py-4 font-medium text-gray-900 text-center">
                                Lo sentimos, aún no se han registrado datos!
                            </th>
                        </tr>

                    )
                }
            </tbody>
        </table>
    </div>  
    );
}