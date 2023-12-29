import React from 'react';
import useEditPrivacy from './useEditPrivacy';

import { SpaceBase } from 'styles';
import { Container, GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { CardSettingEdit, TitleSettingEdit } from './editPrivacyStyle';
import { CONST_COMMON, LANGUAGE_COMPANY } from 'constants/language';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { ButtonUpload, DraggerUpload, GuideText, ModalContent } from '@components/common/Modal/style';
import { SpinLoading } from '@components/Loading/LoadingStyle';
import { IconFile, ModalUploadBanner } from '@components/Icon';
import { UploadButtons } from '@components/common/Modal/UploadButtons';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';

const EditPrivacyPolicy = () => {
  const {
    BREADS,
    onSavePrivacyPolicy,
    privacyPolicy,
    isLoading,
    titleScreen,
    isOpenModal,
    setIsOpenModal,
    uploadFile,
    isLoadingUpload,
    uploadedFile,
    cancelUpload,
    isLoadingGetRegulations,
  } = useEditPrivacy();
  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <CardSettingEdit>
          <TitleSettingEdit>{titleScreen}</TitleSettingEdit>
          <SpaceBase height={1.25} />
          {isLoadingGetRegulations && <SpinLoading />}
          {!isLoadingGetRegulations && <PreviewPDF link={privacyPolicy} />}
          <ButtonUpload icon={<IconFile className="icon" />} onClick={() => setIsOpenModal(true)} isloading={isLoading}>
            {CONST_COMMON.SELECT_FILES}
          </ButtonUpload>
        </CardSettingEdit>
      </Container>
      <ModalCommon
        isOpen={isOpenModal}
        setIsOpen={() => setIsOpenModal(false)}
        isShowBtnOk={false}
        isShowBtnCancel={false}
      >
        <ModalContainer>
          <ModalContent padding={uploadedFile ? '0' : '6.25rem 0'}>
            <>
              {!uploadedFile && (
                <DraggerUpload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => {
                    return false;
                  }}
                  multiple={false}
                  accept=".pdf"
                  maxCount={1}
                  onChange={(info) => uploadFile(info)}
                >
                  {isLoadingUpload ? (
                    <SpinLoading />
                  ) : (
                    <>
                      <ModalUploadBanner width="20.063rem" height="20rem" />
                      <GuideText>{LANGUAGE_COMPANY.createStaff.descriptionUploadFile}</GuideText>
                      <ButtonUpload icon={<IconFile className="icon" />}>{CONST_COMMON.SELECT_FILES}</ButtonUpload>
                    </>
                  )}
                </DraggerUpload>
              )}
              {uploadedFile && (
                <>
                  <PreviewPDF link={uploadedFile} />
                  <UploadButtons
                    cancelUpload={cancelUpload}
                    sendUploadFiles={onSavePrivacyPolicy}
                    isLoadingSaveFile={isLoading}
                  />
                </>
              )}
            </>
          </ModalContent>
        </ModalContainer>
      </ModalCommon>
    </GrantCompanyWrapper>
  );
};

export default EditPrivacyPolicy;
