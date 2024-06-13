"use client";

import axiosClient from "../axios.service";
import axios from "../axios.service";
import { getCookie } from "../get-cookie.service";
import tokenAuth from "../token.service";

const token = getCookie("token") || "";

export const PerfilesService = {
  async getList(
    pageNumber: number,
    itemsPerPage: number,
    nombre: string,
    descripcion: string,
    state: number
  ) {
    tokenAuth(token);

    const { data } = await axiosClient.post("perfil/getPerfilList", {
      'inumero_pagina': pageNumber - 1, // 0
      'itotal_pagina': itemsPerPage, // 10
      'vnombre_perfil': nombre, // ""
      'vdescripcion_perfil': descripcion, // ""
      'iid_estado_registro': state, // -1
    });

    return data;
  },

  async create(titulo: string, descripcion: string, id: string,state:string) {
    tokenAuth(token);

    const  data  = await axiosClient.post("perfil/setperfil", {
      "iid_perfil": id,
      "vnombre_perfil": titulo,
      "vdescripcion_perfil": descripcion,
      "iid_estado_registro": +state
    });

    return data;
  },

  async update(titulo: string, descripcion: string, id: any, estado: string) {
    tokenAuth(token);

    const res = await axiosClient.post("perfil/updateperfil", {
      'iid_perfil': id,
      'vnombre_perfil': titulo,
      'vdescripcion_perfil': descripcion,
      'iid_estado_registro': +estado
    });

    return res;
  },

  async getPerfilById(id: string) {
    tokenAuth(token);

    const { data } = await axiosClient.get(`perfil/getPerfilId?id=${id}`);
    return data;
  },

  async delete(id: any) {
    tokenAuth(token);

    const res = await axiosClient.post(`perfil/delPerfilId`, {
        'iid_perfil': id
      });
  },

  async getOptionsByPerfilId(perfilId: string) {
    tokenAuth(token);

    const res = await axiosClient.post("perfil/getPerfilOpcionId", {
      iid_perfil: perfilId,
    });

    return res;
  },

  async setPerfil(perfil: any) {
    tokenAuth(token);

    const res = await axiosClient.post("perfil/setperfil", perfil);

    return res;
  },
};
