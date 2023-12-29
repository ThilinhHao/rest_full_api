import React from 'react';
import {
  BtnOpenSearchModal,
  InputSearch,
  IntroducedCompanySearchWrapper,
  NoDataSearch,
  PopupSearchContainer,
  SearchButton,
  SearchButtonWrapper,
  SearchIcon,
  TitlePopup,
  TitleSearch,
} from './introducedCompanySearchStyle';
import images from '@assets/images-base';
import ModalCommon from '@components/Modal/ModalCommon';
import ResultTable from './ResultTable/ResultTable';
import useIntroducedCompanySearach from './useIntroducedCompanySearach';

import { RowCenter, SpaceBase } from 'styles';
import { CONST_TOP_PAGE_AGENCY } from 'constants/language';

const IntroducedCompanySearch = () => {
  const {
    isOpen,
    setIsOpen,
    setCompanyNameValue,
    setAddressValue,
    getCompanyList,
    listCompany,
    canSearch,
    closeModal,
    addressValue,
    companyNameValue,
  } = useIntroducedCompanySearach();
  return (
    <IntroducedCompanySearchWrapper>
      <BtnOpenSearchModal onClick={() => setIsOpen(true)}>
        {CONST_TOP_PAGE_AGENCY.SEARCH_INTRODUCED_COMPANY} <SearchIcon src={images.agencySite.agencySearch} />
      </BtnOpenSearchModal>
      <ModalCommon
        _className="padding_hidden"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isShowBtnOk={false}
        isShowBtnCancel={false}
        onCancel={closeModal}
      >
        <PopupSearchContainer>
          <TitlePopup>{CONST_TOP_PAGE_AGENCY.SEARCH_INTRODUCED_COMPANY}</TitlePopup>
          <SpaceBase height={1.625} />
          <RowCenter>
            <TitleSearch>{CONST_TOP_PAGE_AGENCY.COMPANY_NAME}</TitleSearch>
            <InputSearch width={18.75} value={companyNameValue} onChange={(e) => setCompanyNameValue(e.target.value)} />
          </RowCenter>
          <SpaceBase height={2.625} />
          <RowCenter>
            <TitleSearch>{CONST_TOP_PAGE_AGENCY.ADDRESS} </TitleSearch>
            <InputSearch width={37.5} value={addressValue} onChange={(e) => setAddressValue(e.target.value)} />
          </RowCenter>
          <SearchButtonWrapper>
            <SearchButton onClick={getCompanyList} disabled={!canSearch}>
              {CONST_TOP_PAGE_AGENCY.SEARCH}
            </SearchButton>
          </SearchButtonWrapper>
          {listCompany && listCompany.length === 0 && (
            <NoDataSearch>{CONST_TOP_PAGE_AGENCY.SEARCH_NO_DATA}</NoDataSearch>
          )}
          {listCompany && listCompany.length > 0 && <ResultTable listCompany={listCompany} />}
        </PopupSearchContainer>
      </ModalCommon>
    </IntroducedCompanySearchWrapper>
  );
};

export default IntroducedCompanySearch;
