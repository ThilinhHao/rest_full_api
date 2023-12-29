import React from 'react';

import ApproveHeader from '../ApproveHeader/ApproveHeader';
import StatusApproveItem from './StatusApproveItem/StatusApproveItem';

import { formatMoney } from 'helper/formatMoney';
import { ERequestAdvance } from 'constants/constants';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { IRequestAdvance, IUpdateRequestData } from '@pages/CompanySite/ApproveSalaryAdvance/useApproveSalaryAdvance';
import {
  ApproveTableWrapper,
  ItemApprove,
  NameItemApprove,
  RequestTime,
  Withdrawn,
  YenItem,
} from './approveTableStyle';
import dayjs from 'dayjs';

const ApproveTable = ({
  listRequest,
  updateListRequest,
  isLoading,
}: {
  isLoading: boolean;
  listRequest: IRequestAdvance[];
  updateListRequest: (item: IUpdateRequestData) => void;
}) => {
  return (
    <ApproveTableWrapper>
      <ApproveHeader />
      {listRequest.map((element: IRequestAdvance) => (
        <ItemApprove key={String(element.id)}>
          <div>
            <NameItemApprove>{element.staff_name}</NameItemApprove>
            {element.is_force_cancel === ERequestAdvance.CANCELED && (
              <Withdrawn>{CONST_ATTENDANCE_COMPANY.WITHDRAWN}</Withdrawn>
            )}
          </div>
          <RequestTime>{dayjs(element.request_date).format('HH:mm')}</RequestTime>
          <YenItem>{formatMoney(element.salary)}</YenItem>
          <StatusApproveItem element={element} updateListRequest={updateListRequest} isLoadingPage={isLoading} />
        </ItemApprove>
      ))}
    </ApproveTableWrapper>
  );
};

export default ApproveTable;
