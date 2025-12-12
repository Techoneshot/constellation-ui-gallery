import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DemoStories from './demo.stories';

const { Default } = composeStories(DemoStories);

test('renders Floating Action Button with default args', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<Default />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).not.toBeNull();
});
