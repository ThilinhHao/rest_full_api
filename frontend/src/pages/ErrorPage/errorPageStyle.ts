import { Button } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 25rem;
    height: 25rem;
  }
`;

export const Space = styled.div`
  flex: 1;
`;

export const ButtonHome = styled(Button)`
  font-size: 2em;
  font-weight: 700;
  height: 2em;
  border-radius: 0.2em;
`;

export const ErrorCode = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 3rem;
  line-height: 2.25rem;
  padding: 2rem 0;
`;

export const ErrorText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 3rem;
  line-height: 2.25rem;
  padding: 3rem 0;
  margin-bottom: 3rem;
`;
