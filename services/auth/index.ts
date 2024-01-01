import { api } from "@/lib/axios/api";
import Cookies from "js-cookie";
import { UseQueryOptions, useMutation, useQuery } from "react-query";
import {
  EmailConfirmBody,
  ForgotPasswordBody,
  InfSession,
  LoginBody,
  LoginResponse,
  RegisterBody,
  RestPasswordBody,
  User,
} from "./type";
import { setRefreshToken } from "@/lib/axios/interceptors";
import { useCallback } from "react";

export const useLogin = () =>
  useMutation<LoginResponse, unknown, LoginBody>(["login"], async (body) => {
    const { data } = await api.post("/auth/login", body);
    setRefreshToken(data.refreshToken);
    return data;
  });

export const useRegister = () =>
  useMutation<LoginResponse, unknown, RegisterBody>(
    ["register"],
    async (body) => {
      const { data } = await api.post("/auth/register", body);
      setRefreshToken(data.refreshToken);
      return data;
    }
  );

export const useLogout = () =>
  useMutation(["logout"], async () => {
    const { data } = await api.post("/auth/logout");
    Cookies.remove("refresh"); /// TODO::
    return data;
  });

export const useEmailConfirm = () =>
  useMutation<any, any, EmailConfirmBody>(["emailConfirm"], async (body) => {
    const { data } = await api.post("/auth/email/confirm", body);
    return data;
  });

export const useRestPassword = () =>
  useMutation<any, any, RestPasswordBody>(["restPassword"], async (body) => {
    const { data } = await api.post("/auth/reset/password", body);
    return data;
  });

export const useForgotPassword = () =>
  useMutation<any, any, ForgotPasswordBody>(
    ["forgotPassword"],
    async (body) => {
      const { data } = await api.post("/auth/forgot/password", body);
      return data;
    }
  );

export const useInfSession = (
  optionsQuery?: UseQueryOptions<InfSession, any, InfSession>
) =>
  useQuery<InfSession>(
    ["infSession"],
    async () => {
      const { data } = await api.post("/auth/info-session");
      return data;
    },
    { ...optionsQuery }
  );

export const useMe = () =>
  useQuery<User>(["me"], async () => {
    const { data } = await api.get("/auth/me");
    return data;
  });
