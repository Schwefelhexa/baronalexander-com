import React from 'react';
import { Story, Meta } from '@storybook/react';

import PreviewIndicator, { PreviewIndicatorProps } from './PreviewIndicator';

export default {
  title: 'Layout/Preview Indicator',
  component: PreviewIndicator,
  args: {
    setPreview: () => {},
  },
} as Meta<PreviewIndicatorProps>;

const Template: Story<PreviewIndicatorProps> = (args) => (
  <PreviewIndicator {...args} />
);

export const PublishedContent = Template.bind({});
PublishedContent.args = {
  preview: false,
};

export const PreviewContent = Template.bind({});
PreviewContent.args = {
  preview: true,
};
