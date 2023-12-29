import images from '@assets/images-base';
import configs from 'config';
import { getFullHostName } from 'helper';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxBread, BreadCrumbWrapper, HomeIcon, TextBread } from './breadCrumbStyle';

export interface IBread {
  name: string;
  path: string;
}
interface IBreadCrumb {
  breads: IBread[];
  onClickHome?: () => void;
  onClickPath?: () => void;
  margin?: string;
}
const BreadCrumb = ({ breads, onClickHome, onClickPath, margin }: IBreadCrumb) => {
  const navigate = useNavigate();
  // const focusIndex = breads?.length - 1;
  const toPath = (path: string) => {
    if (onClickPath) {
      onClickPath();
      return;
    }
    navigate(path);
  };

  const getHomeIconSite = () => {
    switch (getFullHostName()) {
      case configs.APP_FRONTEND_OPERATOR:
        return images.home.homeIcon;
      case configs.APP_FRONTEND_AGENCY:
        return images.home.homeIcon;
      case configs.APP_FRONTEND_COMPANY:
        return images.companySite.companySiteHome;
      default:
        return images.home.homeIcon;
    }
  };

  return (
    <BreadCrumbWrapper margin={margin}>
      <BoxBread isHome={true}>
        <HomeIcon
          src={getHomeIconSite()}
          alt=""
          onClick={() => {
            if (onClickHome) {
              onClickHome();
            } else {
              navigate('/');
            }
          }}
        />
      </BoxBread>
      {breads.map((element: IBread, index: number) => (
        <BoxBread key={`${index}`}>
          <TextBread onClick={() => element.path && toPath(element.path)}>{element.name}</TextBread>
        </BoxBread>
      ))}
    </BreadCrumbWrapper>
  );
};

export default BreadCrumb;
