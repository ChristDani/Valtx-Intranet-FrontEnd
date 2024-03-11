'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const novedadesServices = {
    async getNovedades(pageNumber:number, novedadesPerPage:number) {
        const { data } = await axiosClient.post('api/v1/novedades/getNovedadesList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": novedadesPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });

        return data;
    },
    
    async getNovedad(id:any) {
        const res = await axiosClient.post(`api/v1/novedades/getNovedadesId?iid_novedad=${id}`)
    },
    
    async setNovedad() {
        const res = await axiosClient.post('api/v1/novedades/setNovedades')
    },
    
    async udpNovedad() {
        const res = await axiosClient.post('api/v1/novedades/updateNovedades')
    },
    
    async delNovedad(id:any) {
        const res = await axiosClient.post(`api/v1/novedades/delNovedadesId?iid_novedad=${id}`)
    }
}