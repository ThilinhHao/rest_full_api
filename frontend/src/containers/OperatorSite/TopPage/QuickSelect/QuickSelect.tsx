import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import useQuickSelect from './useQuickSelect';

import {
  CountUnprocessed,
  IconSelectTopPageWrapper,
  ItemSelectTopPage,
  QuickSelectLoadingWrapper,
  QuickSelectWrapper,
  TextItemSelectTopPage,
} from './quickSelectStyle';
import { CONST_TOP_PAGE_OPERATOR } from 'constants/language';

const QuickSelect = () => {
  const {
    totalUnprocessed,
    totalInvoiceAgencyUnprocessed,
    isLoading,
    toChart,
    toInvoiceCompany,
    toInvoiceAgency,
    toListCompany,
    authInfo,
  } = useQuickSelect();
  return (
    <QuickSelectWrapper>
      {isLoading && (
        <QuickSelectLoadingWrapper>
          <Loading />
        </QuickSelectLoadingWrapper>
      )}

      <ItemSelectTopPage>
        <IconSelectTopPageWrapper onClick={toChart} imgWidth="5.188rem" imgHeight="4.625rem">
          <img src={images.operator.messageTopPage} alt="message" />
          {authInfo?.messagesNotRead > 0 && <CountUnprocessed>{authInfo?.messagesNotRead}</CountUnprocessed>}
        </IconSelectTopPageWrapper>
        <TextItemSelectTopPage>{CONST_TOP_PAGE_OPERATOR.INQUIRY}</TextItemSelectTopPage>
      </ItemSelectTopPage>

      <ItemSelectTopPage>
        <IconSelectTopPageWrapper onClick={toInvoiceCompany} imgWidth="4.813rem" imgHeight="4.813rem">
          <img src={images.operator.documentTopPage} alt="message" />
        </IconSelectTopPageWrapper>
        <TextItemSelectTopPage>{CONST_TOP_PAGE_OPERATOR.CORPORATE_INVOICE}</TextItemSelectTopPage>
      </ItemSelectTopPage>

      <ItemSelectTopPage>
        <IconSelectTopPageWrapper onClick={toInvoiceAgency} imgWidth="5rem" imgHeight="5.25rem">
          <img src={images.operator.searchFileTopPage} alt="message" />
          {totalInvoiceAgencyUnprocessed > 0 && <CountUnprocessed>{totalInvoiceAgencyUnprocessed}</CountUnprocessed>}
        </IconSelectTopPageWrapper>
        <TextItemSelectTopPage>{CONST_TOP_PAGE_OPERATOR.AGENCY_INVOICE}</TextItemSelectTopPage>
      </ItemSelectTopPage>

      <ItemSelectTopPage>
        <IconSelectTopPageWrapper onClick={toListCompany} imgWidth="5rem" imgHeight="5rem">
          <img src={images.operator.companyTopPage} alt="message" />
          {totalUnprocessed > 0 && <CountUnprocessed>{totalUnprocessed}</CountUnprocessed>}
        </IconSelectTopPageWrapper>
        <TextItemSelectTopPage>{CONST_TOP_PAGE_OPERATOR.LIST_COMPANY}</TextItemSelectTopPage>
      </ItemSelectTopPage>
    </QuickSelectWrapper>
  );
};

export default QuickSelect;
