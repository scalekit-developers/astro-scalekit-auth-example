import { defineMiddleware } from 'astro:middleware';
import type { IdTokenClaim } from '@scalekit-sdk/node';
import { scalekit } from './lib/scalekit';

export const onRequest = defineMiddleware(async (context, next) => {
  const accessToken = context.cookies.get('access_token')?.value;

  if (accessToken) {
    try {
      const claims = await scalekit.validateToken<IdTokenClaim>(accessToken);
      context.locals.user = {
        sub: claims.sub,
        email: claims.email,
        name: claims.name,
      };
    } catch {
      // Access token invalid or expired — try to refresh
      const refreshToken = context.cookies.get('refresh_token')?.value;
      if (refreshToken) {
        try {
          const { accessToken: newAccessToken } =
            await scalekit.refreshAccessToken(refreshToken);

          const secure = new URL(context.request.url).protocol === 'https:';
          context.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure,
          });

          const claims = await scalekit.validateToken<IdTokenClaim>(newAccessToken);
          context.locals.user = {
            sub: claims.sub,
            email: claims.email,
            name: claims.name,
          };
        } catch {
          // Refresh failed — clear all session cookies
          context.cookies.delete('access_token', { path: '/' });
          context.cookies.delete('refresh_token', { path: '/' });
          context.cookies.delete('id_token', { path: '/' });
          context.cookies.delete('user_name', { path: '/' });
          context.cookies.delete('user_email', { path: '/' });
        }
      }
    }
  }

  return next();
});
