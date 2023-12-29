import React from 'react';

import images from '@assets/images-base';

import { Tooltip } from 'antd';
import { RowCenter } from 'styles';
import { IOperator } from '@pages/OperatorSite/Operators/ListOperator/useListOperator';
import { BtnVerification } from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import { formatIdOperator } from 'helper/formatIdOperator';
import { CONST_DETAIL_OPERATOR } from '@containers/OperatorSite/Operator/DetailOperator/constants';

import {
  CardItemOperator,
  DetailOperatorTitleWrapper,
  ElementCardItemOperator,
  ElementCardItemOperatorData,
  OperatorBottomWrapper,
} from '../../DetailOperator/detailOperatorStyle';
import { CONST_EDIT_OPERATOR } from 'constants/language';

const ConfirmEditOperator = ({
  operator,
  onEdit,
  isLoading,
}: {
  operator: IOperator;
  onEdit: () => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <div>
        <DetailOperatorTitleWrapper>
          <img src={images.sideBar.management} alt="" />
          <Tooltip title={`${operator.full_name}`}>
            <div className="full_name">{operator.full_name}</div>
          </Tooltip>
        </DetailOperatorTitleWrapper>
        <CardItemOperator>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.OPERATOR_ID}</ElementCardItemOperator>
          <ElementCardItemOperatorData>{formatIdOperator(operator.id)}</ElementCardItemOperatorData>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.OPERATOR_PASSWORD}</ElementCardItemOperator>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.PASSWORD}</ElementCardItemOperator>
        </CardItemOperator>
        <CardItemOperator>
          <ElementCardItemOperator>{CONST_EDIT_OPERATOR.NAME}</ElementCardItemOperator>
          <ElementCardItemOperatorData>{operator.full_name}</ElementCardItemOperatorData>
        </CardItemOperator>
        <CardItemOperator>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.LAST_NAME}</ElementCardItemOperator>
          <ElementCardItemOperatorData>{operator.name_kana}</ElementCardItemOperatorData>
        </CardItemOperator>
        <CardItemOperator>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.EMAIL}</ElementCardItemOperator>
          <ElementCardItemOperatorData>{operator.email}</ElementCardItemOperatorData>
        </CardItemOperator>
        <CardItemOperator>
          <ElementCardItemOperator>{CONST_DETAIL_OPERATOR.PHONE}</ElementCardItemOperator>
          <ElementCardItemOperatorData>{operator.phone}</ElementCardItemOperatorData>
        </CardItemOperator>
      </div>
      <OperatorBottomWrapper>
        <RowCenter>
          <BtnVerification isloading={isLoading ? true : undefined} onClick={onEdit}>
            {CONST_EDIT_OPERATOR.KEEP}
          </BtnVerification>
        </RowCenter>
      </OperatorBottomWrapper>
    </>
  );
};

export default ConfirmEditOperator;
