import type { APIRoute } from 'astro';
import { scalekit } from '../../../lib/scalekit';

export const GET: APIRoute = async ({ request, cookies }) => {
  const idToken = cookies.get('id_token')?.value;

  cookies.delete('id_token', { path: '/' });
  cookies.delete('access_token', { path: '/' });
  cookies.delete('refresh_token', { path: '/' });
  cookies.delete('user_name', { path: '/' });
  cookies.delete('user_email', { path: '/' });

  const postLogoutRedirectUri = new URL('/', request.url).origin;

  const logoutUrl = scalekit.getLogoutUrl({
    idTokenHint: idToken,
    postLogoutRedirectUri,
  });

  return Response.redirect(logoutUrl);
};
