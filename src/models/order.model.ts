import { OrderType } from "@/interfaces/OrderType";

export interface Order {
  id: string;
  order_type_id: string;
  emphasize_particular: string;
  supplement: string;
  supplement_other: string;
  birth_date_idol: string;
  services_zodiac: boolean;
  services_auspicious: boolean;
  first_name_customer: string;
  last_name_customer: string;
  birth_date_customer: string;
  birth_time_customer: string;
  gender: string;
  lgbt_description?: string;
  congenital_disease?: string;
  phone: string;
  email: string;
  note?: string;
  newsletter?: boolean;
  read_accept_pdpa: boolean;
  promotion_id?: string;
  total_price: number;
  is_active: boolean;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  created_at?: string;
}

export interface OrderJoin {
  id: string;
  order_type_id: string;
  order_type: OrderType;
  first_name_customer: string;
  last_name_customer: string;
  phone: string;
  email: string;
  payment_status: string;
  birth_date_customer_number: number;
  birth_month_customer_number: number;
  zodiac_customer_number: number;
  total_price: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}
