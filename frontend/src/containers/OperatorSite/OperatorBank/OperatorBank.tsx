import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import HomePageWrapper from '@pages/HomePage/homePageStyle';
import { Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';

import DetailBank from './DetailBank/DetailBank';
import SettingBank from './SettingBank/SettingBank';
import useOperatorBank from './useOperatorBank';
import { DetailBankWrapper } from './operatorBankStyle';

const OperatorBank = () => {
  const { BREADS, detailBank, isEdit, isLoading, setIsEdit, setDetailBank } = useOperatorBank();

  return (
    <HomePageWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <DetailBankWrapper>
          {isLoading && <Loading />}

          {!isEdit && !isLoading && <DetailBank detailBank={detailBank} setIsEdit={setIsEdit} />}
          {isEdit && !isLoading && (
            <SettingBank setIsEdit={setIsEdit} defaultSetting={detailBank} setDetailBank={setDetailBank} />
          )}
        </DetailBankWrapper>
      </Container>
    </HomePageWrapper>
  );
};

export default OperatorBank;
