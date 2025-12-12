import styled from 'styled-components';

const StyledSelectBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .select-bar-label {
    font-weight: 500;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .select-bar-helper {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #6c757d);
    margin-top: 0.25rem;

    &.error {
      color: var(--color-error, #dc3545);
    }
  }
`;

export default StyledSelectBar;
