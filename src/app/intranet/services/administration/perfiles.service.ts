import axios from "axios";
import { getCookie } from "../get-cookie.service";
import tokenAuth from "../token.service";

const token = getCookie('token') || '';

export const PerfilesService = {

    async getPerfilById(id: string){
        
        tokenAuth(token);

        const res = axios.get('http://localhost:4000/api/v1/perfil/getPerfilId?id=1');

        return res;
    }
}