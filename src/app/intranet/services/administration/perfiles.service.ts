'use client'

import axios from "../axios.service";
import { getCookie } from "../get-cookie.service";
import tokenAuth from "../token.service";

const token = getCookie('token') || '';

export const PerfilesService = {

    async getPerfilById(id: string){
        
        tokenAuth(token);

        const res = await axios.get(`api/v1/perfil/getPerfilId?id=${id}`);

        return res;
    },
    
    
    async getOptionsByPerfilId(perfilId: string){

        tokenAuth(token);

        const res = await axios.post('api/v1/perfil/getPerfilOpcionId', {"iid_perfil": perfilId});

        return res;
    },

    async setPerfil(perfil: any){

        tokenAuth(token);

        const res = await axios.post('api/v1/perfil/setperfil', perfil);

        return res;
    }

}