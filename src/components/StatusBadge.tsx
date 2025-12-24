import { Badge } from './ui/badge';

export default function StatusBadge({ active = false }: { active: boolean }) {
  return (
    <Badge
      className={
        active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }
    >
      {active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
    </Badge>
  );
}
