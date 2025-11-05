// import { refreshAccessToken } from './token-service';
import axios from 'axios';
// import { toast } from 'sonner';
// import { getAccessToken, setTokens, clearSession, clearTokens } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_Local,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   (config) => {
//     // const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// let isRefreshing = false;
// let refreshPromise: Promise<void> | null = null;
// let isRedirecting = false;

// type RetriableAxiosRequestConfig = AxiosRequestConfig & {
//   _retry?: boolean;
// };

// const triggerLoginRedirect = () => {
//   if (isRedirecting) return;
//   isRedirecting = true;
//   try {
//     clearTokens();
//     clearSession();
//   } catch {}
//   if (typeof window !== 'undefined') {
//     try {
//       window.location.href = '/Auth/Login';
//     } finally {
//       // Fallback in case navigation is blocked
//       setTimeout(() => {
//         try {
//           window.location.assign('/Auth/Login');
//         } catch {}
//       }, 50);
//     }
//   }
// };

// api.interceptors.response.use(
//   async (response) => {
//     // If login response contains tokens, persist them via cookie utils
//     const url = response.config.url || '';
//     const data = (
//       response.data as {
//         data?: { accessToken?: string; refreshToken?: string };
//       }
//     ).data;
//     if (
//       data?.accessToken &&
//       data?.refreshToken &&
//       (url.includes('/Auth') || url.toLowerCase().includes('login'))
//     ) {
//       try {
//         setTokens(data.accessToken, data.refreshToken);
//       } catch {
//         // no-op; setting cookies can fail in edge cases like SSR-only contexts
//       }
//     }
//     return response;
//   },
//   async (error) => {
//     // Ignore cancellation errors (e.g., when a component unmounts or a newer request aborts the previous one)
//     if (
//       axios.isCancel?.(error) ||
//       error?.code === 'ERR_CANCELED' ||
//       error?.name === 'CanceledError'
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response) {
//       const originalRequest: RetriableAxiosRequestConfig = error.config || {};
//       const status = error.response.status;
//       const url = (originalRequest.url || '').toLowerCase();
//       const isAuthEndpoint =
//         url.includes('/auths/refreshtoken') || url.includes('/auth');

//       const unauthorizedCodes = new Set([401, 403, 419, 440, 498, 499]);

//       if (unauthorizedCodes.has(status)) {
//         // Avoid retry/refresh on auth endpoints themselves
//         if (isAuthEndpoint) {
//           triggerLoginRedirect();
//           return Promise.reject(error);
//         }

//         if (!originalRequest._retry && status !== 403) {
//           originalRequest._retry = true;
//           try {
//             if (!isRefreshing) {
//               isRefreshing = true;
//               refreshPromise = refreshAccessToken().finally(() => {
//                 isRefreshing = false;
//               });
//             }
//             await refreshPromise;
//             return api(originalRequest);
//           } catch (e) {
//             toast.error('Session expired. Please log in again.');
//             triggerLoginRedirect();
//             return Promise.reject(e);
//           }
//         }

//         // For 403 (forbidden) or if already retried, redirect
//         toast.error('Session expired. Please log in again.');
//         triggerLoginRedirect();
//         return Promise.reject(error);
//       }

//       // Non-auth errors
//       // toast.error('An error occurred. Please try again later.');
//     } else {
//       console.log('Error without response:', error);
//       // toast.error('An error occurred. Please try again later.');
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
