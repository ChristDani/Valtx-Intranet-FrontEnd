'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

export const optionsServices = {

    async getList(pageNumber: number, itemsPerPage: number) {

        tokenAuth(token);

        const { data } = await axiosClient.post('perfil/getOpcionList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            
        });

        return data;
    },

    async setPefilOptions(datos:any[]){

        tokenAuth(token);
        const res = await axiosClient.post('perfil/setPerfilOpcionList', datos)

        return res

    },
    
    async getPerfilOpcionId(id:any){
        tokenAuth(token);

        const { data } = await axiosClient.post('perfil/getPerfilOpcionId', {
            "iid_perfil": id
        })

        return data
    }
}