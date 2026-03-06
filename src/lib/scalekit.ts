import { ScalekitClient } from '@scalekit-sdk/node';

export const scalekit = new ScalekitClient(
  import.meta.env.SCALEKIT_ENVIRONMENT_URL,
  import.meta.env.SCALEKIT_CLIENT_ID,
  import.meta.env.SCALEKIT_CLIENT_SECRET
);

export const REDIRECT_URI =
  import.meta.env.SCALEKIT_REDIRECT_URI ?? 'http://localhost:4321/api/auth/callback';
