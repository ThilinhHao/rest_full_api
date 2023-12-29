import React from 'react';

import { ButtonActiveB2B, ButtonAprovedB2B, ItemCompanyB2B, RowCompanyB2B } from './companyB2BStyle';

import { LANGUAGE_COMPANY_SETING } from 'constants/language';
import { STATUS_COMPANY_PAIR_B2B } from 'constants/company';
import { LoadingAttendance } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import Loading from '@components/Loading';
import { IListCompanyB2B } from '@pages/CompanySite/CompanyB2B/interface';

const ListCompanyB2B = ({
  companyId,
  getNameCompany,
  getTxtBtnB2B,
  getTxtStatusB2B,
  idLoadingList,
  listCompanyB2B,
  onChangeStatusB2B,
}: {
  companyId: number;
  getNameCompany: any;
  getTxtBtnB2B: any;
  getTxtStatusB2B: any;
  idLoadingList: Boolean;
  listCompanyB2B: IListCompanyB2B[];
  onChangeStatusB2B: any;
}) => {
  const changeStatusB2B = (data: IListCompanyB2B, status: number) => {
    onChangeStatusB2B({
      pair_info: data,
      status,
    });
  };

  return (
    <>
      {idLoadingList && (
        <LoadingAttendance>
          <Loading />
        </LoadingAttendance>
      )}

      {!!listCompanyB2B?.length &&
        listCompanyB2B.map((item: IListCompanyB2B) => (
          <RowCompanyB2B key={item.id}>
            <ItemCompanyB2B>
              <div className="col-left">
                <div
                  className={`view-status ${getTxtStatusB2B(item.status, companyId === item.company_paired_id).color}`}
                >
                  {getTxtStatusB2B(item.status, companyId === item.company_paired_id).text}
                </div>
                <div>{getNameCompany(item, item.status, companyId === item.company_paired_id)}</div>
              </div>
              <div className="col-right">
                {item.status === STATUS_COMPANY_PAIR_B2B.status_new && companyId === item.company_paired_id && (
                  <ButtonAprovedB2B onClick={() => changeStatusB2B(item, STATUS_COMPANY_PAIR_B2B.status_pair)}>
                    {LANGUAGE_COMPANY_SETING.pair_b2b.btn_approved}
                  </ButtonAprovedB2B>
                )}
                {companyId === item.company_paired_id && item.status === STATUS_COMPANY_PAIR_B2B.status_reject ? (
                  <></>
                ) : (
                  <ButtonActiveB2B
                    onClick={() =>
                      changeStatusB2B(item, getTxtBtnB2B(item.status, companyId === item.company_paired_id).status)
                    }
                  >
                    {getTxtBtnB2B(item.status, companyId === item.company_paired_id).text}
                  </ButtonActiveB2B>
                )}
              </div>
            </ItemCompanyB2B>
          </RowCompanyB2B>
        ))}
      <div className="txt-data-null">
        {!listCompanyB2B?.length && !idLoadingList && LANGUAGE_COMPANY_SETING.pair_b2b.txt_company_pair_null}
      </div>
    </>
  );
};

export default ListCompanyB2B;
