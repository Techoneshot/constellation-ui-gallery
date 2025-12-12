import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsTooltip } from './index';

const meta: Meta<typeof PegaExtensionsTooltip> = {
  title: 'Fields/Tooltip',
  component: PegaExtensionsTooltip,
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: 'number',
    },
    maxWidth: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsTooltip>;

export const Default: Story = {
  args: {
    label: 'Hover me',
    content: 'This is a helpful tooltip that provides additional information to the user.',
    position: 'top',
    delay: 300,
    maxWidth: 300,
  },
};

export const BottomPosition: Story = {
  args: {
    label: 'Bottom tooltip',
    content: 'This tooltip appears below the trigger element.',
    position: 'bottom',
    delay: 300,
    maxWidth: 300,
  },
};

export const LeftPosition: Story = {
  args: {
    label: 'Left tooltip',
    content: 'This tooltip appears to the left of the trigger element.',
    position: 'left',
    delay: 300,
    maxWidth: 300,
  },
};

export const RightPosition: Story = {
  args: {
    label: 'Right tooltip',
    content: 'This tooltip appears to the right of the trigger element.',
    position: 'right',
    delay: 300,
    maxWidth: 300,
  },
};

export const LongContent: Story = {
  args: {
    label: 'Long content',
    content:
      'This is a much longer tooltip content that demonstrates how the tooltip handles text wrapping and maximum width constraints. The tooltip will wrap text and respect the maxWidth property.',
    position: 'top',
    delay: 300,
    maxWidth: 250,
  },
};

export const QuickShow: Story = {
  args: {
    label: 'Quick tooltip',
    content: 'This tooltip appears quickly with minimal delay.',
    position: 'top',
    delay: 0,
    maxWidth: 300,
  },
};

export const CustomWidth: Story = {
  args: {
    label: 'Custom width',
    content: 'This tooltip has a custom maximum width of 400 pixels, allowing for more content to be displayed.',
    position: 'top',
    delay: 300,
    maxWidth: 400,
  },
};
