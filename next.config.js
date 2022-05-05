const { withSentryConfig } = require('@sentry/nextjs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const { getGitSha, getIsSentryEnabled } = require('./configUtil');

const GIT_SHA = getGitSha();

const IS_SENTRY_ENABLED = getIsSentryEnabled();

module.exports = (phase) =>
    withSentryConfig(
        {},
        {
            release: GIT_SHA,
            dryRun: phase === PHASE_DEVELOPMENT_SERVER || !IS_SENTRY_ENABLED,
        }
    );
