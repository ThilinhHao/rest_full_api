import images from '@assets/images-base';
import { Collapse } from 'antd';
import configs from 'config';
import { getFullHostName } from 'helper';
import React, { useState } from 'react';
import { LineTitle } from '../../TitleAgency/titleAgencyStyle';
import { BoxWrapper, TitleBox } from './wrapperBoxStyle';

const { Panel } = Collapse;

const WrapperBox = ({ title, children, width }: { title: string; children: any; width?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getUseRoleByHostName = () => {
    switch (getFullHostName()) {
      case configs.APP_FRONTEND_COMPANY:
        return images.companySite.downCompany;
      default:
        return images.dealerAgency.downEdit;
    }
  };
  return (
    <BoxWrapper destroyInactivePanel={true} defaultActiveKey="1">
      <Panel
        forceRender={true}
        header={
          <>
            <TitleBox isOpen={!isOpen} onClick={() => setIsOpen(!isOpen)}>
              <span>{title}</span>
              <img src={getUseRoleByHostName()} alt="Down" />
            </TitleBox>
            <LineTitle width={width} />
          </>
        }
        key="1"
      >
        <div>{children}</div>
      </Panel>
    </BoxWrapper>
  );
};

export default WrapperBox;
