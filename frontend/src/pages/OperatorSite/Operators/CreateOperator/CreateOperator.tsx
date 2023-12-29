import React, { useEffect } from 'react';

import InputCard from '@components/Input/InputCard';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';

import HomePageWrapper from '@pages/HomePage/homePageStyle';
import useCreateOperator from './useCreateOperator';

import { FirstItem } from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import { MAX_LENGTH } from 'constants/constants';
import { TitleGrant } from '@containers/CompanySite/GrantCompany/CompanyStyle';
import { CONST_OPERATOR } from './constants';
import { CardItem, RequireOperator, SpaceBase } from 'styles';
import { CONST_COMMON, CONST_CREATE_COMPANY } from 'constants/language';
import { Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import {
  BtnVerification,
  BtnVerificationWrapper,
  CardCreateOperator,
  ErrorOperator,
  WrapperInput,
} from './createOperatorStyle';
import { ITemMarOperator } from '@containers/OperatorSite/Operator/EditOperator/editOperatorStyle';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_OWNER } from 'constants/User';
import { useNavigate } from 'react-router';

const CreateOperator = () => {
  const navigate = useNavigate();

  const {
    BREADS,
    operator,
    error,
    isLoading,
    onCreate,
    onChangeFullName,
    onChangeLastName,
    onChangeEmail,
    onChangePhoneNumber,
  } = useCreateOperator();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  useEffect(() => {
    if (authInfo?.user && authInfo?.user?.type !== USER_TYPE_OWNER) {
      navigate('/operator');
    }
  }, [authInfo, navigate]);

  return (
    <HomePageWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <CardCreateOperator>
          <TitleGrant>
            {CONST_OPERATOR.OPERATOR_TITLE}
            <ITemMarOperator>{CONST_COMMON.REQUIRE_TITLE}</ITemMarOperator>
          </TitleGrant>
          <SpaceBase height={2.125} />
          <CardItem lineBottom={true}>
            <FirstItem>
              {CONST_OPERATOR.NAME}
              <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
            </FirstItem>
            <WrapperInput margin="0 2rem">
              <InputCard
                width={18.75}
                value={operator.fullName}
                height={2.5}
                isShadow={true}
                margin={[0, 3.125]}
                maxLength={MAX_LENGTH.DEFAULT}
                placeholder={CONST_OPERATOR.HOLDER_NAME}
                onChange={onChangeFullName}
              />
              <ErrorOperator>{error.fullName}</ErrorOperator>
            </WrapperInput>
          </CardItem>
          <CardItem lineBottom={true}>
            <FirstItem>
              {CONST_OPERATOR.KANA_OPERATOR}
              <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
            </FirstItem>
            <WrapperInput margin="0 2rem">
              <InputCard
                width={18.75}
                height={2.5}
                value={operator.kanaName}
                margin={[0, 20.875]}
                isShadow={true}
                maxLength={MAX_LENGTH.DEFAULT}
                placeholder={CONST_OPERATOR.HOLDER_KANA}
                onChange={onChangeLastName}
              />
              <ErrorOperator>{error.kanaName}</ErrorOperator>
            </WrapperInput>
          </CardItem>
          <CardItem lineBottom={true}>
            <FirstItem>
              {CONST_OPERATOR.EMAIL}
              <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
            </FirstItem>
            <WrapperInput margin="0 2rem">
              <InputCard
                width={26.313}
                height={2.5}
                value={operator.email}
                placeholder={CONST_CREATE_COMPANY.MAIL_PLACE}
                isShadow={true}
                margin={[0, 3.125]}
                maxLength={MAX_LENGTH.DEFAULT}
                onChange={onChangeEmail}
              />
              <ErrorOperator>{error.email}</ErrorOperator>
              <ErrorOperator>{error.validateEmail}</ErrorOperator>
            </WrapperInput>
          </CardItem>

          <CardItem>
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

          <SpaceBase height={13.688} />
          <BtnVerificationWrapper>
            <BtnVerification isloading={isLoading} onClick={onCreate}>
              {CONST_OPERATOR.VERIFICATION}
            </BtnVerification>
          </BtnVerificationWrapper>
        </CardCreateOperator>
      </Container>
    </HomePageWrapper>
  );
};

export default CreateOperator;
