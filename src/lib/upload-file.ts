import { api } from './api';

export function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return api
    .post('attachment/upload', {
      body: formData,
    })
    .json<{
      filename: string;
      url: string;
    }>();
}
