export default function TitleBadge({ title }: { title: string }) {
  return (
    <span className="bg-primary inline-flex items-center rounded-full px-6 py-3">
      <h3 className="text-3xl uppercase">{title}</h3>
    </span>
  );
}
