'use strict';

module.exports = {
  hooks: {
    'pre-push': `npm run ci`,
    'commit-msg': `cross-env-shell commitlint -e \${HUSKY_GIT_PARAMS}`
  }
};
