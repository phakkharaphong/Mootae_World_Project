'use client';

import { FieldList } from '@/interfaces/FieldList';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Articlecategories } from '@/interfaces/Articlecategories';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';

const TextEditor = dynamic(() => import('./TextEditor'), {
  ssr: false,
});

export function FormComponent<T>({
  fields,
  onSubmit,
  initialValues,
}: {
  fields: FieldList[];
  onSubmit: (values: T) => void;
  initialValues: T;
}) {
  const [formData, setFormData] = useState<T>(initialValues);

  const [selectOptions, setSelectOptions] =
    useState<ApiPaginatedResponse<Articlecategories | null>>();

  useEffect(() => {
    setFormData(initialValues);
    console.log('init', initialValues);
  }, [initialValues]);

  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === 'Select' && field.apiUrl) {
        const fetchData = async () => {
          const res = await fetch(field.apiUrl);
          const data = await res.json();
          setSelectOptions(data);
        };
        fetchData();
      }
    });
  }, [fields]);

  const renderField = (field: FieldList) => {
    const name = field.name as keyof T;

    switch (field.type) {
      case 'TextEditor':
        return (
          <TextEditor
            value={formData[name] as string}
            onChange={(value) => handleChange(name, value as T[keyof T])}
          />
        );

      case 'Switch':
        return (
          <Switch
            id={field.name}
            checked={formData[name] === true}
            onCheckedChange={(checked) =>
              handleChange(name, checked as T[keyof T])
            }
          />
        );

      case 'Select':
        return (
          <div className="grid grid-cols-3 gap-4">
            <Select
              value={formData[name] as string}
              onValueChange={(value) => handleChange(name, value as T[keyof T])}
            >
              <SelectTrigger id={field.name}>
                <SelectValue placeholder={field.placeholder || 'กรุณาเลือก'} />
              </SelectTrigger>
              <SelectContent>
                {selectOptions?.data.map((item) => (
                  <SelectItem value={String(item?.id)} key={item?.id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={(formData[name] as string) || ''}
            onChange={(e) => handleChange(name, e.target.value as T[keyof T])}
          />
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
      {fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {renderField(field)}
        </div>
      ))}

      <Button type="submit">Submit</Button>
    </form>
  );
}
