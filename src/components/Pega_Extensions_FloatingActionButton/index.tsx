import { useRef } from 'react';
import { withConfiguration, MenuButton } from '@pega/cosmos-react-core';
import type { MenuItemProps } from '@pega/cosmos-react-core';
import '../shared/create-nonce';
import { StyledFABContainer } from './styles';

type MenuItemConfig = {
  id: string;
  label: string;
  localAction: string;
  caseID?: string;
};

type FloatingActionButtonProps = {
  label: string;
  icon?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  menuItems: MenuItemConfig[];
  getPConnect: any;
};

export const PegaExtensionsFloatingActionButton = (props: FloatingActionButtonProps) => {
  const { getPConnect, label, icon = 'plus', position = 'bottom-right', menuItems } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  const handleMenuItemClick = async (itemId: string) => {
    const menuItem = menuItems.find((item) => item.id === itemId);
    if (!menuItem || !menuItem.localAction) {
      return;
    }

    const availableActions =
      getPConnect().getValue((window as any).PCore.getConstants().CASE_INFO.AVAILABLEACTIONS) || [];
    const targetAction = availableActions.find((action: { ID: string }) => action.ID === menuItem.localAction);
    
    const localizedLabel =
      getPConnect().getContainerName() === 'primary'
        ? getPConnect().getLocalizedValue(
            menuItem.label,
            undefined,
            `${getPConnect().getCaseInfo().getClassName().toUpperCase()}!VIEW!PYCASESUMMARY`,
          )
        : menuItem.label;
    
    const actionName = targetAction?.name || localizedLabel;
    const actionsAPI = getPConnect().getActionsApi();
    
    if (getPConnect().getContainerName() === 'workarea') {
      await actionsAPI.saveAssignment(getPConnect().getContextName());
    }
    
    actionsAPI.openLocalAction(menuItem.localAction, {
      caseID: menuItem.caseID || getPConnect().getStateProps().value,
      containerName: 'modal',
      type: 'express',
      name: actionName,
    });
  };

  const formattedMenuItems: MenuItemProps[] = menuItems.map((item) => ({
    id: item.id,
    primary: item.label,
    onClick: handleMenuItemClick,
  }));

  return (
    <StyledFABContainer position={position}>
      <MenuButton
        ref={buttonRef}
        text={label}
        icon={icon}
        iconOnly
        variant="primary"
        showArrow={false}
        menu={{
          items: formattedMenuItems,
          onItemClick: handleMenuItemClick,
        }}
      />
    </StyledFABContainer>
  );
};

export default withConfiguration(PegaExtensionsFloatingActionButton);
