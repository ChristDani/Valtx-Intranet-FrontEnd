'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { Documentation, DocumentationResponseDTO } from '../../interfaces/documentacion.response.dto';


const token = getCookie('token') || '';

tokenAuth(token);

export const documentacionServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number): Promise<DocumentationResponseDTO> {
        const { data } = await axiosClient.post('api/v1/documentacion/getDocumList', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "order": "asc"
        });

        return data;
    },
    
    async getOne(id:any) {
        const res = await axiosClient.post(`api/v1/documentacion/getDocumId?iid_documentacion=${id}`)
    },
    
    async create(document: Documentation, image?: File) {

        tokenAuth(token,'multipart/form-data');

        const formData = new FormData();
        if(image) formData.append('image', image);
        formData.append('iid_documentacion', '0');
        formData.append('vtitulo', document.vtitulo);
        formData.append('vtextobreve', document.vtextobreve);
        formData.append('vlink', document.vlink);
        formData.append('vredireccion', document.vredireccion);
        formData.append('iorden', document.iorden.toString()); 
        formData.append('dfecha', document.dfecha);
        formData.append('iid_estado_registro', document.iid_estado_registro.toString());
        formData.append('storage', '/documentacion');
        formData.append('vdescripcion_estado', document.vdescripcion_estado);
        


        const res = await axiosClient.post('api/v1/documentacion/setDocum', formData);
    },
    
    async update() {


        const res = await axiosClient.post('api/v1/documentacion/updateDocum');
    },
    
    async delete(id:any) {
        const res = await axiosClient.post(`api/v1/documentacion/delDocumId?iid_documentacion=${id}`)
    }
}