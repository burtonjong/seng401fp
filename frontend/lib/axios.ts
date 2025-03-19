import axios, { AxiosRequestConfig } from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchApi<T>(
  endpoint: string,
  options?: Omit<AxiosRequestConfig, "url">
): Promise<T> {
  try {
    const response = await api({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      throw new Error(error.response?.data.message || error.message);
    }
    throw error;
  }
}
