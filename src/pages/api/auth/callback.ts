import type { APIRoute } from 'astro';
import { scalekit, REDIRECT_URI } from '../../../lib/scalekit';

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return Response.redirect(new URL('/', request.url).origin);
  }

  try {
    const { user, idToken, accessToken, refreshToken } =
      await scalekit.authenticateWithCode(code, REDIRECT_URI);

    const secure = url.protocol === 'https:';
    const cookieOptions = { httpOnly: true, path: '/', sameSite: 'lax' as const, secure };

    cookies.set('id_token', idToken, cookieOptions);
    cookies.set('access_token', accessToken, cookieOptions);
    cookies.set('refresh_token', refreshToken, cookieOptions);
    // Store profile for display (non-sensitive)
    cookies.set('user_name', user.name, { path: '/', sameSite: 'lax', secure });
    cookies.set('user_email', user.email, { path: '/', sameSite: 'lax', secure });

    return Response.redirect(new URL('/', request.url).origin);
  } catch (err) {
    console.error('Auth callback error:', err);
    return Response.redirect(new URL('/', request.url).origin + '?error=auth_failed');
  }
};
