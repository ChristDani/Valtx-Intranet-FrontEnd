'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { NoticiasResponseDTO } from '../../interfaces/news.response.dto';


const token = getCookie('token') || '';

export const newsServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number): Promise<NoticiasResponseDTO> {

        tokenAuth(token);

        const { data } = await axiosClient.post('api/v1/valtx-news/getValtxNewsList', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });
        
        return data;
    },
    
    async getOne(id:any) {

        tokenAuth(token);

        const res = await axiosClient.post(`api/v1/valtx-news/getValtxNewsId?iid_news=${id}`)
    },
    
    async create() {

        tokenAuth(token, 'multipart/form-data');
        
        const res = await axiosClient.post('api/v1/valtx-news/setValtxNews')
    },
    
    async update() {

        tokenAuth(token, 'multipart/form-data');

        const res = await axiosClient.post('api/v1/valtx-news/updateValtxNews')
    },
    
    async delete(id:any) {

        tokenAuth(token);

        const res = await axiosClient.post(`api/v1/valtx-news/delValtxNewsId?iid_news=${id}`)
    }
}