import React from 'react';
import { Story, Meta } from '@storybook/react';

import Text, { TextProps } from './Text';

export default {
  title: 'Atomic/Text',
  component: Text,
  args: {
    children: 'Lorem ipsum',
  },
} as Meta<TextProps>;

const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
