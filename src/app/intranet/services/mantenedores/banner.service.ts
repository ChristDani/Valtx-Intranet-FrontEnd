'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { BannerResponseDTO } from '../../interfaces/banner.response.dto';

const token = getCookie('token') || '';

export const bannerServices = {


<<<<<<< HEAD
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, order: string): Promise<BannerResponseDTO> {
=======
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, orden: string): Promise<BannerResponseDTO> {

        tokenAuth(token);
>>>>>>> 7c7fe2db3f77a471466f2f7007bb9f6e8db885c8

        const { data } = await axiosClient.post('api/v1/banner/getBannerList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
<<<<<<< HEAD
            "order": order
=======
            "order" : orden // asc
>>>>>>> 7c7fe2db3f77a471466f2f7007bb9f6e8db885c8
        });

        return data;

    },

    async getOne(id: any) {

        tokenAuth(token);

        const { data } = await axiosClient.get(`api/v1/banner/getBannerId?iid_banner=${id}`);

        return data;
    },

    async create(image: File, titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string) {

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
        formData.append('storage', '/banners');
        formData.append('iid_banner', id);

        const res = await axiosClient.post('api/v1/banner/setBanner', formData)

        return res;
    },

    async update(titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string, image?: File) {
        
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
        formData.append('storage', '/banners');
        formData.append('iid_banner', id);

        const res = await axiosClient.post(`api/v1/banner/updateBanner`, formData)

        return res;

    },

    async delete(id: any) {
        
        tokenAuth(token);

        const res = await axiosClient.post(`api/v1/banner/delBannerId?iid_banner=${id}`)
    }
}