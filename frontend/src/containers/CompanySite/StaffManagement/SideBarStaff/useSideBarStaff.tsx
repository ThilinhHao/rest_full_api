import React, { useCallback } from 'react';
import { ICompanyStaffBasicInformation, STATE_PAGE } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { useNavigate } from 'react-router-dom';
import { ECompanyStaffStatusType } from 'constants/constants';
import images from '@assets/images-base';

const useSideBarStaff = (
  setStatePage: React.Dispatch<React.SetStateAction<number>>,
  setSelected: (company: ICompanyStaffBasicInformation | null) => void,
  activeStatus?: number,
  setActiveStatus?: React.Dispatch<React.SetStateAction<number>>
) => {
  const navigate = useNavigate();
  const toCreateStaff = () => {
    navigate('/staff-list/create');
    setSelected(null);
    setStatePage(STATE_PAGE.CREATE);
  };

  const onSelectItem = (staff: ICompanyStaffBasicInformation) => {
    setSelected(staff);
    navigate(`/staff-list/${staff?.id}`, {
      state: staff,
    });
    setStatePage(STATE_PAGE.VIEW);
  };

  const filterStatus = useCallback(
    (status: number) => {
      if (!setActiveStatus) return;
      if (activeStatus === status) {
        setActiveStatus(ECompanyStaffStatusType.NONE);
        return;
      }
      setActiveStatus(status);
    },
    [activeStatus, setActiveStatus]
  );

  const getIconItemStaff = (element: ICompanyStaffBasicInformation, selected: ICompanyStaffBasicInformation | null) => {
    if (
      element?.status === ECompanyStaffStatusType.NOT_ACCESS ||
      element?.status === ECompanyStaffStatusType.REJECT ||
      element?.status === ECompanyStaffStatusType.STAFF_WAITING_APPROVE
    ) {
      return (
        <img
          src={selected?.id === element.id ? images.companySite.warningRed : images.companySite.warningWhite}
          alt=""
        />
      );
    }
    return undefined;
  };

  const toManyStaff = () => {
    navigate('/staff-list/upload-staff');
    setSelected(null);
    setStatePage(STATE_PAGE.CREATE_MANY);
  };

  return {
    toCreateStaff,
    onToManyStaff: toManyStaff,
    onSelectItem,
    filterStatus,
    getIconItemStaff,
  };
};

export default useSideBarStaff;
