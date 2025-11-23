// API Types based on OpenAPI specification

export interface Patient {
  id: number;
  username: string;
  pairing_code?: string | null;
  paired_at?: string | null;
  avatar_id?: number | null;
  avatar?: Avatar;
  experience: number;
  gems: number;
  device_identifier?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Avatar {
  id: number;
  name: string;
  description?: string | null;
  base_path: string;
  layer_count: number;
  is_default: boolean;
  layers?: AvatarLayer[];
}

export interface AvatarLayer {
  id: number;
  layer_number: number;
  layer_name: string;
  image_path: string;
}

export interface LoginRequest {
  pairing_code: string;
  device_identifier?: string | null;
}

export interface LoginResponse {
  token: string;
  patient: Patient;
}

export interface LogoutResponse {
  message: string;
}

export interface ValidationError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
