export const getSentryDSN = () =>
    process.env.NEXT_PUBLIC_SENTRY_DSN ??
    'https://6240dfed954847d496907c004da1a9af@sentry.ente.io/7';

export const getSentryENV = () =>
    process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development';

export const getSentryRelease = () => process.env.SENTRY_RELEASE;

export { getIsSentryEnabled } from '../../../sentryConfigUtil';
