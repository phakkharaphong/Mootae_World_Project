import { SidebarTrigger } from '@/components/ui/sidebar';

export default function BOMHeader() {
  return (
    <header className="h-(header-height) p-2">
      <SidebarTrigger />
    </header>
  );
}
