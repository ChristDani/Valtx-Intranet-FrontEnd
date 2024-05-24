'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

tokenAuth(token);

export const parametrosAdminServices = {
    async getList() {

        const res = await axiosClient.get(`parametros/getParametroList`, {
            // dato: ""
        });

        return res;
    },
    // getOne
    // edit
}