'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { BannerResponseDTO } from '../../interfaces/banner.response.dto';

const token = getCookie('token') || '';

tokenAuth(token);

export const bannerServices = {


    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number): Promise<BannerResponseDTO> {

        const { data } = await axiosClient.post('api/v1/banner/getBannerList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });

        return data;

    },

    async getOne(id: any) {
        const { data } = await axiosClient.get(`api/v1/banner/getBannerId?iid_banner=${id}`);

        return data;
    },

    async create(image: File, titulo: string, descripcion: string, link: string, redireccion: string, orden: string, fecha: string, estado: string, id: string) {
        
        tokenAuth(token,'multipart/form-data');

        const formData = new FormData()

        formData.append('image', image);
        formData.append('vtitulo', titulo);
        formData.append('vtextobreve', descripcion);
        formData.append('vlink', link);
        formData.append('vredireccion', redireccion);
        formData.append('iorden', orden);
        formData.append('dfecha', fecha);
        formData.append('iid_estado_registro', estado);
        formData.append('storage', '/banners');
        formData.append('iid_banner', id);

        console.log(image,titulo,descripcion,link,redireccion,orden,fecha,estado,id);
        

        const res = await axiosClient.post('api/v1/banner/setBanner', formData)

        return res;
    },

    async update() {
        const res = await axiosClient.post('api/v1/banner/setBanner')
    },

    async delete(id: any) {
        const res = await axiosClient.post(`api/v1/banner/delBannerId?iid_banner=${id}`)
    }
}