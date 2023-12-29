import { ButtonStyle } from '@components/Button/styled';
import { Input } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TitleHeaderSetting = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  margin-left: 0.625rem;
`;

export const RowRequestB2B = styled.div`
  display: flex;
  color: ${colors.pairB2BColorSilver};
  margin-left: 10.125rem;
  margin-right: 13.75rem;
  justify-content: space-between;
`;

export const ColInputRequestB2B = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.813rem;
  display: flex;
  justify-items: center;
  align-items: center;

  .tile-request {
    margin-right: 1.875rem;
  }
  .input-pair {
    width: 25rem;
    margin-right: 1.875rem;
  }
`;
export const ColPagination = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
  position: relative;
  .paginationRecord {
    right: 0;
  }
`;

export const InputB2B = styled(Input)`
  background: ${colors.pairB2BBackgroundWhite};
  box-shadow: inset 1px 1px 4px ${colors.pairB2BBoxShadow};
  border-radius: 5px;
  width: 100%;
  height: 3.125rem;
  font-size: 1.5rem;
`;

export const ButtonB2B = styled(ButtonStyle)<any>`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  filter: drop-shadow(2px 2px 1px ${colors.pairB2BBoxShadow});
  background: ${colors.pairB2BBtnB2BSubmit};
  border-radius: 50px;
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
  padding: 0.75rem 0.438rem;
  line-height: 1.625rem;
  height: auto;
`;

export const ModalContainer = styled.div`
  p {
    font-weight: 400;
    margin-bottom: 4rem;
    &:first-child {
      margin-top: 6.25rem;
    }
    &:last-child {
      margin-bottom: 10.25rem;
    }
  }
`;
