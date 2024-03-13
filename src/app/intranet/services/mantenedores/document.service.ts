'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const documentacionServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number) {
        const { data } = await axiosClient.post('api/v1/documentacion/getDocumList', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });

        return data;
    },
    
    async getOne(id:any) {
        const res = await axiosClient.post(`api/v1/documentacion/getDocumId?iid_documentacion=${id}`)
    },
    
    async create() {
        const res = await axiosClient.post('api/v1/documentacion/setDocum')
    },
    
    async update() {
        const res = await axiosClient.post('api/v1/documentacion/updateDocum')
    },
    
    async delete(id:any) {
        const res = await axiosClient.post(`api/v1/documentacion/delDocumId?iid_documentacion=${id}`)
    }
}