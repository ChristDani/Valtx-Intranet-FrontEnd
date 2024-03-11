'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';


const token = getCookie('token') || '';

tokenAuth(token);

export const newsServices = {
    async getNews(pageNumber:number, newsPerPage:number) {
        const { data } = await axiosClient.post('api/v1/valtx-news/getValtxNewsList', {
            "inumero_pagina": pageNumber-1,
            "itotal_pagina": newsPerPage,
            "vtitulo": "",
            "iid_estado_registro": -1
        });

        return data;
    },
    
    async getNew(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/valtx-news/getValtxNewsId?iid_news=${id}`)
    },
    
    async setNew() {
        const res = await axios.post('http://localhost:4000/api/v1/valtx-news/setValtxNews')
    },
    
    async udpNew() {
        const res = await axios.post('http://localhost:4000/api/v1/valtx-news/updateValtxNews')
    },
    
    async delNew(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/valtx-news/delValtxNewsId?iid_news=${id}`)
    }
}