import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import ColorPicker from './ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

export const FullFeatures: ComponentStory<typeof ColorPicker> = (props) => {
  return <ColorPicker {...props} />;
};
