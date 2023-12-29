import { colors } from 'constants/colorsBase';
import InputCustom from '@components/Input';
import styled from 'styled-components';

export const LabelInput = styled.div`
  width: 31.25rem;
  font-size: 1.625rem;
  color: ${colors.none};
  margin-bottom: 0.75rem;
  padding-left: 0.313rem;
`;
export const InputForgot = styled(InputCustom)`
  width: 31.25rem;
  height: 4.25rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
  input {
    background: transparent;
  }
`;
export const ErrorForgot = styled.div`
  margin-top: 0.25rem;
  width: 30rem;
  color: ${colors.tomato};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  transition: 0.2s;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: 0.6rem;
  }
`;
