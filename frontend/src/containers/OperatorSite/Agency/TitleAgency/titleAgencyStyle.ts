import images from '@assets/images-base';
import configs from 'config';
import { colors } from 'constants/colorsBase';
import { getFullHostName } from 'helper';
import styled from 'styled-components';

const checkImgBg = () => {
  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return images.common.tooltipAdvanceNameCompany;
  }
  return images.common.tooltipAdvanceName;
};

const checkImgBgSeven = () => {
  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return images.companySite.tooltipDayAmountLimit;
  }
  return images.companySite.tooltipDayAmountLimitOperator;
};

export const TitleAgencyWrapper = styled.div`
  span {
    margin-left: 3.125rem;
    font-size: 1.5rem;
    margin-right: 1.25rem;
  }
  .question-mark {
    width: 1.875rem;
    height: auto;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);
    border-radius: 2rem;
  }
`;

interface ILineTitle {
  width?: string;
}
export const LineTitle = styled.div<ILineTitle>`
  width: ${(props) => props?.width || '59.25rem'};
  height: 0.0625rem;
  background-color: ${colors.mainText};
  opacity: 0.5;
`;
export const TooltipAccountNameWrapper = styled.div<any>`
  position: relative;
  width: fit-content;
  height: 1.875rem;
  margin-left: ${(props) => props.marginLeft || '-1.2rem'};
  .tooltip {
    display: none !important;
    z-index: 9;
    :hover {
      display: flex !important;
    }
  }
  .tooltip-text {
    font-family: 'Noto Sans JP', sans-serif !important;
    background-image: url(${checkImgBg()});
    background-size: cover;
    width: 35rem;
    height: 20rem;
    padding: 1rem 1rem 2rem 2rem;
    .content {
      margin-left: 1rem;
    }
    div {
      margin-top: 0.3rem;
      font-weight: 500 !important;
    }
  }
  .iconInfo {
    z-index: 10;
    :hover {
      + .tooltip {
        display: flex !important;
      }
    }
  }
`;
export const TooltipSevenWrapper = styled.div<any>`
  position: relative;
  width: fit-content;
  height: 1.875rem;
  margin-left: ${(props) => props.marginLeft || '-1.2rem'};
  .tooltip {
    display: none;
    z-index: 10;
    :hover {
      display: flex !important;
    }
  }
  .tooltip-text {
    font-family: 'Noto Sans JP', sans-serif !important;
    background-image: url(${checkImgBgSeven()});
    background-size: cover;
    width: 50rem;
    height: 6rem;
    z-index: 2;
    padding: 1rem 1rem 2rem 2rem;
    .content {
      margin-left: 1rem;
    }
    div {
      margin-top: 0.3rem;
      padding: 0 1rem;
      font-weight: 500 !important;
    }
  }
  .iconInfo {
    z-index: 10;
    :hover {
      + .tooltip {
        display: flex !important;
      }
    }
  }
`;
