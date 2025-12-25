type MenuItem = {
  title: string;
  url: string;
};

export const items: MenuItem[] = [
  {
    title: 'หน้าแรก',
    url: '/Home',
  },
  {
    title: 'เกี่ยวกับเรา',
    url: '/About',
  },
  {
    title: 'บทความ',
    url: '/Articles',
  },
  {
    title: 'ตรวจสอบคำสั่งซื้อ',
    url: '/Orders',
  },
  {
    title: 'วอลเปเปอร์',
    url: '/Wallpaper',
  },
  {
    title: 'แบบฟอร์มสั่งซื้อ',
    url: '/Wallpaper/form',
  },
];
