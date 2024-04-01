'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

export const ModulosServices = {

    async getList(){
        const res = await axiosClient.get('')
    }
}