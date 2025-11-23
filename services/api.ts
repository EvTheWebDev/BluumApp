import { API_CONFIG, API_ENDPOINTS } from '@/config/api';
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  Patient,
  ApiError,
} from '@/types/api';
import { tokenStorage } from './tokenStorage';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = await tokenStorage.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await this.fetchWithTimeout(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
        throw error;
      }

      return data as T;
    } catch (error) {
      if ((error as ApiError).message) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  async login(pairingCode: string): Promise<LoginResponse> {
    const body: LoginRequest = {
      pairing_code: pairingCode,
    };

    const response = await this.request<LoginResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    await tokenStorage.setToken(response.token);
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request<LogoutResponse>(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      });
    } finally {
      await tokenStorage.removeToken();
    }
  }

  async getCurrentPatient(): Promise<Patient> {
    return this.request<Patient>(API_ENDPOINTS.ME, {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient();
