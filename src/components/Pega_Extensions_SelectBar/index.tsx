import { useEffect, useState } from 'react';
import { withConfiguration, Flex, Button } from '@pega/cosmos-react-core';
import StyledSelectBar from './styles';
import '../shared/create-nonce';

export type SelectBarOption = {
  key: string;
  value: string;
};

export type SelectBarProps = {
  getPConnect?: any;
  label?: string;
  value?: string;
  options?: SelectBarOption[];
  helperText?: string;
  validatemessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  testId?: string;
  fieldMetadata?: any;
  additionalProps?: any;
  /** display mode */
  displayMode?: 'DISPLAY_ONLY' | '';
};

// SelectBar component - A horizontal bar with multiple selectable options
export const PegaExtensionsSelectBar = (props: SelectBarProps) => {
  const {
    getPConnect,
    validatemessage = '',
    label = '',
    value = '',
    helperText = '',
    testId = '',
    options = [],
    additionalProps,
    displayMode,
  } = props;

  const pConn = getPConnect();
  const actions = pConn?.getActionsApi();
  const propName = pConn?.getStateProps()?.value;

  let { readOnly, required, disabled } = props;
  const toBooleanProp = (prop: any) => prop === true || (typeof prop === 'string' && prop === 'true');
  readOnly = toBooleanProp(readOnly);
  required = toBooleanProp(required);
  disabled = toBooleanProp(disabled);

  const [selectedValue, setSelectedValue] = useState(value);
  const [status, setStatus] = useState<string>();

  useEffect(() => setSelectedValue(value), [value]);

  useEffect(() => {
    setStatus(validatemessage !== '' ? 'error' : undefined);
  }, [validatemessage]);

  // Display mode - show only the selected value
  if (displayMode === 'DISPLAY_ONLY') {
    const selectedOption = options.find((opt) => opt.key === selectedValue);
    return <div>{selectedOption?.value || selectedValue}</div>;
  }

  const handleSelection = (optionKey: string) => {
    if (readOnly || disabled) return;

    setSelectedValue(optionKey);
    if (actions && propName) {
      actions.updateFieldValue(propName, optionKey);
      actions.triggerFieldChange(propName, optionKey);
    }
  };

  return (
    <StyledSelectBar>
      {label && <div className="select-bar-label">{label}</div>}
      <Flex container={{ direction: 'row', gap: 1 }} {...additionalProps} data-testid={testId}>
        {options.map((option) => {
          const isSelected = selectedValue === option.key;
          return (
            <Button
              key={option.key}
              variant={isSelected ? 'primary' : 'secondary'}
              onClick={() => handleSelection(option.key)}
              disabled={disabled}
              data-testid={`${testId}-option-${option.key}`}
            >
              {option.value}
            </Button>
          );
        })}
      </Flex>
      {(helperText || validatemessage) && (
        <div className={`select-bar-helper ${status === 'error' ? 'error' : ''}`}>
          {validatemessage || helperText}
        </div>
      )}
    </StyledSelectBar>
  );
};

export default withConfiguration(PegaExtensionsSelectBar);
