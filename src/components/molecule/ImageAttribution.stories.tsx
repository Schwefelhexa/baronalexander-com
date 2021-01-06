import React from 'react';
import { Story, Meta } from '@storybook/react';

import ImageAttribution, { ImageAttributionProps } from './ImageAttribution';

export default {
  title: 'Molecule/Image Attribution',
  component: ImageAttribution,
  args: {
    photographer: 'Example Photographer',
    platform: 'Unsplash',
  },
} as Meta<ImageAttributionProps>;

const Template: Story<ImageAttributionProps> = (args) => (
  <ImageAttribution {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageDescription: 'Example Image',
};

export const NoDescription = Template.bind({});
NoDescription.args = {};
