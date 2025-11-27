export interface UserProfile {
  id: string;
  username: string;
  f_name: string;
  l_name: string;
  phone: string;
  img_profile: string;
  address: string;
  following: number;
  keep_following: number;
  role_id: string;
  is_active: boolean;
}
