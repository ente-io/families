export const getSentryDSN = () =>
    process.env.NEXT_PUBLIC_SENTRY_DSN ??
    'https://ea6210a7e628d0d1457fd8e74a01d2bf@sentry.ente.io/7';

export const getSentryENV = () =>
    process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development';

export const getSentryRelease = () => process.env.SENTRY_RELEASE;

export { getIsSentryEnabled } from '../../../sentryConfigUtil';
