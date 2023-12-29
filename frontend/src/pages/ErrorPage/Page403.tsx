import React from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import images from '@assets/images-base';
import { CONST_COMMON } from 'constants/language';
import { ButtonHome, ErrorCode, ErrorText, Wrapper } from './errorPageStyle';

const Page403 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Space />
      <ErrorCode>403</ErrorCode>
      <img src={images.home.iconErrorPage} alt="" />
      <ErrorText>{CONST_COMMON.NOT_ACCESS}</ErrorText>
      <ButtonHome type="primary" onClick={() => navigate('/')}>
        ページが見つかりません。
      </ButtonHome>
      <Space />
    </Wrapper>
  );
};

export default Page403;
