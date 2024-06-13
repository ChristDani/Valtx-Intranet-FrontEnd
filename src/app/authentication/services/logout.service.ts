import React from "react";
import Cookies from "js-cookie";
import axiosClient from "@/app/intranet/services/axios.service";
import secureLocalStorage from "react-secure-storage";
import tokenAuth from "@/app/intranet/services/token.service";
import { getCookie } from "@/app/intranet/services/get-cookie.service";

const LogoutService =  async () => {

  const cookieRefresh = getCookie("refresh") || "";
  const token1 = getCookie('token') || "";
  const perfilId: string =
    secureLocalStorage.getItem("perfil")?.toString() || "";

    tokenAuth(token1);

  const first = await axiosClient.post("seguridad/logout", {
    refreshToken: cookieRefresh,
    userId: perfilId,
  });



  Cookies.remove("token");
  Cookies.remove("refresh");

};

export default LogoutService;
