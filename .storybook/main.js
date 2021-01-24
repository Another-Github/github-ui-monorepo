module.exports = {
  stories: [
    '../packages/**/src/**/*.stories.js',
  ],
  addons: [
    {
      name: '@storybook/addon-actions',
    },
    {
      name: '@storybook/addon-knobs',
    },
  ],
};
