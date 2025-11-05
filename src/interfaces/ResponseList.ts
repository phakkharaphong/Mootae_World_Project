export interface ResponseList<T>{
    message: string;
    data: T;
}

export interface ApiPaginatedResponse<T> {
  message: string; 
  data: T[];       
  pagination: {
    page: number; 
    limit: number;
    total: number; 
  };
}

