import Link from 'next/link';
import { SlashIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Articlecategories } from '@/interfaces/Articlecategories';

export function BreadcrumbWithCustomSeparator({
  response = [],
  onCategorySelect,
}: {
  response?: Articlecategories[];
  onCategorySelect?: (id: string) => void;
}) {
  return (
    <div className="bg-white px-4 py-4 sm:px-6 lg:px-8">
      <Breadcrumb className="w-full overflow-x-auto">
        <BreadcrumbList className="flex flex-wrap items-center gap-2 sm:gap-4">
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="m-3 cursor-pointer hover:text-blue-500"
              onClick={() => onCategorySelect?.('')}
            >
              <span>ทั้งหมด</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {response.map((items) => (
            <BreadcrumbItem key={items.id}>
              <BreadcrumbLink
                asChild
                className="m-3 cursor-pointer hover:text-blue-500"
                onClick={() => onCategorySelect?.(items.id)}
              >
                <span>{items.name || 'ทดสอบ'}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
