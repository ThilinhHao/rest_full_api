import React from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import images from '@assets/images-base';
import { ButtonHome, ErrorCode, ErrorText, Wrapper } from './errorPageStyle';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Space />
      <ErrorCode>404</ErrorCode>
      <img src={images.home.iconErrorPage} alt="" />
      <ErrorText>　</ErrorText>
      <ButtonHome type="primary" onClick={() => navigate('/')}>
        ページが見つかりません。
      </ButtonHome>
      <Space />
    </Wrapper>
  );
};

export default Page404;
