import { render, screen, fireEvent } from '@testing-library/react';
import { PegaExtensionsSelectBar } from './index';

const mockPConnect = {
  getActionsApi: () => ({
    updateFieldValue: jest.fn(),
    triggerFieldChange: jest.fn(),
  }),
  getStateProps: () => ({
    value: 'selectedOption',
  }),
};

const defaultProps = {
  label: 'Select an option',
  value: 'option2',
  options: [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
    { key: 'option3', value: 'Option 3' },
  ],
  testId: 'test-selectbar',
  getPConnect: () => mockPConnect,
};

describe('PegaExtensionsSelectBar', () => {
  test('renders label and options', () => {
    render(<PegaExtensionsSelectBar {...defaultProps} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('renders with selected value', () => {
    render(<PegaExtensionsSelectBar {...defaultProps} />);
    const selectedButton = screen.getByTestId('test-selectbar-option-option2');
    expect(selectedButton).toBeInTheDocument();
  });

  test('handles option selection', () => {
    const updateFieldValue = jest.fn();
    const triggerFieldChange = jest.fn();
    const customPConnect = {
      ...mockPConnect,
      getActionsApi: () => ({
        updateFieldValue,
        triggerFieldChange,
      }),
    };

    render(<PegaExtensionsSelectBar {...defaultProps} getPConnect={() => customPConnect} />);

    const option1Button = screen.getByTestId('test-selectbar-option-option1');
    fireEvent.click(option1Button);

    expect(updateFieldValue).toHaveBeenCalledWith('selectedOption', 'option1');
    expect(triggerFieldChange).toHaveBeenCalledWith('selectedOption', 'option1');
  });

  test('renders helper text', () => {
    render(<PegaExtensionsSelectBar {...defaultProps} helperText="Choose wisely" />);
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  test('renders validation message', () => {
    render(<PegaExtensionsSelectBar {...defaultProps} validatemessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('does not trigger actions when disabled', () => {
    const updateFieldValue = jest.fn();
    const triggerFieldChange = jest.fn();
    const customPConnect = {
      ...mockPConnect,
      getActionsApi: () => ({
        updateFieldValue,
        triggerFieldChange,
      }),
    };

    render(<PegaExtensionsSelectBar {...defaultProps} getPConnect={() => customPConnect} disabled />);

    const option1Button = screen.getByTestId('test-selectbar-option-option1');
    fireEvent.click(option1Button);

    expect(updateFieldValue).not.toHaveBeenCalled();
    expect(triggerFieldChange).not.toHaveBeenCalled();
  });

  test('does not trigger actions when readOnly', () => {
    const updateFieldValue = jest.fn();
    const triggerFieldChange = jest.fn();
    const customPConnect = {
      ...mockPConnect,
      getActionsApi: () => ({
        updateFieldValue,
        triggerFieldChange,
      }),
    };

    render(<PegaExtensionsSelectBar {...defaultProps} getPConnect={() => customPConnect} readOnly />);

    const option1Button = screen.getByTestId('test-selectbar-option-option1');
    fireEvent.click(option1Button);

    expect(updateFieldValue).not.toHaveBeenCalled();
    expect(triggerFieldChange).not.toHaveBeenCalled();
  });

  test('renders in display mode', () => {
    render(<PegaExtensionsSelectBar {...defaultProps} displayMode="DISPLAY_ONLY" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });
});
