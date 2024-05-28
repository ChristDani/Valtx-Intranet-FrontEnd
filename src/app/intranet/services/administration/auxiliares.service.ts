'use client'
import axiosClient from '../axios.service';
import { getCookie } from '../get-cookie.service';
import tokenAuth from '../token.service';

const token = getCookie('token') || '';

export const auxiliaresServices = {

    async getList(pageNumber: number, itemsPerPage: number, titulo: string, state: number, orden: string): Promise<any> {
        try {
            tokenAuth(token);
    
            const { data } = await axiosClient.post('parametro/getParametroList', {
                "inumero_pagina": pageNumber - 1, // 0
                "itotal_pagina": itemsPerPage, // 
                "vdescripcion": titulo,
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
            const { data } = await axiosClient.post(`parametro/getParametroId`,{
                "iid_parametro":id
            });
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    },

    async setParametro(id: string,descripcion: string,empresa: string, cadena: string, cadena1: string, cadena2: string, entero: string, entero1: string, decimal: string, estado:  number) {
        try{
            tokenAuth(token, 'multipart/form-data');
            const formData = new FormData()

            formData.append('iid_parametro', id);
            formData.append('iid_empresa', empresa);
            formData.append('vdescripcion', descripcion);
            formData.append('vvalor_cadena',cadena);
            formData.append('vvalor_cadena1',cadena1);
            formData.append('vvalor_cadena2',cadena2);
            formData.append('ivalor_entero',entero);
            formData.append('ivalor_entero_1',entero1);
            formData.append('nvalor_decimal',decimal);
            formData.append('iid_estado_registro', estado.toString());
        
            const res = await axiosClient.post('parametro/setParametro', formData);
        
        return res;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
        
    },

    async delete(id: any) {
        try {
            
        tokenAuth(token);
        const res = await axiosClient.delete(`parametro/delParametro?iid_parametro=${id}`);
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}
