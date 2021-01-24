import React from 'react';
import { Layout } from '@another-github/components';

type Props = {
  content: string;
};

const Explorer = (props: Props) => {
  const { content } = props;
  console.error('test');

  return (
    <Layout.Page>Explorer: {content}</Layout.Page>
  );
};

export default Explorer;
