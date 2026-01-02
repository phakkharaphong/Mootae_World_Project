export interface NewsBanner {
  id: number;
  title: string;
  img_path: string;
  link_ref: string;
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}
