'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';


const token = getCookie('token') || '';

export const linkServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number) {
        
        tokenAuth(token);
        
        const { data } = await axiosClient.post('api/v1//', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });
        
        return data;
    },
    
    async getOne(id:any) {
        
        tokenAuth(token);
        
        const res = await axiosClient.post(`api/v1//=${id}`)
    },
    
    async create() {
        
        tokenAuth(token, 'multipart/form-data');
        
        const res = await axiosClient.post('api/v1//')
    },
    
    async update() {
        
        tokenAuth(token, 'multipart/form-data');
        
        const res = await axiosClient.post('api/v1//')
    },
    
    async delete(id:any) {
        
        tokenAuth(token);
        
        const res = await axiosClient.post(`api/v1//=${id}`)
    }
}