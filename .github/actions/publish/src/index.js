// Debug locally
//   Under action directory
//     node src/index.js refs/tags/github-ui@0.2.0 token
//   Under root directory
//     yarn package -- refs/tags/github-ui@0.2.0 token
const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
// refs/tags/package-name@version
// refs/tags/@scope/package-name@version
const githubTag = core.getInput('tag') || process.argv[2];
const npmToken = core.getInput('token') || process.argv[3];
const repoDir = path.resolve(__dirname, '../../../..');

const allowed = ['github-ui'];

const npmrc = async () => {
  const npmrcFile = path.resolve(repoDir, '.npmrc');
  console.info('Preparing .npmrc:', npmrcFile);
  fs.writeFileSync(npmrcFile, [
    'registry=http://registry.npmjs.org',
    `//registry.npmjs.org/:_authToken=${npmToken}`
  ].join('\n'));
};

const parseTag = async () => {
  console.info('Parsing tag:', githubTag);
  const regexp = new RegExp(/^refs\/tags\/(.+)@([^@]+)$/);
  const matched = regexp.exec(githubTag);
  return {
    package: matched[1],
    version: matched[2],
  };
};

const search = async ({ package, version }) => {
  console.info('Searching for package:', package, version);

  if (!allowed.includes(package)) {
    return null;
  }

  const packages = fs.readdirSync(path.resolve(repoDir, 'packages'))
  for (let i = 0, l = packages.length; i < l; i += 1) {
    const packageDir = path.resolve(repoDir, 'packages', packages[i]);
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(packageDir, 'package.json')));
    if (packageJson.name === package && packageJson.version === version) {
      return { packageDir };
    }
  }
  return null;
};

const publish = async ({ packageDir }) => {
  console.info('Publishing:', packageDir);
  const cmd = 'npm publish';
  console.info(execSync(cmd, {
    cwd: packageDir,
    env: {
      NPM_CONFIG_USERCONFIG: path.resolve(repoDir, '.npmrc'),
    },
  }).toString());
};

Promise.resolve()
  .then(npmrc)
  .then(parseTag)
  .then(search)
  .then(publish)
  .catch(console.error);
