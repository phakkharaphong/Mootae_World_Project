'use client';

import { NavigationMenu } from '@/components/Navmenu';

export default function Dashboardpage() {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <NavigationMenu />
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white p-6 w-6">
            <div className='flex bg-amber-50 rounded-sm h-full'>
                ทดสอบ
            </div>
        </div>
      </div>
    </>
  );
}
