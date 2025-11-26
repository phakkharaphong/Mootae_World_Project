'use client';
import { FormComponent } from '@/components/FormComponent';
import { NavigationMenu } from '@/components/Navmenu';
import { articleService } from '@/hooks/use-api-articleService';
import { articleCatService } from '@/hooks/use-api-catearticleservice';
import { createArticleblog } from '@/interfaces/Aricleblog';
import {
  article_categories,
  Articlecategories,
} from '@/interfaces/Articlecategories';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';

export default function CreateArticleBlog() {
  // const [dataform, setFormData] = useState<Record<string, string>>({});
  const [articlecate, setArticleCat] = useState<Articlecategories | null>(null);

  const router = useRouter();

  const fields = [
    {
      name: 'title',
      label: 'หัวข้อ',
      type: 'text',
      placeholder: 'กรุณากรอก หัวข้อ',
      apiUrl: '',
    },
    {
      name: 'cover_img',
      label: 'ภาพหน้าปก 720 x 360',
      type: 'file',
      placeholder: '',
      apiUrl: '',
    },
    // {
    //   name: 'article_categories_id',
    //   label: 'หมวดหมู่',
    //   type: 'text',
    //   placeholder: 'กรุณาเลือกหมวดหมู่',
    //   apiUrl: '',
    // },
    {
      name: 'article_categories_id',
      label: 'หมวดหมู่',
      type: 'Select',
      placeholder: 'กรุณาเลือกหมวดหมู่',
      apiUrl: `http://127.0.0.1:8000/articlecategories/?page=${1}&limit=${10}`,
    },
    {
      name: 'is_active',
      label: 'สถานะการใช้งาน',
      type: 'Switch',
      placeholder: '',
      apiUrl: '',
    },
    {
      name: 'conten',
      label: 'รายละเอียด',
      type: 'TextEditor',
      placeholder: 'เนื้อความ...',
      apiUrl: '',
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    const payload: createArticleblog = {
      title: formData.title,
      cover_img: formData.cover_img,
      conten: formData.conten,
      view: 0,
      like: 0,
      article_categories_id: formData.article_categories_id,
      is_active: Boolean(formData.is_active),
    };

    try {
      const result = await articleService.post(payload);
      toast.success('บันทึกข้อมูลสำเร็จ');
      router.push('/BOM/articlemanagement');
    } catch {
      toast.error('บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-900 text-white">
        <NavigationMenu />
      </div>
      <div className="flex-1 bg-white p-6">
        <FormComponent
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={{}}
        />
      </div>
    </div>
  );
}
