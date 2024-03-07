import { useState } from "react";

import Image from 'next/image'

const BannPage = () => {

    // const [credentials, setCredentials] = useState({
    //     document: '',
    //     password: ''
    // });

    return (

        <div /*className="mt-12 pt-6 ml-80"*/>
            <div>
                <h1>Banners</h1>
                <Image src="http://localhost:4000/public/banners/portada 16.jpeg" alt= "prueba" width={200} height={500}></Image>
            </div>
        </div>

    );
}

export default BannPage;