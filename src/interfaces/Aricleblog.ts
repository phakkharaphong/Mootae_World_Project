import { article_categories } from './Articlecategories';

export interface Articleblog {
  id: string;
  title: string;
  cover_img: string;
  conten: string;
  view: number;
  like: number;
  article_categories_id: string;
  article_categories: article_categories[];
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
export interface createArticleblog {
  title: string;
  cover_img: string;
  conten: string;
  view: number;
  like: number;
  article_categories_id: string;
  is_active: boolean;
}
