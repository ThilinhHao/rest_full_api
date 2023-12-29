import { Input, Space } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const CreateTitleNoticeWrapper = styled(Space)`
  margin-top: 1.875rem;
  width: 79.313rem;
  padding-bottom: 1.25rem;
  border-bottom: 0.5px solid ${colors.lineColor};
  margin-left: 4rem;
  .ant-form-item-explain-error {
    font-size: 0.875rem;
    margin-left: 0.5rem;
    position: absolute;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
`;
export const TitleInputCreateNotice = styled(Input)`
  padding: 0.563rem 1rem;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);
  border-radius: 1.563rem;
  width: 41.125rem;
  height: 2.5rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  font-family: 'Noto Sans JP', sans-serif !important;
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
  /* :hover {
    outline: 1px solid ${colors.mainColor} !important;
  } */
`;
export const TitleCreateNoticeInput = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 3.5rem;
`;
