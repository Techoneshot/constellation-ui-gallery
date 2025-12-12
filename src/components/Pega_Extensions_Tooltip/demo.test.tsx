import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DemoStories from './demo.stories';

const { Default, BottomPosition, LongContent } = composeStories(DemoStories);

describe('PegaExtensionsTooltip', () => {
  it('renders tooltip component with default args', () => {
    render(<Default />);
    expect(screen.getByText('Hover me')).toBeVisible();
  });

  it('renders tooltip with bottom position', () => {
    render(<BottomPosition />);
    expect(screen.getByText('Bottom tooltip')).toBeVisible();
  });

  it('renders tooltip with long content', () => {
    render(<LongContent />);
    expect(screen.getByText('Long content')).toBeVisible();
  });
});
