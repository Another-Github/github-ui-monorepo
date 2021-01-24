import Explorer from './Explorer';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'App/Explorer',
  decorators: [withKnobs],
};

export const withContent = () => {
  const content = text('content');
  return <Explorer content={content} />
};
