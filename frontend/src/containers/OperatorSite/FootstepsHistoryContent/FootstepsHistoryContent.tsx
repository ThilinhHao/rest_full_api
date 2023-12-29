import React from 'react';

import dayjs from 'dayjs';
import images from '@assets/images-base';
import configs from 'config';

import { Collapse } from 'antd';
import { SpaceBase } from './../../../styles/index';
import { getFullHostName } from 'helper';
import { IFootstepsHistory } from '@pages/OperatorSite/FootstepsHistory/useFootstepsHistory';
import { formatStrDateTimezone } from 'helper/date';

import {
  CollapseAccordionWrapper,
  ContentHistory,
  FootstepsHistoryContentWrapper,
  ItemHistoryCollapse,
  TimeHistory,
  TitleBoxCollapseAccordion,
} from './footstepsHistoryContentStyle';
import { IconHistoryFootsteps } from '@components/Icon';

const { Panel } = Collapse;

const FootstepsHistoryContent = ({
  listHistory,
  activeKey,
  setActiveKey,
}: {
  activeKey: string[] | string;
  setActiveKey: (active: string[] | string) => void;
  listHistory: IFootstepsHistory[][];
}) => {
  const getUseRoleByHostName = () => {
    switch (getFullHostName()) {
      case configs.APP_FRONTEND_COMPANY:
        return images.companySite.downCompany;
      default:
        return images.dealerAgency.downEdit;
    }
  };

  const findActiveKey = (date: string) => {
    if (!Array.isArray(activeKey)) {
      return false;
    }
    return activeKey.find((element: string) => element === String(date));
  };

  return (
    <FootstepsHistoryContentWrapper>
      <CollapseAccordionWrapper activeKey={activeKey} onChange={(e) => setActiveKey(e)}>
        {listHistory.map((element: IFootstepsHistory[]) => (
          <Panel
            header={
              <TitleBoxCollapseAccordion isOpen={findActiveKey(element[0].date)}>
                <span>{element[0].date}</span>
                <SpaceBase width={1.625} />
                <img src={getUseRoleByHostName()} alt="Down" />
              </TitleBoxCollapseAccordion>
            }
            key={element[0].date}
          >
            {element.map((dataElement: IFootstepsHistory) => (
              <ItemHistoryCollapse key={`${dataElement.id}${element[0].date}`}>
                <IconHistoryFootsteps width="2.5rem" height="2.5rem" />
                <ContentHistory>{dataElement.description}</ContentHistory>
                <TimeHistory>{dayjs(formatStrDateTimezone(dataElement.created_at)).format('HH : mm')}</TimeHistory>
              </ItemHistoryCollapse>
            ))}
          </Panel>
        ))}
      </CollapseAccordionWrapper>
    </FootstepsHistoryContentWrapper>
  );
};

export default FootstepsHistoryContent;
