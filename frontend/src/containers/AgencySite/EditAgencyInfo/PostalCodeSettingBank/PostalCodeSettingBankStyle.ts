import styled from 'styled-components';

export const PostalCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;
  margin-top: 1rem;
  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-explain-error {
      position: absolute;
      font-size: 0.8rem;
      white-space: nowrap;
    }
  }
`;
export const StrikethroughCode = styled.div`
  padding: 0 1rem;
`;
export const PostalCodeTitle = styled.div`
  margin-left: 3rem;
  margin-top: 1rem;
  width: 59.25rem;
  font-weight: 400;
  font-size: 1.375rem;
`;
