export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type Category = 
  | "TRADITIONAL" 
  | "ARABIC" 
  | "BRIDAL" 
  | "MODERN" 
  | "MINIMAL" 
  | "FESTIVE" 
  | "KIDS";

export type EventType = 
  | "WEDDING" 
  | "ENGAGEMENT" 
  | "FESTIVAL" 
  | "PARTY" 
  | "CORPORATE" 
  | "OTHER";

export type BookingStatus = 
  | "PENDING" 
  | "CONFIRMED" 
  | "COMPLETED" 
  | "CANCELLED";
