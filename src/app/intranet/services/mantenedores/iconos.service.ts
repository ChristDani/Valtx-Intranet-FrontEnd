'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';


const token = getCookie('token') || '';

export const iconServices = {
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, iconType: number, orden: string) {

        tokenAuth(token);

        const { data } = await axiosClient.post('icono/getIconoList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "itipo_icono": iconType, // -1
            "order": orden // asc
        });

        return data;
    },
    async getListWeb(pageNumber: number, itemsPerPage: number, titulo: string, state: number, iconType: number, orden: string) {

        tokenAuth(token);

        const { data } = await axiosClient.post('icono/getIconoListWeb', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "itipo_icono": iconType, // -1
            "order": orden // asc
        });

        return data;
    },
    
    async getOne(id:any) {
        
        tokenAuth(token);

        const { data } = await axiosClient.get(`icono/getIconoId?iid_icono=${id}`);

        return data;

    },

    async create(image: File, titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string, tipo: string) {

        tokenAuth(token, 'multipart/form-data');

        const formData = new FormData()

        formData.append('image', image);
        formData.append('vtitulo', titulo);
        formData.append('vtextobreve', descripcion);
        formData.append('vlink', link);
        formData.append('vredireccion', '_blank');
        formData.append('iorden', orden);
        formData.append('dfecha', '');
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/iconos');
        formData.append('iid_icono', id);
        formData.append('itipo_icono', tipo)

        const res = await axiosClient.post('icono/setIcono', formData)

        return res;
    },

    async update(titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string, tipo: string, image?: File) {

        tokenAuth(token, 'multipart/form-data');

        const formData = new FormData()

        if (image != null) {
            formData.append('image', image);
        }

        formData.append('vtitulo', titulo);
        formData.append('vtextobreve', descripcion);
        formData.append('vlink', link);
        formData.append('vredireccion', '_blank');
        formData.append('iorden', orden);
        formData.append('dfecha', '');
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/iconos');
        formData.append('iid_icono', id);
        formData.append('itipo_icono', tipo)

        const res = await axiosClient.post('icono/updateIcono', formData)

        return res;
    },

    async delete(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`icono/delIconoId?iid_icono=${id}`)
    }
}