import axios from 'axios'
import crypto from 'crypto'
import { cookies } from 'next/headers';


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

    validate: async (credentials: any) =>{
        const userDocument = credentials.document
        const userPassword = loginService.encryptPassword(credentials.password);
        const res = await axios.post('http://localhost:3000/api/v1/seguridad/login', {
            email: userDocument,
            password: userPassword
        })
        

        if (res.data.IsSuccess) {
            console.log(`Mensaje: ${res.data.Message}, Token: ${res.data.tokens.access.token}`);
            loginService.setCookie("token", res.data.tokens.access.token, 1);  
        } else {
            console.log(`Mennsaje: ${res.data.Message}`);
        }
    }

}