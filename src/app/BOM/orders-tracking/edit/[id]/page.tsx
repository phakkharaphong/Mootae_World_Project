'use client';
import { NavigationMenu } from '@/components/Navmenu';

export default function OrderTrackingAdmin() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <NavigationMenu />
        </div>

        {/* Right Content */}
        <div className="w-6 flex-1 bg-white p-6">
          <div className="flex h-full rounded-sm bg-amber-50">ทดสอบ</div>
        </div>
      </div>
    </>
  );
}
