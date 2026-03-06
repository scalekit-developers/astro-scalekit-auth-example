import type { APIRoute } from 'astro';
import { scalekit, REDIRECT_URI } from '../../../lib/scalekit';

export const GET: APIRoute = async () => {
  const url = scalekit.getAuthorizationUrl(REDIRECT_URI, {
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  });
  return Response.redirect(url);
};
