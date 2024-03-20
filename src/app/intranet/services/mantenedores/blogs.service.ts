'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { ArticleResponseDTO } from '../../interfaces/article.response.dto';


const token = getCookie('token') || '';

export const blogServices = {
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, orden: string): Promise<ArticleResponseDTO> {

        tokenAuth(token);

        const { data } = await axiosClient.post('api/v1/blogs/getBlogList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "order": orden // asc
        });

        return data;
    },

    async getOne(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`api/v1/blogs/getBlogId?iid_blog=${id}`)
    },

    async create() {

        tokenAuth(token, 'multipart/form-data');

        const res = await axiosClient.post('api/v1/blogs/setBlog')
    },

    async update() {

        tokenAuth(token, 'multipart/form-data');

        const res = await axiosClient.post('api/v1/blogs/updateBlog')
    },

    async delete(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`api/v1/blogs/delBlogId?iid_blog=${id}`)
    }
}