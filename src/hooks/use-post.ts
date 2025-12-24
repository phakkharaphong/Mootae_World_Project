import ky from 'ky';

const api = ky.create().extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request, _, { retryCount }) => {
        if (retryCount === 0) {
          const token = localStorage.getItem('accessToken');
          if (!token) return;
          request.headers.set('Authorization', `${token}`);
        }
      },
    ],
    afterResponse: [
      (__, _, response) => {
        if (
          response.status === 401 &&
          window.location.pathname !== '/BOM/authen'
        ) {
          window.location.href = '/BOM/authen';
        }
      },
    ],
  },
});

export default api;
