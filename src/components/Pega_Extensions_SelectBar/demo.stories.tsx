import type { StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsSelectBar, type SelectBarProps } from './index';

export default {
  title: 'Fields/Select Bar',
  argTypes: {
    fieldMetadata: {
      table: {
        disable: true,
      },
    },
    additionalProps: {
      table: {
        disable: true,
      },
    },
    displayMode: {
      table: {
        disable: true,
      },
    },
    getPConnect: {
      table: {
        disable: true,
      },
    },
  },
  component: PegaExtensionsSelectBar,
};

const setPCore = () => {
  (window as any).PCore = {
    getComponentsRegistry: () => {
      return {
        getLazyComponent: (f: string) => f,
      };
    },
    getEnvironmentInfo: () => {
      return {
        getTimeZone: () => 'local',
      };
    },
  };
};

const setPConnect = () => {
  return {
    getStateProps: () => {
      return {
        value: 'selectedOption',
      };
    },
    getActionsApi: () => {
      return {
        updateFieldValue: (field: string, value: any) => {
          console.log(`updateFieldValue: ${field} = ${value}`);
        },
        triggerFieldChange: (field: string, value: any) => {
          console.log(`triggerFieldChange: ${field} = ${value}`);
        },
      };
    },
  };
};

type Story = StoryObj<typeof PegaExtensionsSelectBar>;

const SelectBarDemo = (inputs: SelectBarProps) => {
  return {
    render: (args: SelectBarProps) => {
      setPCore();
      const props = {
        ...args,
        getPConnect: setPConnect,
      };
      return <PegaExtensionsSelectBar {...props} />;
    },
    args: inputs,
  };
};

export const Default: Story = SelectBarDemo({
  label: 'Select an option',
  value: 'option2',
  options: [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
    { key: 'option3', value: 'Option 3' },
  ],
  testId: 'demo-selectbar',
  helperText: 'Choose one option from the bar',
  disabled: false,
  readOnly: false,
  required: false,
});

export const WithManyOptions: Story = SelectBarDemo({
  label: 'Priority Level',
  value: 'medium',
  options: [
    { key: 'low', value: 'Low' },
    { key: 'medium', value: 'Medium' },
    { key: 'high', value: 'High' },
    { key: 'urgent', value: 'Urgent' },
    { key: 'critical', value: 'Critical' },
  ],
  testId: 'priority-selectbar',
  disabled: false,
  readOnly: false,
  required: true,
});

export const ReadOnly: Story = SelectBarDemo({
  label: 'Status',
  value: 'active',
  options: [
    { key: 'active', value: 'Active' },
    { key: 'inactive', value: 'Inactive' },
    { key: 'pending', value: 'Pending' },
  ],
  testId: 'readonly-selectbar',
  readOnly: true,
  required: false,
});

export const Disabled: Story = SelectBarDemo({
  label: 'Disabled Select Bar',
  value: 'option1',
  options: [
    { key: 'option1', value: 'Option 1' },
    { key: 'option2', value: 'Option 2' },
  ],
  testId: 'disabled-selectbar',
  disabled: true,
  required: false,
});
