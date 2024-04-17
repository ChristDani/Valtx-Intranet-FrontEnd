'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
//ver el dto
const token = getCookie('token') || '';

export const repositorioServices = {

    async getList(pageNumber: number, itemsPerPage: number, state: number, orden: string) {

        tokenAuth(token);

        const { data } = await axiosClient.post('repositorio/getRepositorioList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "iid_estado_registro": state, // -1
            "order": orden // asc
        });

        return data;
    },

    async create(docFile: File, titulo: string, cabecera: string,estado: string, id: string, document: string,repo:string,repoCabezera:string) {

        tokenAuth(token, 'multipart/form-data');

        const formData = new FormData()

        formData.append('image', docFile);
        formData.append('vtitulo', titulo);
        formData.append('iid_tabla_cabecera', cabecera);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/documentacion');
        formData.append('iid_repo', id);
        formData.append('iid_documentacion', document);
        formData.append('repositorio', '');
        formData.append('repositorioCabecera', '');

        const res = await axiosClient.post('/repositorio/setRepositorio', formData);
        
        return res;
    },
    async getOne(id: any) {

        tokenAuth(token);

        const { data } = await axiosClient.get(`repositorio/getRepositorioId?iid_repo=${id}`);

        return data;
    },
    
    async update(titulo: string, cabecera: string,estado: string, id: string, document: string,repo:string,repoCabezera:string,docFile?: File) {

        tokenAuth(token, 'multipart/form-data');
        
        const formData = new FormData()
        if(docFile != null){
            formData.append('image', docFile);
        }
        formData.append('vtitulo', titulo);
        formData.append('iid_tabla_cabecera', cabecera);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/documentacion');
        formData.append('iid_repo', id);
        formData.append('iid_documentacion', document);
        formData.append('repositorio', '');
        formData.append('repositorioCabecera', '');

        const res = await axiosClient.post('repositorio/updateRepositorio', formData);

        return res;
    },
    async delete(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`repositorio/delRepositorioId?iid_repo=${id}`);
    }
}