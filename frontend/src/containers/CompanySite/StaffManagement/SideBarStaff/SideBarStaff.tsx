import React from 'react';
import Loading from '@components/Loading';
import ButtonIssuance from '@components/CompanySite/common/Button/ButtonIssuance';
import {
  ButtonFillter,
  ButtonGroup,
  ButtonRow,
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapper,
  SideBarCompanyWrapper,
} from './sideBarStaffStyle';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import images from '@assets/images-base';
import { PrefixIconBtn } from './sideBarStaffStyle';
import ItemCommon, { IItemCommon } from '@containers/CompanySite/common/Item';
import { ICompanyStaffBasicInformation, STATE_PAGE } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { getBackgroupItemStaff } from 'helper/getBackgroupItemStaff';
import { ECompanyStaffStatusType } from 'constants/constants';
import CompanySearchCustom from '@components/CompanySite/common/SearchCustom/CompanySearchCustom';
import { colors } from 'constants/colorsBase';
import useSideBarStaff from './useSideBarStaff';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const Item = ({ name, isSelected, onSelectItem, background, icon }: IItemCommon) => {
  return (
    <ItemCommon name={name} isSelected={isSelected} onSelectItem={onSelectItem} background={background} icon={icon} />
  );
};

interface ISideBarStaff {
  listStaff: ICompanyStaffBasicInformation[];
  isLoading: boolean;
  selected: ICompanyStaffBasicInformation | null;
  statePage: number;
  onSearch: (searchText: string) => void;
  setSelected: (company: ICompanyStaffBasicInformation | null) => void;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  searchText?: string;
  setSearchText: React.Dispatch<React.SetStateAction<string | undefined>>;
  activeStatus?: number;
  setActiveStatus?: React.Dispatch<React.SetStateAction<number>>;
  refershPageStaffCreate: () => void;
}

const SideBarStaff = ({
  listStaff,
  isLoading,
  selected,
  onSearch,
  setSelected,
  statePage,
  setStatePage,
  searchText,
  setSearchText,
  activeStatus,
  setActiveStatus,
  refershPageStaffCreate,
}: ISideBarStaff) => {
  const { toCreateStaff, onSelectItem, filterStatus, getIconItemStaff, onToManyStaff } = useSideBarStaff(
    setStatePage,
    setSelected,
    activeStatus,
    setActiveStatus
  );

  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);

  const toManyStaff = () => {
    refershPageStaffCreate();
    onToManyStaff();
  };
  return (
    <SideBarCompanyWrapper>
      <ListWrapper>
        <CompanySearchCustom
          onSearch={onSearch}
          placeholder={CONST_COMMON.SEARCH_BY_NAME}
          iconSearch={images.companySite.iconSearch}
          value={searchText}
          setValue={setSearchText}
        />
        <ButtonRow>
          <ButtonFillter
            active={activeStatus && activeStatus === ECompanyStaffStatusType.USING}
            onClick={() => filterStatus(ECompanyStaffStatusType.USING)}
          >
            {CONST_COMPANY_STAFF_MANAGEMENT.BUTTON_FILLTER_ACTIVE_TEXT}
          </ButtonFillter>
          <ButtonFillter
            active={activeStatus && activeStatus === ECompanyStaffStatusType.DELETED}
            onClick={() => filterStatus(ECompanyStaffStatusType.DELETED)}
            background={colors.red}
          >
            {CONST_COMPANY_STAFF_MANAGEMENT.BUTTON_FILLTER_BLOCKED_TEXT}
          </ButtonFillter>
        </ButtonRow>

        {isLoading && <Loading />}

        {listStaff?.length > 0 && !isLoading && (
          <ScrollWrapper>
            {listStaff.map((element: ICompanyStaffBasicInformation) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    name={element.name}
                    onSelectItem={() => onSelectItem(element)}
                    isSelected={selected?.id === element.id}
                    background={getBackgroupItemStaff(element?.status)}
                    icon={getIconItemStaff(element, selected)}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapper>
        )}

        {listStaff?.length === 0 && !isLoading ? <NodataWrapper>{CONST_COMMON.NO_DATA}</NodataWrapper> : <div />}
      </ListWrapper>
      <Line />
      {!(companyIdLeague && companyIdLeague !== authInfo?.company?.id) && <ButtonGroup>
        {statePage === STATE_PAGE.CREATE ? (
          <ButtonIssuance
            onClick={toCreateStaff}
            label={CONST_COMPANY_STAFF_MANAGEMENT.CREATE_ONE_STAFF}
            background={'linear-gradient(270deg, #FFFFFF 0%, #FFFFFF 100%)'}
            color={'#FDAB29'}
            boxShadow={'inset 0px 5px 5px rgba(0, 0, 0, 0.25)'}
            PrefixIcon={
              <PrefixIconBtn
                src={images.companySite.createAccountActive}
                alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
              />
            }
          />
        ) : (
          <ButtonIssuance
            onClick={toCreateStaff}
            label={CONST_COMPANY_STAFF_MANAGEMENT.CREATE_ONE_STAFF}
            PrefixIcon={
              <PrefixIconBtn
                src={images.companySite.createAccount}
                alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
              />
            }
          />
        )}
        {statePage === STATE_PAGE.CREATE_MANY ? (
          <ButtonIssuance
            onClick={toManyStaff}
            label={CONST_COMPANY_STAFF_MANAGEMENT.CREATE_MANY_STAFF}
            background={colors.createStaffBtnCreateStaffMany}
            color={colors.createStaffColorCreateStaffMany}
            boxShadow={'inset 0px 5px 5px rgba(0, 0, 0, 0.25)'}
            PrefixIcon={
              <PrefixIconBtn
                src={images.companySite.createMany}
                alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_MANY_STAFF}
              />
            }
          />
        ) : (
          <ButtonIssuance
            onClick={toManyStaff}
            label={CONST_COMPANY_STAFF_MANAGEMENT.CREATE_MANY_STAFF}
            PrefixIcon={
              <PrefixIconBtn
                src={images.companySite.createMany}
                alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_MANY_STAFF}
              />
            }
          />
        )}
      </ButtonGroup>}
    </SideBarCompanyWrapper>
  );
};

export default SideBarStaff;
