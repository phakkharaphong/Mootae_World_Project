export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Payment Not Found</h1>
      <p className="text-lg text-center">
        The payment information you are looking for does not exist or has been
        removed.
      </p>
    </div>
  );
}