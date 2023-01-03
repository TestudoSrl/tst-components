import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import Test from './test'


export default {
  title: 'Components/Test',
  component: Test,
} as ComponentMeta<typeof Test>



export const Default: ComponentStory<typeof Test> = (props) => {
  return <Test {...props} />;
}
