import styled from 'styled-components';

interface IItemApproval {
  isLoading?: boolean;
  isOwner: boolean;
  activeData: {
    background: string;
    color: string;
    shadow: string;
  };
}

const checkCursor = (isOwner: boolean, isLoading?: boolean) => {
  if (!isOwner) return 'default';
  if (isLoading) return 'wait';
  return 'pointer';
};

const checkShadow = (shadow: string, isOwner: boolean) => {
  if (!isOwner) return shadow;
  if (shadow === 'none') return '0px 0px 3px 3px rgba(0, 0, 0, 0.25)';
  return '0px 0px 1px 1px rgba(0, 0, 0, 0.25)';
};

export const ItemApproval = styled.div<IItemApproval>`
  cursor: ${(props) => checkCursor(props.isOwner, props?.isLoading)};
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.activeData?.background};
  color: ${(props) => props?.activeData?.color};
  box-shadow: ${(props) => props?.activeData?.shadow};
  transition: box-shadow 0.3s ease-in-out;
  transition: all ease 0.2s;
  :active {
    transition: all 0.1s ease-out;
    box-shadow: ${(props) => checkShadow(props?.activeData?.shadow, props.isOwner)};
  }
  user-select: none;
`;
export const UnitConfirmed = styled.div`
  color: #515151;
`;
export const LoadingWrapper = styled.div`
  width: 5rem;
  margin-left: 2rem;
`;
interface IDoneProcessing {
  color: string;
}
export const DoneProcessing = styled.div<IDoneProcessing>`
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  min-width: 6.875rem;
  padding: 0 1rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 4rem;
`;
