import React from 'react';
import { colors } from 'constants/colorsBase';
import { SpaceBase } from 'styles';
import { CancelApproveItem } from '../approveTableStyle';
import { ERequestAdvance, EStatusApproveRequest } from 'constants/constants';
import { IRequestAdvance, IUpdateRequestData } from '@pages/CompanySite/ApproveSalaryAdvance/useApproveSalaryAdvance';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { DoneProcessing, ItemApproval, LoadingWrapper, UnitConfirmed } from './statusApproveItemStyle';

import CountdownTimer from '@components/CompanySite/AttendanceRecord/CountdownTimer/CountdownTimer';
import useStatusApproveItem from './useStatusApproveItem';
import Loading from '@components/Loading';

const StatusApproveItem = ({
  element,
  updateListRequest,
  isLoadingPage,
}: {
  isLoadingPage: boolean;
  element: IRequestAdvance;
  updateListRequest: (item: IUpdateRequestData) => void;
}) => {
  const {
    isOverTime,
    isLoading,
    statusToText,
    statusToColor,
    styleItem,
    getSecondTimeDown,
    onChangeStatus,
    onCancelApprove,
    onTimeUp,
    isLoadingTimeUp,
    isOwner,
  } = useStatusApproveItem(element, updateListRequest);

  return (
    <React.Fragment>
      <SpaceBase width={3.5} />
      {!isOverTime && element.is_force_cancel !== ERequestAdvance.CANCELED && (
        <>
          <ItemApproval
            isOwner={isOwner}
            isLoading={isLoading}
            activeData={styleItem(colors.dayShift, EStatusApproveRequest.COMPLETE)}
            onClick={() => onChangeStatus(EStatusApproveRequest.COMPLETE)}
          >
            {CONST_ATTENDANCE_COMPANY.APPROVE}
          </ItemApproval>
          <SpaceBase width={3.125} />
          <ItemApproval
            isOwner={isOwner}
            isLoading={isLoading}
            activeData={styleItem(colors.mediumTurquoise, EStatusApproveRequest.CANCEL)}
            onClick={() => onChangeStatus(EStatusApproveRequest.CANCEL)}
          >
            {CONST_ATTENDANCE_COMPANY.REJECTION}
          </ItemApproval>
          <SpaceBase width={3.125} />
          {!!element.status &&
            element.status !== EStatusApproveRequest.WAITING_TRANSACTION &&
            element.status !== EStatusApproveRequest.WAITING_OTPED &&
            !isLoadingPage &&
            !isLoadingTimeUp && (
              <React.Fragment>
                <UnitConfirmed>{CONST_ATTENDANCE_COMPANY.UNTIL_CONFIRM}</UnitConfirmed>
                <SpaceBase width={1.563} />
                {getSecondTimeDown() >= 0 && (
                  <CountdownTimer
                    time={getSecondTimeDown()}
                    onDownEnd={onTimeUp}
                    timeout={element.date_timeout}
                    status={element.status}
                  />
                )}
                <SpaceBase width={3.75} />
                <CancelApproveItem isLoading={isLoading} onClick={onCancelApprove}>
                  {CONST_COMMON.CANCEL_HINA}
                </CancelApproveItem>
              </React.Fragment>
            )}
          {isLoadingTimeUp && (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
        </>
      )}

      {(isOverTime || element.is_force_cancel === ERequestAdvance.CANCELED) && (
        <DoneProcessing color={statusToColor()}>{statusToText()}</DoneProcessing>
      )}
    </React.Fragment>
  );
};

export default StatusApproveItem;
