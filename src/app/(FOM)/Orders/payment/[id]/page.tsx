import { notFound } from 'next/navigation';

import PaymentSlipForm from './PaymentSlipForm';

type Payment = {
  order_id: string;
  amount: number;
  promptpay_id: string;
  promptpay_payload: string;
};

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let paymentData: Payment;

  try {
    const orderPayment = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/payment/${id}`
    );
    if (!orderPayment.ok) {
      throw new Error('Payment not found');
    }
    paymentData = (await orderPayment.json()) as Payment;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6 p-4">
      <PaymentSlipForm
        orderId={paymentData.order_id}
        amount={paymentData.amount}
        payload={paymentData.promptpay_payload}
      />
    </div>
  );
}
