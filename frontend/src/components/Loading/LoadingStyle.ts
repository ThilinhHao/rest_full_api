import { Spin } from 'antd';
import { getColorLogin } from 'helper/colorSite';
import styled from 'styled-components';

export const SpinLoading = styled(Spin)`
  width: 100%;
  text-align: center;
  padding: 1rem;
  .ant-spin-dot-item {
    background-color: ${getColorLogin()};
  }
`;
