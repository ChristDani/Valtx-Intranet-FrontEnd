'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

export const detalleServices = {

    async getList(pageNumber: number, itemsPerPage: number, titulo: string, agregacion: number, state: number, orden: string): Promise<any> {
        try {
            tokenAuth(token);
    
            const { data } = await axiosClient.post('parametro/getDetalleList', {
                "inumero_pagina": pageNumber - 1, // 0
                "itotal_pagina": itemsPerPage, // 
                "vvalor_descripcion": "",
                "iid_estado_registro": state,
                "order": orden // asc
            });
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    },
    async getOne(id: any) {
        try{
            tokenAuth(token);
            const { data } = await axiosClient.post(`parametro/getDetalleId?iid_tabla_detalle=${id}`);
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    },

    async create(descripcion: string, estado:  number, iid_cabecera: string, id: string) {
        try{
            tokenAuth(token, 'multipart/form-data');

        const res = await axiosClient.post('parametro/setDetalle', {
            "iid_tabla_cabecera":iid_cabecera,
            "iid_tabla_detalle":"",
            "vvalor_descripcion": descripcion,
            "iid_estado_registro":estado
        })
        return res;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
        
    },

    async update(descripcion: string, estado:  number, iid_cabecera: string, id: string){
        try{
            tokenAuth(token, 'multipart/form-data');

            const res = await axiosClient.post(`parametro/updateDetalle`,{
                "iid_tabla_cabecera":iid_cabecera,
                "iid_tabla_detalle":id,
                "vvalor_descripcion": descripcion,
                "iid_estado_registro":estado
            })
    
            return res;
        }catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
       
    },

    async delete(id: any) {
        try {
            
        tokenAuth(token);
        const res = await axiosClient.delete(`parametro/delDetalleId?iid_tabla_detalle=${id}`);
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}
