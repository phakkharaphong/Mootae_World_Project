import { OrderJoin } from "@/models/order.model"

export interface OrderPayment {
    id: string,
    order_id: string,
    order: OrderJoin,
    amount: number,
    slip_url: string,
    payment_date: string,
    status: string,
    admin_note: string,
    created_at: string
}