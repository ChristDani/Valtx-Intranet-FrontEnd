'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const enterateServices = {
    async getEnterateList(pageNumber:number, novedadesPerPage:number) {
        const { data } = await axiosClient.post('api/v1/enterate/getEnterateList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": novedadesPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });

        return data;
    },
    
    async getEnterate(id:any) {
        const res = await axiosClient.post(`api/v1/enterate/getEnterateId?iid_enterate=${id}`)
    },
    
    async setEnterate() {
        const res = await axiosClient.post('api/v1/enterate/setEnterate')
    },
    
    async udpEnterate() {
        const res = await axiosClient.post('api/v1/enterate/updateEnterate')
    },
    
    async delEnterate(id:any) {
        const res = await axiosClient.post(`api/v1/enterate/delEnterateId?iid_enterate=${id}`)
    }
}