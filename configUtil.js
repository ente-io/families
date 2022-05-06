const cp = require('child_process');
const { getIsSentryEnabled } = require('./sentryConfigUtil');

module.exports = {
    getGitSha: () =>
        cp.execSync('git rev-parse --short HEAD', {
            cwd: __dirname,
            encoding: 'utf8',
        }),
    getIsSentryEnabled: getIsSentryEnabled,
};
