'use strict';

module.exports = {
  hooks: {
    'commit-msg': `cross-env-shell commitlint -e \${HUSKY_GIT_PARAMS}`
  }
};
