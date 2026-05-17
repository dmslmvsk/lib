import { api } from "../axios";
import type { LoginFormData } from "@/components/forms/login-form";
import type { RegisterFormData } from "@/components/forms/register-form";
import type { User } from "../types/user.types";

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (data: LoginFormData) => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },
  
  register: async (data: RegisterFormData) => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  }
};