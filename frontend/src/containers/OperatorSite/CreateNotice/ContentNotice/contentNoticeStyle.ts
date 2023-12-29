import TextArea from '@components/TextArea/TextArea';
import { Space } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ContentNoticeWrapper = styled(Space)`
  margin-top: 0.5rem;
  width: 79.313rem;
  padding-bottom: 0.5rem;
  padding-left: 3rem;
  margin-left: 4rem;
  display: flex;
  align-items: start;
  .ant-form-item-explain-error {
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
`;
export const TextAreaContentNotice = styled(TextArea)`
  resize: none !important;
  padding: 0.8rem 0.625rem 1.25rem 0.625rem;
  border-radius: 1.563rem;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);

  background-clip: padding-box;

  ::-webkit-scrollbar {
    width: 0rem;
  }

  width: 69.3rem;
  height: 28.688rem !important;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  font-size: 1.25rem;
  &:disabled {
    color: ${colors.white} !important;
    background-color: ${colors.grey} !important;
  }
  :where(.css-dev-only-do-not-override-5v7h9a).ant-input-status-error:not(.ant-input-disabled):not(
      .ant-input-borderless
    ).ant-input {
    border: none !important;
    :hover {
      outline: 1px solid ${colors.mainColor} !important;
    }
  }
`;
export const WrapperContentNotice = styled(Space)`
  resize: none !important;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 1.563rem;
  width: 69.3rem;
  height: 28.688rem !important;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  font-size: 1.25rem;
  overflow: hidden;

  :hover {
    outline: 1px solid ${colors.mainColor};
  }
`;
