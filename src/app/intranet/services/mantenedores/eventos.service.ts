'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { EventResponseDTO } from '../../interfaces/event.response.dto';


const token = getCookie('token') || '';

tokenAuth(token);

export const eventServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number): Promise<EventResponseDTO> {
        const { data } = await axiosClient.post('api/v1/evento/getEventoList', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });

        return data;
    },
    
    async getOne(id:any) {
        const res = await axiosClient.post(`api/v1/evento/getEventoId?iid_evento=${id}`)
    },
    
    async create() {
        const res = await axiosClient.post('api/v1/evento/setEvento')
    },
    
    async update() {
        const res = await axiosClient.post('api/v1/evento/updateEvento')
    },
    
    async delete(id:any) {
        const res = await axiosClient.post(`api/v1/evento/delEventoId?iid_evento=${id}`)
    }
}