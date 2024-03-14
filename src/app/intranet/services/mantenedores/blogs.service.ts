'use client'
import axios, { AxiosRequestConfig } from 'axios'
import axiosClient from './axios';
import { getCookie } from '../get-cookie.service';
import tokenAuth from './token.service';
import { ArticleResponseDTO } from '../../interfaces/article.response.dto';


const token = getCookie('token') || '';

tokenAuth(token);

export const blogServices = {
    async getList(pageNumber:number, itemsPerPage:number, titulo:string, state:number): Promise<ArticleResponseDTO>{
        const { data } = await axiosClient.post('api/v1/blogs/getBlogList', {
            "inumero_pagina": pageNumber-1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state // -1
        });

        return data;
    },
    
    async getOne(id:any) {
        const res = await axiosClient.post(`api/v1/blogs/getBlogId?iid_blog=${id}`)
    },
    
    async create() {
        const res = await axiosClient.post('api/v1/blogs/setBlog')
    },
    
    async update() {
        const res = await axiosClient.post('api/v1/blogs/setBlog')
    },
    
    async delete(id:any) {
        const res = await axiosClient.post(`api/v1/blogs/delBlogId?iid_blog=${id}`)
    }
}