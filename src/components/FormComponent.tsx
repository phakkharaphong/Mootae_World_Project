'use client';
import { FieldList } from '@/interfaces/FieldList';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useEffect, useState } from 'react';
import TextEditor from './TextEditor';
import { Switch } from './ui/switch';

export function FormComponent<T>({
  fields,
  onSubmit,
  initialValues, // เพิ่ม props
}: {
  fields: FieldList[];
  onSubmit: (values: T) => void;
  initialValues: T;
}) {
  const [formData, setFormData] = useState<T>(initialValues);
  useEffect(() => {
    setFormData(initialValues);
    console.log('init 1', initialValues);
  }, [initialValues]);
 useEffect(() =>{
  console.log('init',initialValues)
 }, [initialValues])
  
  const handleChange = <K extends keyof T>(name: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (fields: FieldList) => {
    const name = fields.name as keyof T;
    console.log(name)

    switch (fields.type) {
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
            id={fields.name}
            checked={formData[name] === true}
            onCheckedChange={(checked) =>
              handleChange(name, checked as T[keyof T])
            }
          />
        );
      default:
        return (
          <Input
            id={fields.name}
            type={fields.type}
            placeholder={fields.placeholder}
            value={formData[name] as string || ''}
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
