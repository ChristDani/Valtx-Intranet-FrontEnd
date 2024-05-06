'use client'

import axiosClient from "../axios.service";
import { getCookie } from "../get-cookie.service";
import tokenAuth from "../token.service";
import crypto from 'crypto'

const token = getCookie('token') || "";
//console.log(token)

export const userServices = {
  async getList(pageNumber: number, itemsPerPage: number, nombre: string, apellidos: string, documento: string, tdocumento: number, tperfil: number, state: number) {

    const token1 = getCookie('token') || "";

    tokenAuth(token1);
    

    const { data } = await axiosClient.post("usuario/getUsuarioList", {
      "inumero_pagina": pageNumber - 1,
      "itotal_pagina": itemsPerPage,
      "vnombres": nombre,
      "vapellido_paterno": apellidos,
      "vapellido_materno": apellidos,
      "vnro_documento": documento,
      "iid_tipo_documento": tdocumento,
      "iid_perfil": tperfil,
      "iid_estado_registro": state
    });

    return data;
  },

  async getOne(id: any) {
    tokenAuth(token);

    const { data } = await axiosClient.get(`usuario/getUsuarioId?iid_usuario=${id}`);
    return data;
  },

  async getOneConfig(id: any) {
    tokenAuth(token);

    const { data } = await axiosClient.get(`usuario/getUsuarioIdWeb?iid_usuario=${id}`);
    return data;
  },

  async setUsuario(id: number, nombre: string, apePat: string, apeMat: string, documento: string, email: string, telefono: string, tperfil: string, tdocumento: string, empresa: string, tusuario: string, state: string, vcip: string) {
    tokenAuth(token);

    const res = await axiosClient.post('usuario/setUsuario', {
      "iid_usuario": id,
      "vnombres": nombre,
      "vapellido_paterno": apePat,
      "vapellido_materno": apeMat,
      "vnro_documento": documento,
      "vcorreo_electronico": email,
      "vnumero_telefonico": telefono,
      "iid_perfil": +tperfil,
      "iid_tipo_documento": +tdocumento,
      "iid_empresa": +empresa,
      "iid_tipo_usuario": 1,
      "iid_estado_registro": +state,
      "vcip": vcip,
      "itipo_empleado": +tusuario
    })

    return res

  },

  async updateUsuario(id: number, nombre: string, apePat: string, apeMat: string, documento: string, email: string, telefono: string, tperfil: string, tdocumento: string, empresa: string, tusuario: string, state: string, vcip: string) {
    tokenAuth(token);

    const res = await axiosClient.post('usuario/updateUsuario', {
      "iid_usuario": id,
      "vnombres": nombre,
      "vapellido_paterno": apePat,
      "vapellido_materno": apeMat,
      "vnro_documento": documento,
      "vcorreo_electronico": email,
      "vnumero_telefonico": telefono,
      "iid_perfil": +tperfil,
      "iid_tipo_documento": +tdocumento,
      "iid_empresa": +empresa,
      "iid_tipo_usuario": 1,
      "iid_estado_registro": +state,
      "vcip": vcip,
      "itipo_empleado": +tusuario
    })

    return res

  },

  async updateUsuarioConfig(id: number, nombre: string, apePat: string, apeMat: string, documento: string, email: string, telefono: string, tperfil: string, tdocumento: string, empresa: string, tusuario: string, state: string, vcip: string) {
    tokenAuth(token);

    const res = await axiosClient.post('usuario/updateUsuarioWeb', {
      "iid_usuario": id,
      "vnombres": nombre,
      "vapellido_paterno": apePat,
      "vapellido_materno": apeMat,
      "vnro_documento": documento,
      "vcorreo_electronico": email,
      "vnumero_telefonico": telefono,
      "iid_perfil": +tperfil,
      "iid_tipo_documento": +tdocumento,
      "iid_empresa": +empresa,
      "iid_tipo_usuario": 1,
      "iid_estado_registro": +state,
      "vcip": vcip,
      "itipo_empleado": +tusuario
    })

    return res

  },

  async deletUsuario(id: number) {
    tokenAuth(token);

    const res = await axiosClient.post(`usuario/delUsuarioId?iid=${id}`);
    return res;
  },

  async changePasssword(user: number, currentPassword: string, newPassword: string) {
    tokenAuth(token);

    const hashCurrentPassword = crypto.createHash('sha512').update(currentPassword).digest('hex').toUpperCase();
    const hashNewPassword = crypto.createHash('sha512').update(newPassword).digest('hex').toUpperCase();

    const res = await axiosClient.post(`seguridad/setUsuarioChangePasswordId`, {
      "iid_usuario": user, // 1
      "password_actual": hashCurrentPassword, // "hash"
      "newpassword": hashNewPassword, // "hash"
    });

    return res;

  },

  async resetPassword(user: number) {
    tokenAuth(token);

    const res = await axiosClient.post(`seguridad/setUsuarioResetPasswordId`, {
      "iid_usuario": user, // 1
    });

    return res
  },

  async generateCode(user: string, email: string) {

    const { data } = await axiosClient.post(`seguridad/genera_codigo`, {
      "email": email, // "prueba@gmail.com"
      "usuario": user, // "12345678"
    });

    return data
  },

  async recoveryPassword(user: string, email: string, codigo: string, password: string) {
    const hashNewPassword = crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

    const { data } = await axiosClient.post(`seguridad/setUsuarioResetPassword`, {
      "email": email, // "prueba@gmail.com"
      "usuario": user, // "12345678"
      "codigo": codigo, // "657449"
      "password": hashNewPassword, // "220321"
    });

    return data
  }
}