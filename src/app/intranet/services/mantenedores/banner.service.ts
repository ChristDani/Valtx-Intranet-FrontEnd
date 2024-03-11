'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);


export const bannerServices = {


    async getBanners(pageNumber:number, bannersPerPage:number) { 
        
        const { data } = await axiosClient.post('api/v1/banner/getBannerList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": bannersPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });

        return data;

    },
    
    async getBanner(id:any) {
        const res = await axios.post(`api/v1/banner/getBannerId?iid_banner=${id}`);
    },
    
    async setBanner() {
        const res = await axios.post('api/v1/banner/setBanner')
    },
    
    async udpBanner() {
        const res = await axios.post('api/v1/banner/updateBanner')
    },
    
    async delBanner() {
        const res = await axios.post('api/v1/banner/delBannerId')
    }
}