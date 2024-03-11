'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const documentacionServices = {
    async getDocumentaciones(pageNumber:number, documentPerPage:number) {
        const { data } = await axiosClient.post('api/v1/documentacion/getDocumList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": documentPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });
        
        console.log(data)

        return data;
    },
    
    async getDocumentacion(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/documentacion/getDocumId?iid_documentacion=${id}`)
    },
    
    async setDocumentacion() {
        const res = await axios.post('http://localhost:4000/api/v1/documentacion/setDocum')
    },
    
    async udpDocumentacion() {
        const res = await axios.post('http://localhost:4000/api/v1/documentacion/updateDocum')
    },
    
    async delDocumentacion(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/documentacion/delDocumId?iid_documentacion=${id}`)
    }
}