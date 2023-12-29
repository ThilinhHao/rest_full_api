import React from 'react';
import { HeaderTableSearch, ItemTableSearch, ResultTableWrapper, ScrollSearchView } from './resultTableStyle';
import { CONST_TOP_PAGE_AGENCY } from 'constants/language';
import { IListCompany } from '../useIntroducedCompanySearach';

const ResultTable = ({ listCompany }: { listCompany: IListCompany[] }) => {
  return (
    <ResultTableWrapper>
      <HeaderTableSearch>
        <div>{CONST_TOP_PAGE_AGENCY.COMPANY_NAME}</div>
        <div>{CONST_TOP_PAGE_AGENCY.ADDRESS}</div>
      </HeaderTableSearch>
      <ScrollSearchView>
        {listCompany.map((element: IListCompany) => (
          <ItemTableSearch key={element.id}>
            <div className="box">{element.name}</div>
            <div className="box">
              <div>{element.address1 || ''}</div>
              <div>{element.address2 || ''}</div>
            </div>
          </ItemTableSearch>
        ))}
      </ScrollSearchView>
    </ResultTableWrapper>
  );
};

export default ResultTable;
