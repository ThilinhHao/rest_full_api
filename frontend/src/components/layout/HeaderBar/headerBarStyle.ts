import styled from 'styled-components';
import { Header } from 'antd/es/layout/layout';
import { colors } from 'constants/colorsBase';
import { Select } from 'antd';

export const HeaderBarWrapper = styled(Header)`
  padding: 0 0.5rem !important;
  display: flex;
  align-items: center;
  justify-content: space-between;

  #scroll-container {
    border: 1px solid #52b788;
    border-radius: 0.625rem;
    overflow: hidden;
    position: relative;
    margin-left: 4.063rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    width: 75rem;
  }
  #scroll-text {
    width: 75rem;
    position: absolute;
    color: #6e6e6e;
    white-space: nowrap;
    /* animation properties */
    font-size: 1.25rem;
    left: 3.5rem;
    -moz-animation: my-animation 10s linear;
    -webkit-animation: my-animation 10s linear;
    animation: my-animation 10s linear;
  }

  /* for Firefox */
  @-moz-keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(0%);
    }
  }

  /* for Chrome */
  @-webkit-keyframes my-animation {
    from {
      -webkit-transform: translateX(100%);
    }
    to {
      -webkit-transform: translateX(0%);
    }
  }

  @keyframes my-animation {
    from {
      transform: translateX(100%);
      -webkit-transform: translateX(100%);
      -moz-transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(0%);
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
    }
  }
`;
export const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.mainColor};
  border-radius: 1.25rem;
  color: ${colors.mainColor};
`;
export const MessageImg = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.75rem;
  margin-right: 4rem;
`;
export const UserImg = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
`;

export const IconOperator = styled.img`
  width: 3.625rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const MessageImgOperator = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.75rem;
  margin-right: 1.25rem;
`;
export const UserImgOperator = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
`;

export const IconAgency = styled.img`
  width: 3.625rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const MessageImgAgency = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.75rem;
  margin-right: 1.25rem;
`;
export const UserImgAgency = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
`;

export const IconCompany = styled.img`
  width: 3.625rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const MessageImgCompany = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.75rem;
  margin-right: 1.25rem;
`;
export const UserImgCompany = styled.img`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
`;

export const MessageIconOperator = styled.div`
  width: 5.5rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0.5rem;
    top: 0;
    background-color: ${colors.deepChestnut};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: ${colors.white};
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

export const MessageIconCompany = styled.div`
  width: 4rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img.new {
    position: absolute;
    right: 0.75rem;
    top: 0;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
  }
  span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0.5rem;
    top: 0;
    background-color: ${colors.reddishOrange};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    color: ${colors.white};
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

export const ListCompanyB2B = styled(Select)`
  background: ${colors.btnDefaultCompanySite};
  box-shadow: 0 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  border-radius: 0.625rem;
  width: 19.063rem;
  height: 2.563rem;
  margin-right: 3rem;
  .ant-select-selector {
    background-color: unset !important;
    border: none !important;
    height: 2.563rem !important;
  }
  span.ant-select-selection-item {
    font-style: normal;
    font-weight: 700;
    font-size: 1.375rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${colors.white} !important;
  }
`;

export const SuffixIcon = styled.img`
  height: ${(props) => (props?.width ? `${props?.width}rem` : '1rem')};
  width: ${(props) => (props?.height ? `${props?.height}rem` : '1rem')};
`;
export const IconNotice = styled.img`
  height: 1rem;
  width: 1.75rem;
  margin-left: 1rem;
`;
