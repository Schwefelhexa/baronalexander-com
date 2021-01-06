import React from 'react';
import '../src/styles/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'lightning',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};

const withThemeProvider = (Story, context) => {
  const dark = context.globals.theme === 'dark';
  return (
    <div className={dark ? 'dark' : ''}>
      <div className="dark:bg-dark">
        <Story {...context} />
      </div>
    </div>
  );
};
export const decorators = [withThemeProvider];
