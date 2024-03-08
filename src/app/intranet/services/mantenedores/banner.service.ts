'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);


export const bannerServices = {


    async getBanners() { 
        
        const { data } = await axiosClient.post('api/v1/banner/getBannerList', {
            "inumero_pagina": 0,
            "itotal_pagina": 10,
            "vtitulo": "",
            "iid_estado_registro": 1
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