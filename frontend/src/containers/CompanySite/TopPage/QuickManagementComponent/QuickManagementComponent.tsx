import React from 'react';
import {
  ItemAttendanceRecord,
  IconItem,
  ItemEmployeeList,
  ItemPaymentHistory,
  QuickManagementComponentWrapper,
  TitleButton,
  ItemInvoice,
} from './quickManagementComponentStyle';
import images from '@assets/images-base';
import { useNavigate } from 'react-router-dom';
import { CONST_TOP_PAGE_COMPANY } from 'constants/language';

const QuickManagementComponent = () => {
  const navigate = useNavigate();
  const toHistory = () => navigate('/history');
  const toAttendance = () => navigate('/attendance');
  const toEmployeeList = () => navigate('/staff-list');
  const toInvoice = () => navigate('/invoices');
  return (
    <QuickManagementComponentWrapper>
      <ItemPaymentHistory onClick={toHistory}>
        <IconItem src={images.companySite.topClock} />
        <TitleButton>{CONST_TOP_PAGE_COMPANY.PREPAYMENT_HISTORY}</TitleButton>
      </ItemPaymentHistory>
      <ItemAttendanceRecord onClick={toAttendance}>
        <IconItem src={images.companySite.attendanceRecord} />
        <TitleButton>{CONST_TOP_PAGE_COMPANY.ATTENDANCE_RECORD}</TitleButton>
      </ItemAttendanceRecord>
      <ItemEmployeeList onClick={toEmployeeList}>
        <IconItem src={images.companySite.employeeList} />
        <TitleButton>{CONST_TOP_PAGE_COMPANY.EMPLOYEE_LIST}</TitleButton>
      </ItemEmployeeList>
      <ItemInvoice onClick={toInvoice}>
        <IconItem src={images.companySite.invoice} />
        <TitleButton>{CONST_TOP_PAGE_COMPANY.INVOICE}</TitleButton>
      </ItemInvoice>
    </QuickManagementComponentWrapper>
  );
};

export default QuickManagementComponent;
