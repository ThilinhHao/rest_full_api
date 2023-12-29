import React from 'react';
import { SpinLoading } from './LoadingStyle';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading = ({ type = false }: { type?: boolean }) => {
  if (type) {
    return <SpinLoading className="component-loading" indicator={antIcon} />;
  }
  return <SpinLoading className="component-loading" />;
};

export default Loading;
