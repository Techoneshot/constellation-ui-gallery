import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: help;
`;

export const TooltipTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.125rem;
`;

export const TooltipContent = styled.div<{
  $position: 'top' | 'bottom' | 'left' | 'right';
  $maxWidth: number;
  $visible: boolean;
}>`
  position: absolute;
  z-index: 1000;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.base.palette['foreground-color']};
  color: ${({ theme }) => theme.base.palette['primary-background']};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: normal;
  word-wrap: break-word;
  max-width: ${({ $maxWidth }) => $maxWidth}rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  pointer-events: none;

  ${({ $position }) => {
    switch ($position) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-0.5rem);
          margin-bottom: 0.25rem;
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(0.5rem);
          margin-top: 0.25rem;
        `;
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-0.5rem);
          margin-right: 0.25rem;
        `;
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(0.5rem);
          margin-left: 0.25rem;
        `;
      default:
        return '';
    }
  }}

  &::after {
    content: '';
    position: absolute;
    border: 0.25rem solid transparent;

    ${({ $position, theme }) => {
      const arrowColor = theme.base.palette['foreground-color'];
      switch ($position) {
        case 'top':
          return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-top-color: ${arrowColor};
          `;
        case 'bottom':
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-color: ${arrowColor};
          `;
        case 'left':
          return `
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-left-color: ${arrowColor};
          `;
        case 'right':
          return `
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-right-color: ${arrowColor};
          `;
        default:
          return '';
      }
    }}
  }
`;
