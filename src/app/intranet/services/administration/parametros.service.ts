'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

export const cabeceraServices = {

    async getList(pageNumber: number, itemsPerPage: number, titulo: string, agregacion: number, state: number, orden: string): Promise<any> {
        try {
            tokenAuth(token);
    
            const { data } = await axiosClient.post('parametro/getCabeceraList', {
                "inumero_pagina": pageNumber - 1, // 0
                "itotal_pagina": itemsPerPage, // 
                "vdescripcion": titulo,
                "iindica_agregacion": agregacion,
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
            const { data } = await axiosClient.post(`parametro/getTablaCabeceraId?iid_tabla_cabecera=${id}`);
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    },

    async create(descripcion: string, agregacion:number, estado:  number, id: string) {
        try{
            tokenAuth(token, 'multipart/form-data');

        /*const res = await axiosClient.post('parametro/setCabecera', {
            "iid_tabla_cabecera":"",
            "vdescripcion": descripcion,
            "iindica_agregacion": Number(agregacion),
            "iid_estado_registro":1
        })*/
        const formData = new FormData()

        formData.append('iid_tabla_cabecera', id);
        formData.append('vdescripcion', descripcion);
        formData.append('iindica_agregacion', agregacion.toString());
        formData.append('iid_estado_registro', estado.toString());
    
        const res = await axiosClient.post('parametro/setCabecera', formData);
    
        return res;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
        
    },

    async update(descripcion: string, agregacion:number,estado: number, id: string){
        try{
            tokenAuth(token, 'multipart/form-data');

            const res = await axiosClient.post(`parametro/updateCabecera`,{
                "iid_tabla_cabecera":id,
                "vdescripcion": descripcion,
                "iindica_agregacion": agregacion,
                "iid_estado_registro": estado
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
        const res = await axiosClient.delete(`parametro/delCabeceraId?iid_tabla_cabecera=${id}`);
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}
