// TypeScript interfaces and types for the application
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface FormData {
  [key: string]: string | number | boolean | File | null | undefined;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Theme {
  colors: {
    primary: Record<number, string>;
    gray: Record<number, string>;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    fontFamily: {
      primary: string[];
      secondary: string[];
    };
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}