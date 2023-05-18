import type { Meta, StoryObj } from '@storybook/react';

import { TestButton } from '../../Button/TestButton';

const meta = {
  title: 'Atoms/Buttons/Test Button',
  component: TestButton,
  tags: ['autodocs']
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof TestButton>;

export const Button: Story = {};
