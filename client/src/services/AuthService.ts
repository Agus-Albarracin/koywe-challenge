import axios from 'axios';  
import { SignupResponse, SigninResponse } from '@/models/auth/AuthResponse';  

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';  

export const authService = {  
  async login(username: string, password: string): Promise<SigninResponse> {  
    try {  
      if (!BASE_URL) {  
        throw new Error('No se encontró la API URL');  
      }  
      const response = await axios.post(
        `${BASE_URL}/auth/signin`,
        { username, password },
        { withCredentials: true } 
      );
      return response.data;
    } catch (error) {  
      console.error('Hubo un error en el login:', error);  
      throw error;  
    }  
  },  

  async register(email: string, password: string, username: string): Promise<SignupResponse> {  
    try {  
      if (!BASE_URL) {  
        throw new Error('No se encontró la API URL');  
      }  
      const response = await axios.post(`${BASE_URL}/auth/signup`, {  
        email,  
        password,  
        username,  
      });  
      return response.data;  
    } catch (error) {  
      console.error('Se encontró un problema:', error);  
      throw error;  
    }  
  },
  async logout(): Promise<void> {
    if (!BASE_URL) throw new Error('La URL de la api no esta siendo procesada');

    await axios.post(`${BASE_URL}/auth/logout`, {}, {
      withCredentials: true,
    });
  },  
};
