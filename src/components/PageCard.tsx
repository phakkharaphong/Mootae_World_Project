import { Card, CardContent, CardHeader } from './ui/card';

interface PageCardProps {
  title?: string;
  children?: Readonly<React.ReactNode>;
}

export default function PageCard({ title, children }: PageCardProps) {
  return (
    <Card className="rounded-none border-0 p-2 shadow-none">
      {title && (
        <CardHeader>
          <h1 className="text-xl font-bold">{title}</h1>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
