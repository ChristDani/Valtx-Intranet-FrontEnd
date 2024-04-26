"use client";

import axiosClient from "../axios.service";
import { getCookie } from "../get-cookie.service";
import tokenAuth from "../token.service";
import crypto from 'crypto'

const token = getCookie("token") || "";

export const userServices = {

  async getList(pageNumber: number, itemsPerPage: number, nombre: string, apellidos: string, documento: string, tdocumento: number, tperfil: number, state: number) {

    tokenAuth(token);

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
      "iid_tipo_usuario": +tusuario,
      "iid_estado_registro": +state,
      "vcip": vcip
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
      "iid_tipo_usuario": +tusuario,
      "iid_estado_registro": +state,
      "vcip": vcip
    })

    return res

  },

  async deletUsuario(id: number) {
    tokenAuth(token);

    const res = await axiosClient.post(`usuario/delUsuarioId?iid=${id}`);
    return res;
  },

  async changePasssword() {

  },

  async resetPassword(user: string) {

    const passwordEncrypt = crypto.createHash('sha512').update(user).digest('hex').toUpperCase();

    const res = await axiosClient.post(`seguridad/setUsuarioChangePassword`, {
      "usuario": user, //"12345678"
      "flg_isnuevo": true,
      "password": passwordEncrypt //"1234567891"
    });

  }
}