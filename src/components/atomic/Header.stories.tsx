import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header, { HeaderProps } from './Header';

export default {
  title: 'Atomic/Header',
  component: Header,
} as Meta<HeaderProps>;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World',
};
