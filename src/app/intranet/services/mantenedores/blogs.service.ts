'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';
import { ArticleResponseDTO } from '../../interfaces/article.response.dto';


const token = getCookie('token') || '';

export const blogServices = {
    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, orden: string): Promise<ArticleResponseDTO> {

        tokenAuth(token);

        const { data } = await axiosClient.post('blogs/getBlogList', {
            "inumero_pagina": pageNumber - 1, // 0
            "itotal_pagina": itemsPerPage, // 10
            "vtitulo": titulo, // ""
            "iid_estado_registro": state, // -1
            "order": orden // asc
        });

        return data;
    },
    async getListWeb(pageNumber: number, itemsPerPage: number, titulo: string, state: number, orden: string): Promise<ArticleResponseDTO> {

        tokenAuth(token);

        const { data } = await axiosClient.post('blogs/getBlogListWeb', {
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

        const { data } = await axiosClient.get(`blogs/getBlogId?iid_blog=${id}`)

        return data;
    },

    async create(image: File, titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string, idCategory: string) {

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
        formData.append('storage', '/blogs');
        formData.append('iid_blog', id);
        formData.append('iid_categoria', idCategory);

        const res = await axiosClient.post('blogs/setBlog', formData);

        return res;
    },

    async update(titulo: string, descripcion: string, link: string, orden: string, estado: string, id: string, idCategory: string, image?: File) {

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
        formData.append('storage', '/blogs');
        formData.append('iid_blog', id);
        formData.append('iid_categoria', idCategory);

        const res = await axiosClient.post('blogs/updateBlog', formData)

        return res;
    },

    async delete(id: any) {

        tokenAuth(token);

        const res = await axiosClient.post(`blogs/delBlogId?iid_blog=${id}`);
    }
}