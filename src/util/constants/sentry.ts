export const getSentryDSN = () =>
    process.env.NEXT_PUBLIC_SENTRY_DSN ??
    ' https://4ae5b1e889884dcac6c2e54c812cc8a2@sentry.ente.io/4';

export const getSentryENV = () =>
    process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development';

export const getSentryRelease = () => process.env.SENTRY_RELEASE;

export { getIsSentryEnabled } from '../../../sentryConfigUtil';
