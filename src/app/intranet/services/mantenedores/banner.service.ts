'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';
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

    async create(image: any, titulo: string, descripcion: string, link: string, redireccion: string, orden: number, fecha: string, estado: number, id: number) {
        fecha = ''
        estado = 1
        id = 0
        const data = {
            vtitulo: titulo,
            vtextobreve: descripcion,
            vlink: link,
            vimagen: image,
            vredireccion: redireccion,
            iorden: orden,
            dfecha: fecha,
            iid_estado_registro: estado,
            iid_banner: id
        }
        const res = await axiosClient.post('api/v1/banner/setBanner', data)
    },

    async update() {
        const res = await axiosClient.post('api/v1/banner/updateBanner')
    },

    async delete(id:any) {
        const res = await axiosClient.post('api/v1/banner/delBannerId')
    }
}