export interface Paginated<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
