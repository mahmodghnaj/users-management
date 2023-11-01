import useStore from "@/store";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import {
  type AxiosRequestConfig,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { api } from "./api";

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = useStore.getState().auth.token;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  await sleep(2000);
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const config: any = error.config;
  if (error.response?.status === 401 && url && !config._retry) {
    config._retry = true;
    try {
      const { data } = await api.post(`${url}/auth/refresh`);
      useStore.getState().auth.setToken(data.token);
      return api(config);
    } catch (error) {
      location.reload();
    }
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      // console.log(errorMessage);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    await Promise.reject(error);
  }
};