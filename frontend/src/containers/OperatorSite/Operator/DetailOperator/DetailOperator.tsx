import React from 'react';

import { Tooltip } from 'antd';
import { RowCenter } from 'styles';
import { formatIdOperator } from 'helper/formatIdOperator';

import { IOperator } from '@pages/OperatorSite/Operators/ListOperator/useListOperator';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { BtnVerification } from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';

import { CONST_DETAIL_OPERATOR } from './constants';
import {
  DetailOperatorWrapper,
  CardItemOperator,
  ElementCardItemOperator,
  OperatorGrantCard,
  OperatorBottomWrapper,
  ElementCardItemOperatorData,
  DetailOperatorTitleWrapper,
} from './detailOperatorStyle';
import { DeleteDetailBtn } from '@containers/OperatorSite/Company/DetailCompany/detailCompanyStyle';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import images from '@assets/images-base';
import { ETypeOperator } from 'constants/constants';
import { CONST_EDIT_OPERATOR } from 'constants/language';

const BREADS: IBread[] = [
  {
    name: CONST_DETAIL_OPERATOR.LIST_OPERATOR,
    path: '',
  },
];

interface IDetailOperator {
  operator: IOperator | null;
  setIsEdit: (isEdit: boolean) => void;
  onDelete: () => void;
}

const DetailOperator = ({ operator, setIsEdit, onDelete }: IDetailOperator) => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} />
      {operator && (
        <Container>
          <OperatorGrantCard>
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
                <BtnVerification onClick={() => setIsEdit(true)}>{CONST_DETAIL_OPERATOR.EDIT}</BtnVerification>
                {authInfo?.user?.id !== operator.id && operator.type !== ETypeOperator.ROOT && (
                  <DeleteDetailBtn onClick={onDelete}>{CONST_LIST_AGENCY.DELETE}</DeleteDetailBtn>
                )}
              </RowCenter>
            </OperatorBottomWrapper>
          </OperatorGrantCard>
        </Container>
      )}
    </DetailOperatorWrapper>
  );
};

export default DetailOperator;
