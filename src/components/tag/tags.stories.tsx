import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import Tag from './tags'

export default {
  title: 'Components/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>



export const Default: ComponentStory<typeof Tag> = (props) => {
  return <Tag {...props} />;
}
