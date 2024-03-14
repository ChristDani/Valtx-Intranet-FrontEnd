'use client';
import { useEffect, useState } from "react";
import { documentacionServices } from '../../../services/mantenedores/document.service';

import Image from 'next/image';

const DocuPage = () =>{
    
    const [documentation, setDocumentation] = useState([ ]);

    useEffect(() => {
        getDocument()
    },[])

    const getDocument = async () => {
        const documentList = await documentacionServices.getList(1, 10,"",-1);

        setDocumentation(documentList.data)
    }

    return(

        <div /*className="mt-12 pt-6 ml-80"*/>
            <div>
                <h1>Documentación</h1>
                <div>
                    <select name="numberOfDocuments" id="numberOfDocuments">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                
                {
                    documentation.map(document => (

                            <Image src={`/images/${document.vimagen}`} alt={`${document.vtextobreve}`} width={200} height={500} key={document.iid_documentacion}></Image>
                    ))
                }
            </div>
        </div>

    );
}

export default DocuPage;