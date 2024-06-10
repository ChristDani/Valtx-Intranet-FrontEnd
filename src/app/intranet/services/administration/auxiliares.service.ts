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
            const {data} = await axiosClient.post("parametro/getParametroId",{
                "iid_parametro": id
            }
            );
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    },

    async setParametro(id: string,empresa: string,descripcion: string, cadena: string, cadena1: string, cadena2: string, entero: number, entero1: number, decimal: number, estado:  number) {
        try{
            tokenAuth(token, 'aplication/json');
            const data = {
            iid_parametro: id,
            iid_empresa: empresa,
            vdescripcion: descripcion,
            vvalor_cadena: cadena,
            vvalor_cadena1: cadena1,
            vvalor_cadena2: cadena2,
            ivalor_entero: entero, 
            ivalor_entero_1: entero1,
            nvalor_decimal: decimal,
            iid_estado_registro: estado
            }
            const res = await axiosClient.post('parametro/setParametro', data,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
        return res;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
        
    },

    async delete(id: any) {
        try {
            
        tokenAuth(token);
        const res = await axiosClient.delete('parametro/delParametroId?iid_parametro='+id);
        return res;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}
