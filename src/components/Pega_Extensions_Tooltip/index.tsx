import { withConfiguration, createUID } from '@pega/cosmos-react-core';
import { useState, useRef, useEffect } from 'react';
import { TooltipWrapper, TooltipTrigger, TooltipContent } from './styles';
import '../shared/create-nonce';

export type TooltipProps = {
  /** Text label displayed as the tooltip trigger */
  label: string;
  /** Content to display in the tooltip */
  content: string;
  /** Position of the tooltip relative to the trigger
   * @default 'top'
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay in milliseconds before showing the tooltip
   * @default 300
   */
  delay?: string | number;
  /** Maximum width of the tooltip in pixels
   * @default 300
   */
  maxWidth?: string | number;
  /** Test ID for testing purposes */
  testId?: string;
};

export const PegaExtensionsTooltip = (props: TooltipProps) => {
  const { label, content, position = 'top', delay = 300, maxWidth = 300, testId } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [tooltipId] = useState(() => createUID());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delayMs = typeof delay === 'string' ? parseInt(delay, 10) : delay;
  const maxWidthPx = typeof maxWidth === 'string' ? parseInt(maxWidth, 10) : maxWidth;
  const maxWidthRem = maxWidthPx / 16; // Convert pixels to rem for consistent sizing

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    handleMouseEnter();
  };

  const handleBlur = () => {
    handleMouseLeave();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipWrapper
      data-testid={testId}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <TooltipTrigger tabIndex={0} aria-describedby={tooltipId}>
        {label}
      </TooltipTrigger>
      <TooltipContent id={tooltipId} role='tooltip' $position={position} $maxWidth={maxWidthRem} $visible={isVisible}>
        {content}
      </TooltipContent>
    </TooltipWrapper>
  );
};

export default withConfiguration(PegaExtensionsTooltip);
