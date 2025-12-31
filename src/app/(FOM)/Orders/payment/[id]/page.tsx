'use client';

import { notFound, useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

import PaymentSlipForm from './PaymentSlipForm';

type Payment = {
  order_id: string;
  amount: number;
  promptpay_id: string;
  promptpay_payload: string;
};

export default function PaymentPage() {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ['order-payment', id],
    queryFn: async () => await api.get(`order/payment/${id}`).json<Payment>(),
  });

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6 p-4">
      {data && (
        <PaymentSlipForm
          orderId={data.order_id}
          amount={data.amount}
          payload={data.promptpay_payload}
        />
      )}
    </div>
  );
}
