'use-client';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { clearScreenDown } from 'readline';

export async function middleware(req:NextRequest){

    const token = req.cookies.get('token');
    
    if(token === null){
        return NextResponse.redirect(new URL('authentication', req.url));
    }

    try{
        console.log(token)
        const {payload} = await jwtVerify(token!.value, new TextEncoder().encode("202402INTRANET202402"));
        console.log(payload);
        return NextResponse.next();

    } catch(error){

        return NextResponse.redirect(new URL('authentication', req.url));

    }

    return NextResponse.next();

}

export const config = {
    matcher:['/intranet']
}