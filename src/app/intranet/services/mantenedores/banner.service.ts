'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { BannerResponseDTO } from '../../interfaces/banner.response.dto';

const token = getCookie('token') || '';

tokenAuth(token);

export const bannerServices = {


    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, order: string): Promise<BannerResponseDTO> {

        const { data } = await axiosClient.post('api/v1/banner/getBannerList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "order": order
        });

        return data;

    },

    async getOne(id: any) {
        const { data } = await axiosClient.get(`api/v1/banner/getBannerId?iid_banner=${id}`);

        return data;
    },

    async create(image: File, titulo: string, descripcion: string, link: string, orden: string, fecha: string, estado: string, id: string) {

        tokenAuth(token, 'multipart/form-data');

        const formData = new FormData()
        
        formData.append('image', image);
        formData.append('vtitulo', titulo);
        formData.append('vtextobreve', descripcion);
        formData.append('vlink', link);
        formData.append('vredireccion', '_blank');
        formData.append('iorden', orden);
        formData.append('dfecha', fecha);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/banners');
        formData.append('iid_banner', id);

        const res = await axiosClient.post('api/v1/banner/setBanner', formData)

        return res;
    },

    async update(titulo: string, descripcion: string, link: string, orden: string, fecha: string, estado: string, id: string, image?: File) {
        
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
        formData.append('storage', '/banners');
        formData.append('iid_banner', id);

        const res = await axiosClient.post(`api/v1/banner/updateBanner`, formData)

        return res;

    },

    async delete(id: any) {
        const res = await axiosClient.post(`api/v1/banner/delBannerId?iid_banner=${id}`)
    }
}