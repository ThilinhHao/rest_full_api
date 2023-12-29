import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const WrapperReject = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-right: 18%;
  margin-top: 1.5rem;
  border: 1px solid ${colors.border};
  overflow: hidden;
  background: white;

  height: 6.375rem;
  box-shadow: inset 0px 4px 4px ${colors.shadowBtnFile};
  border-radius: 5px;
`;
export const FileItemWrapper = styled.div`
  width: 33%;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
  align-items: center;
  .icon-null {
    height: 2.125rem;
    width: 2.125rem;
  }
  .item-file {
    display: flex;
    align-items: center;
  }
  .view-note-reject {
    background: transparent;
    overflow-y: auto;
    height: 6.375rem;
    padding: 0.75rem 1.75rem;
    word-break: break-all;
    ::-webkit-scrollbar {
      background-color: transparent;
    }
  }
`;
export const FileName = styled.div`
  font-size: 1.25rem;
  margin: 0 1.15rem 0 1.281rem;
  width: 13rem;
  word-wrap: break-word;
  box-shadow: 0px 4px 4px ${colors.shadowBtnFile};
  border-radius: 38px;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 0.469rem 0.406rem;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.borderBtnFile};

  .txt-name-document {
    white-space: nowrap;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    width: 10.875rem;
  }
`;

export const DeleteDetailBtn = styled(ButtonCustom)`
  background-color: ${colors.reddish};
  color: ${colors.white};
  margin-top: 1rem;
  margin-left: 4.375rem;
  height: 3.125rem;
  width: 9.125rem;
  font-size: 1.625rem;
  font-weight: 600;
  border-radius: 0.625rem;
`;
export const TitleDetailCompanyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CompanyNameDetail = styled.div`
  max-width: 64.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 2.188rem;
  margin-left: 1rem;
`;
export const UnderView = styled.span`
  margin-left: 2.438rem;
  font-size: 2.188rem;

  color: #ff2727;
`;

export const BtnFileCompanyVerificationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;
