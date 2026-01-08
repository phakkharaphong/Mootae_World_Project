export interface Order {
  id: string;
  order_no: string;
  frist_name_customer: string;
  last_name_customer: string;
  email: string;
  total_price: number;
  payment_status: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}


export interface OrderRow {
  id: string;
  order_no: string;
  first_name_customer?: string;
  frist_name_customer?: string;
  last_name_customer?: string;
  email: string;
  total_price: number;
  payment_status?: string;
  created_at?: string;
};