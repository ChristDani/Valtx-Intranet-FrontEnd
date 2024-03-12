'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const eventServices = {
    async getEvents(pageNumber:number, eventsPerPage:number) {
        const { data } = await axiosClient.post('api/v1/evento/getEventoList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": eventsPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });

        return data;
    },
    
    async getEvent(id:any) {
        const res = await axiosClient.post(`api/v1/evento/getEventoId?iid_evento=${id}`)
    },
    
    async setEvent() {
        const res = await axiosClient.post('api/v1/evento/setEvento')
    },
    
    async udpEvent() {
        const res = await axiosClient.post('api/v1/evento/updateEvento')
    },
    
    async delEvent(id:any) {
        const res = await axiosClient.post(`api/v1/evento/delEventoId?iid_evento=${id}`)
    }
}