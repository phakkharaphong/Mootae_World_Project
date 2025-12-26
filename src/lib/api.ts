import ky from 'ky';

import { withBasePath } from './base-path-manager';
import { getAccessToken, removeAccessToken } from './token-manager';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = globalThis.window ? getAccessToken() : null;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (_, __, response) => {
        if (!response.ok) {
          // Handle unauthorized: redirect to login
          if (response.status === 401) {
            if (
              globalThis.window &&
              globalThis.location.pathname.replace(/\/+$/, '') !==
                withBasePath('/login').replace(/\/+$/, '')
            ) {
              removeAccessToken();
              globalThis.location.href = withBasePath('/login');
            }
          }

          // Handle forbidden: redirect to access denied
          if (response.status === 403) {
            if (
              globalThis.window &&
              globalThis.location.pathname.replace(/\/+$/, '') !==
                withBasePath('/access-denied').replace(/\/+$/, '')
            ) {
              globalThis.location.href = withBasePath('/access-denied');
            }
          }
        }
      },
    ],
  },
});
