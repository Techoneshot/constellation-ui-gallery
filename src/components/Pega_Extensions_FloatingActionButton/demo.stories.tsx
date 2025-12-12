import type { StoryObj } from '@storybook/react-webpack5';
import { PegaExtensionsFloatingActionButton } from './index';

export default {
  title: 'Fields/Floating Action Button',
  argTypes: {
    getPConnect: {
      table: {
        disable: true,
      },
    },
  },
  component: PegaExtensionsFloatingActionButton,
};

const setPCore = () => {
  (window as any).PCore = {
    getComponentsRegistry: () => {
      return {
        getLazyComponent: (f: string) => f,
      };
    },
    getConstants: () => {
      return {
        CASE_INFO: {
          AVAILABLEACTIONS: '',
        },
      };
    },
    getEnvironmentInfo: () => {
      return {
        getTimeZone: () => 'local',
      };
    },
  };
};

type Story = StoryObj<typeof PegaExtensionsFloatingActionButton>;

export const Default: Story = {
  render: (args) => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getStateProps: () => {
            return {
              value: 'C-123',
            };
          },
          getContextName: () => {
            return 'context';
          },
          getContainerName: () => {
            return 'workarea';
          },
          getCaseInfo: () => {
            return {
              getClassName: () => 'Work-Case',
            };
          },
          getValue: () => [
            { ID: 'pyEditDetails', name: 'Edit Details' },
            { ID: 'pyAddNote', name: 'Add Note' },
            { ID: 'pyUpdateStatus', name: 'Update Status' },
          ],
          getLocalizedValue: (label: string) => label,
          getActionsApi: () => {
            return {
              saveAssignment: () => Promise.resolve(),
              openLocalAction: (name: string, options: any) => {
                alert(`Launch local action ${name} for ${options.caseID}`);
              },
            };
          },
        };
      },
    };
    return <PegaExtensionsFloatingActionButton {...props} />;
  },
  args: {
    label: 'Actions',
    icon: 'plus',
    position: 'bottom-right',
    menuItems: [
      {
        id: 'edit',
        label: 'Edit Details',
        localAction: 'pyEditDetails',
      },
      {
        id: 'note',
        label: 'Add Note',
        localAction: 'pyAddNote',
      },
      {
        id: 'status',
        label: 'Update Status',
        localAction: 'pyUpdateStatus',
      },
    ],
  },
};

export const BottomLeft: Story = {
  render: (args) => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getStateProps: () => {
            return {
              value: 'C-456',
            };
          },
          getContextName: () => {
            return 'context';
          },
          getContainerName: () => {
            return 'workarea';
          },
          getCaseInfo: () => {
            return {
              getClassName: () => 'Work-Case',
            };
          },
          getValue: () => [{ ID: 'pyEditDetails', name: 'Edit Details' }],
          getLocalizedValue: (label: string) => label,
          getActionsApi: () => {
            return {
              saveAssignment: () => Promise.resolve(),
              openLocalAction: (name: string, options: any) => {
                alert(`Launch local action ${name} for ${options.caseID}`);
              },
            };
          },
        };
      },
    };
    return <PegaExtensionsFloatingActionButton {...props} />;
  },
  args: {
    label: 'Actions',
    icon: 'plus',
    position: 'bottom-left',
    menuItems: [
      {
        id: 'edit',
        label: 'Edit Details',
        localAction: 'pyEditDetails',
      },
    ],
  },
};

export const WithCustomIcon: Story = {
  render: (args) => {
    setPCore();
    const props = {
      ...args,
      getPConnect: () => {
        return {
          getStateProps: () => {
            return {
              value: 'C-789',
            };
          },
          getContextName: () => {
            return 'context';
          },
          getContainerName: () => {
            return 'workarea';
          },
          getCaseInfo: () => {
            return {
              getClassName: () => 'Work-Case',
            };
          },
          getValue: () => [
            { ID: 'pyEditDetails', name: 'Edit Details' },
            { ID: 'pyAddNote', name: 'Add Note' },
          ],
          getLocalizedValue: (label: string) => label,
          getActionsApi: () => {
            return {
              saveAssignment: () => Promise.resolve(),
              openLocalAction: (name: string, options: any) => {
                alert(`Launch local action ${name} for ${options.caseID}`);
              },
            };
          },
        };
      },
    };
    return <PegaExtensionsFloatingActionButton {...props} />;
  },
  args: {
    label: 'More Actions',
    icon: 'more',
    position: 'bottom-right',
    menuItems: [
      {
        id: 'edit',
        label: 'Edit Details',
        localAction: 'pyEditDetails',
      },
      {
        id: 'note',
        label: 'Add Note',
        localAction: 'pyAddNote',
      },
    ],
  },
};
