'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { EventResponseDTO } from '../../interfaces/event.response.dto';


const token = getCookie('token') || '';

export const eventServices = {
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, fecha: string, orden: string): Promise<EventResponseDTO> {

        tokenAuth(token);
        const { data } = await axiosClient.post('evento/getEventoList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state,  // -1
            "dfecha": fecha, // ""
            "order": orden // asc
        });

        return data;
    },
    async getListWeb(pageNumber: number, itemsPerPage: number, titulo: string, state: number, fecha: string, orden: string): Promise<EventResponseDTO> {
        tokenAuth(token);
        const { data } = await axiosClient.post('evento/getEventoListWeb', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_lei_registro": state,  // -1
            "dfecha": fecha, // ""
            "order": orden // asc
        });
        return data;
    },

    async getOne(id: any) {

        tokenAuth(token);

        const { data } = await axiosClient.get(`evento/getEventoId?iid_evento=${id}`)

        return data;
    },

    async create(image: File, titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string,fecha:string) {

        tokenAuth(token, 'multipart/form-data');

        const formData = new FormData();

        formData.append('image', image);
        formData.append('vtitulo', titulo);
        formData.append('vtextobreve', descripcion);
        formData.append('vlink', link);
        formData.append('vredireccion', '_blank');
        formData.append('iorden', orden);
        formData.append('dfecha', fecha);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/eventos');
        formData.append('iid_evento', id);

        const res = await axiosClient.post('evento/setEvento', formData)

        return res;
    },

    async update(titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string,fecha:string, image?: File) {

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
        formData.append('dfecha', fecha);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/eventos');
        formData.append('iid_evento', id);

        const res = await axiosClient.post('evento/updateEvento', formData);

        return res;

    },

    async delete(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`evento/delEventoId?iid_evento=${id}`)
    }
}