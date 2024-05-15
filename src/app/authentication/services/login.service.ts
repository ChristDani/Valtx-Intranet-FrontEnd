import axios from 'axios'
import crypto from 'crypto'
import { cookies } from 'next/headers';
import secureLocalStorage from 'react-secure-storage';


export const loginService = {

    encryptPassword: (password: any) => {
        return crypto.createHash('sha512').update(password).digest('hex').toUpperCase();
    },
    setCookie: (name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },

    validate: async (credentials: any): Promise<string | null>  => {
        const userDocument = credentials.document
        const userPassword = loginService.encryptPassword(credentials.password);
        const res = await axios.post('http://localhost:4000/api/v1/seguridad/login', {
            email: userDocument,
            password: userPassword
        })


        if (res.data.IsSuccess) {
            loginService.setCookie("token", res.data.tokens.access.token, 1);
            secureLocalStorage.setItem("user", res.data.data);
            secureLocalStorage.setItem("perfil", res.data.data.iid_perfil);
            secureLocalStorage.setItem("permisosMenu", JSON.stringify(res.data.data.perfil.permisos));
        } else {
            return res.data.Message
        }

        return null;
    }

}