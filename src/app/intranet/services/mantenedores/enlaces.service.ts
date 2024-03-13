'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const linkServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number) {
        const { data } = await axiosClient.post('api/v1//', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });

        return data;
    },
    
    async getOne(id:any) {
        const res = await axiosClient.post(`api/v1//=${id}`)
    },
    
    async create() {
        const res = await axiosClient.post('api/v1//')
    },
    
    async update() {
        const res = await axiosClient.post('api/v1//')
    },
    
    async delete(id:any) {
        const res = await axiosClient.post(`api/v1//=${id}`)
    }
}