import styled, { css } from 'styled-components';

type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

interface StyledFABContainerProps {
  position: Position;
}

const getPositionStyles = (position: Position) => {
  switch (position) {
    case 'bottom-right':
      return css`
        bottom: 24px;
        right: 24px;
      `;
    case 'bottom-left':
      return css`
        bottom: 24px;
        left: 24px;
      `;
    case 'top-right':
      return css`
        top: 24px;
        right: 24px;
      `;
    case 'top-left':
      return css`
        top: 24px;
        left: 24px;
      `;
    default:
      return css`
        bottom: 24px;
        right: 24px;
      `;
  }
};

export const StyledFABContainer = styled.div<StyledFABContainerProps>`
  position: fixed;
  z-index: 1000;
  ${(props) => getPositionStyles(props.position)}

  button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.06);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;
