import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="bg-primary text-white">
        <div className="flex items-center justify-between gap-2 p-2 max-lg:flex-col">
          <Image
            src={`/images/logoMootae world (NO CIRCLE).png`}
            width={84}
            height={83}
            className="w-14 lg:w-20"
            alt="mootae world logo"
          />
          <nav className="max-lg:hidden">
            <ul className="flex gap-4 text-lg">
              <li>หน้าแรก</li>
              <li>สำหรับองค์กร</li>
              <li>วอลเปเปอร์เสริมดวง</li>
              <li>มั่งมู</li>
              <li>บทความ</li>
              <li>ติดตามการสั่งซื้อ</li>
              <li>สั่งซื้อสินค้า</li>
            </ul>
          </nav>
        </div>
      </div>
      <nav className="sticky top-0 overflow-x-auto border-b border-gray-200 bg-white shadow">
        <ul className="mx-auto inline-flex *:p-4 *:whitespace-nowrap">
          <li>หน้าแรก</li>
          <li>สำหรับองค์กร</li>
          <li>วอลเปเปอร์เสริมดวง</li>
          <li>มั่งมู</li>
          <li>บทความ</li>
          <li>ติดตามการสั่งซื้อ</li>
          <li>สั่งซื้อสินค้า</li>
        </ul>
      </nav>
      <div className="aspect-[3/1] bg-gray-50"></div>
      <div className="p-8">
        <h2 className="mb-4 text-center text-4xl font-bold">กำลังมาแรง</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="rounded-lg bg-white p-4 shadow-md" key={index}>
              <div className="mb-4 aspect-square rounded bg-gray-50"></div>
              <h5 className="text-primary text-xl font-bold">Title</h5>
              <h6 className="text-lg">Subtitle</h6>
              <p className="line-clamp-3">
                Description : Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Doloremque incidunt inventore repudiandae
                fugiat repellat, dolore culpa, quas, tenetur maiores molestias
                facilis perspiciatis error sit omnis! Ex sunt id culpa officiis.
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
