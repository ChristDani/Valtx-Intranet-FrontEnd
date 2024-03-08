'use client'

export const getCookie = (name: string) =>{
        const cookie = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='));
    
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
}