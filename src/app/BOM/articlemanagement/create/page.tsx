'use client';
import { FormComponent } from '@/components/FormComponent';
import { NavigationMenu } from '@/components/Navmenu';
import { articleService } from '@/hooks/use-api-articleService';
import { createArticleblog } from '@/interfaces/Aricleblog';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

export default function CreateArticleBlog() {
  // const [dataform, setFormData] = useState<Record<string, string>>({});
  const router = useRouter()

  const fields = [
    { 
      name: 'title', 
      label: 'หัวข้อ', 
      type: 'text', 
      placeholder: 'กรุณากรอก หัวข้อ' 
    },
    { 
      name: 'cover_img', 
      label: 'ภาพหน้าปก 720 x 360', 
      type: 'file', 
      placeholder: '' 
    },
    { 
      name: 'article_categories_id', 
      label: 'หมวดหมู่', 
      type: 'text', 
      placeholder: 'กรุณาเลือกหมวดหมู่' 
    },
    { 
      name: 'is_active', 
      label: 'สถานะการใช้งาน', 
      type: 'Switch', 
      placeholder: '' 
    },
    { 
      name: 'conten', 
      label: 'รายละเอียด', 
      type: 'TextEditor', 
      placeholder: 'เนื้อความ...' 
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
  const payload: createArticleblog = {
    title: formData.title,
    cover_img: formData.cover_img,
    conten: formData.conten,
    view: 0,
    like: 0,
    article_categories_id: formData.article_categories_id,
    is_active: Boolean(formData.is_active)
  };

  try {
    const result = await articleService.post(payload);
    toast.success('บันทึกข้อมูลสำเร็จ')
    router.push('/BOM/articlemanagement')
    
  } catch{
    toast.error('บันทึกข้อมูลไม่สำเร็จ')
  }
};

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-900 text-white">
        <NavigationMenu />
      </div>
      <div className="flex-1 bg-white p-6">
        <FormComponent fields={fields} onSubmit={handleSubmit} initialValues={{}}/>
      </div>
    </div>
  );
}
