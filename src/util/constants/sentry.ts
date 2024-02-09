export const getSentryDSN = () =>
    process.env.NEXT_PUBLIC_SENTRY_DSN ??
    'https://9e9d1082eca2168e1a4221cbc51eb421@sentry.ente.io/7';

export const getSentryENV = () =>
    process.env.NEXT_PUBLIC_SENTRY_ENV ?? 'development';

export const getSentryRelease = () => process.env.SENTRY_RELEASE;

export { getIsSentryEnabled } from '../../../sentryConfigUtil';
