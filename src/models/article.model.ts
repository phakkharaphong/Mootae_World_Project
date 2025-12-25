export interface Article {
  id: string;
  title: string;
  cover_img?: string;
  content?: string;
  view: number;
  like: number;
  category_id: string;
  is_active: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}
