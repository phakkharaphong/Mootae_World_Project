import axios from 'axios';
// import {
//   getAccessToken,
//   getRefreshToken,
//   setTokens,
//   clearTokens,
// } from './auth';
// import { clearSession } from './auth';

// Refresh access token using a bare axios instance to avoid interceptor recursion
// export const refreshAccessToken = async (): Promise<void> => {
//   const refreshToken = getRefreshToken();
//   const accessToken = getAccessToken();
//   if (!refreshToken) throw new Error('No refresh token available');

//   const client = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//   });

//   try {
//     const res = await client.post('/Auths/RefreshToken', {
//       refreshToken,
//       accessToken,
//     });
//     const tokens = (
//       res.data as { data?: { accessToken?: string; refreshToken?: string } }
//     ).data;
//     if (!tokens?.accessToken || !tokens?.refreshToken) {
//       throw new Error('Invalid refresh response');
//     }
//     setTokens(tokens.accessToken, tokens.refreshToken);
//   } catch (err) {
//     // Clear tokens and bubble up error for caller to handle (e.g., redirect)
//     clearTokens();
//     clearSession();
//     throw err;
//   }
// };
