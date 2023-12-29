import React from 'react';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import images from '@assets/images-base';
import { ButtonHome, ErrorCode, ErrorText, Wrapper } from './errorPageStyle';

export const UrlInvalid = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Space />
      <ErrorCode>　</ErrorCode>
      <img src={images.home.iconErrorPage} alt="" />
      <ErrorText>URL利用期限が切れました</ErrorText>
      <ButtonHome type="primary" onClick={() => navigate('/')}>
        ページが見つかりません。
      </ButtonHome>
      <Space />
    </Wrapper>
  );
};
