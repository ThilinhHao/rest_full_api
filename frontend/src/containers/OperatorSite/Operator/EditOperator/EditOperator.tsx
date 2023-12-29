import React from 'react';
import images from '@assets/images-base';
import InputCard from '@components/Input/InputCard';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useEditOperator from './useEditOperator';
import ConfirmEditOperator from './ConfirmEditOperator/ConfirmEditOperator';

import { colors } from 'constants/colorsBase';
import { Tooltip } from 'antd';
import { CardItem, RequireOperator } from 'styles';
import { IOperator } from '@pages/OperatorSite/Operators/ListOperator/useListOperator';
import { MAX_LENGTH } from 'constants/constants';
import { CONST_OPERATOR } from '@pages/OperatorSite/Operators/CreateOperator/constants';
import { CONST_COMMON, CONST_EDIT_OPERATOR } from 'constants/language';
import { BtnCorrection, Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';

import {
  BtnVerification,
  ErrorOperator,
  WrapperInput,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import {
  DetailOperatorTitleWrapper,
  DetailOperatorWrapper,
  ElementCard,
  FirstItem,
  OperatorBottomEditWrapper,
} from '../DetailOperator/detailOperatorStyle';
import { ITemMarOperatorEdit, PasswordViewWrapper } from './editOperatorStyle';

interface IDetailOperator {
  operatorSelected: IOperator | null;
  setIsEdit: (isEdit: boolean) => void;
  updateOperator: (operator: IOperator) => void;
}
const EditOperator = ({ operatorSelected, setIsEdit, updateOperator }: IDetailOperator) => {
  const {
    BREADS,
    operator,
    error,
    isLoading,
    beforeBack,
    onEdit,
    onChangeFirstName,
    onChangeLastName,
    isConfirm,
    toConfirm,
    onChangePhoneNumber,
  } = useEditOperator(operatorSelected, updateOperator, setIsEdit);

  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1rem 5rem 0.875rem 5rem">
          {!isConfirm && (
            <div>
              <DetailOperatorTitleWrapper>
                <img src={images.sideBar.management} alt="" />
                <Tooltip placement="bottomLeft" title={`${operatorSelected?.full_name}`}>
                  <div className="full_name">{operatorSelected?.full_name}</div>
                </Tooltip>
                <ITemMarOperatorEdit>{CONST_COMMON.REQUIRE_TITLE}</ITemMarOperatorEdit>
              </DetailOperatorTitleWrapper>

              <CardItem lineBottom={true}>
                <FirstItem width="17rem" paddingLeft="1.5rem">
                  {CONST_EDIT_OPERATOR.OPERATOR_ID}
                </FirstItem>
                <WrapperInput>
                  <InputCard
                    width={18.75}
                    height={2.5}
                    margin={[0, 5.125]}
                    disabled={true}
                    value={operatorSelected?.code}
                    backGroundColor={colors.aquaSqueeze}
                    placeholder={CONST_EDIT_OPERATOR.OPERATOR_ID}
                    maxLength={MAX_LENGTH.DEFAULT}
                  />
                </WrapperInput>
                <ElementCard width="13rem">{CONST_EDIT_OPERATOR.PASSWORD}</ElementCard>
                <WrapperInput>
                  <PasswordViewWrapper>
                    <span>******</span>
                  </PasswordViewWrapper>
                </WrapperInput>
              </CardItem>

              <CardItem lineBottom={true}>
                <FirstItem width="17rem" paddingLeft="1.5rem">
                  {CONST_EDIT_OPERATOR.NAME}
                  <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
                </FirstItem>
                <WrapperInput>
                  <InputCard
                    width={18.75}
                    height={2.5}
                    value={operator.fullName}
                    backGroundColor={colors.aquaSqueeze}
                    placeholder={CONST_OPERATOR.HOLDER_NAME}
                    maxLength={MAX_LENGTH.DEFAULT}
                    onChange={onChangeFirstName}
                  />
                  <ErrorOperator>{error.fullName}</ErrorOperator>
                </WrapperInput>
              </CardItem>

              <CardItem lineBottom={true}>
                <FirstItem width="17rem" paddingLeft="1.5rem">
                  {CONST_EDIT_OPERATOR.LAST_NAME}
                  <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
                </FirstItem>
                <WrapperInput>
                  <InputCard
                    width={18.75}
                    height={2.5}
                    margin={[0, 5]}
                    backGroundColor={colors.aquaSqueeze}
                    placeholder={CONST_OPERATOR.HOLDER_KANA}
                    value={operator.kanaName}
                    maxLength={MAX_LENGTH.DEFAULT}
                    onChange={onChangeLastName}
                  />
                  <ErrorOperator>{error.kanaName}</ErrorOperator>
                </WrapperInput>
              </CardItem>

              <CardItem lineBottom={true}>
                <FirstItem width="17rem" paddingLeft="1.5rem">
                  {CONST_EDIT_OPERATOR.EMAIL_ADDRESS}
                </FirstItem>
                <WrapperInput>
                  <InputCard
                    width={26.313}
                    height={2.5}
                    margin={[0, 4.125]}
                    backGroundColor={colors.aquaSqueeze}
                    placeholder={CONST_EDIT_OPERATOR.EMAIL_ADDRESS}
                    value={operatorSelected?.email}
                    maxLength={MAX_LENGTH.DEFAULT}
                    disabled={true}
                  />
                </WrapperInput>
              </CardItem>

              <CardItem lineBottom={true}>
                <FirstItem>{CONST_OPERATOR.PHONE}</FirstItem>
                <WrapperInput margin="0 2rem">
                  <InputCard
                    width={26.313}
                    height={2.5}
                    maxLength={13}
                    value={operator.phone}
                    isShadow={true}
                    type="tel"
                    onChange={onChangePhoneNumber}
                    placeholder={CONST_COMMON.PHONE_NUMBER}
                  />
                  <ErrorOperator>{error.phone}</ErrorOperator>
                </WrapperInput>
              </CardItem>

              <OperatorBottomEditWrapper>
                <BtnVerification onClick={toConfirm} isloading={isLoading ? 1 : 0}>
                  {CONST_COMMON.BTN_SAVE}
                </BtnVerification>
                <BtnCorrection onClick={beforeBack} isloading={isLoading ? 1 : 0}>
                  {CONST_EDIT_OPERATOR.CANCEL}
                </BtnCorrection>
              </OperatorBottomEditWrapper>
            </div>
          )}
          {isConfirm && operatorSelected && (
            <ConfirmEditOperator
              operator={{
                ...operatorSelected,
                full_name: operator.fullName,
                name_kana: operator.kanaName,
                phone: operator.phone,
              }}
              onEdit={onEdit}
              isLoading={isLoading}
            />
          )}
        </GrantCard>
      </Container>
    </DetailOperatorWrapper>
  );
};

export default EditOperator;
