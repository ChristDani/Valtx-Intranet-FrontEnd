'use client'
import axiosClient from './axios.service';
import { getCookie } from './get-cookie.service';
import tokenAuth from './token.service';

const token = getCookie('token') || '';

tokenAuth(token);

export const parametrosServices = {

    async getDocumentsTypes() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=1`);

        return data;
    },

    async getStates() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=2`);

        return data;
    },

    async getCategories() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=3`);

        return data;
    },

    async getIconsTypes() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=4`);

        return data;
    },

    async getRepositoriesTypes(id:any) {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=${id}`);

        return data;
    },

    async getEmployesTypes() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=9`);

        return data;
    },

    async getEnterprises() {

        const { data } = await axiosClient.get(`maestra/getCabeceraId?iid_cabecera=10`);

        return data;
    }
}