import images from '@assets/images-base';
import { ItemIcon } from '@containers/CompanySite/AdminAccount/DetailAdminAccount/detailAdminAccountStyle';
import { Spin } from 'antd';
import { CONST_COMMON, CONST_COMPANY_BANK_SETTING } from 'constants/language';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BtnWrapper,
  ButtonVerifyPrivacy,
  DocumentContainerWrapper,
  DocumentWrapper,
  IconBack,
  ParagraphWrapper,
  TitleNoteUpdate,
  TitlePageWrapper,
} from './agreeDocumentStyle';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';
import { IAgreedRegulationsSignatureData } from 'helper/export';

interface IAgreeDocumentProps {
  agreeDocument: () => void;
  detailDocument: string;
  isLoadingGetDetailDocument: boolean;
  isLoadingCheckDocument: boolean;
  titleDocument: string;
  titleNoteUpdate: string;
  handleBack: () => void;
  isVerified: boolean;
  agreedRegulationsSignatureData?: IAgreedRegulationsSignatureData;
}

const AgreeDocument = ({
  agreeDocument,
  detailDocument,
  isLoadingGetDetailDocument,
  isLoadingCheckDocument,
  titleDocument,
  handleBack,
  isVerified,
  titleNoteUpdate,
  agreedRegulationsSignatureData,
}: IAgreeDocumentProps) => {
  const ref = useRef<any>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [canScroll, setCanScroll] = useState<boolean>(false);

  const onScroll = useCallback(() => {
    if (ref.current && canScroll) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight + 2 >= scrollHeight && detailDocument) {
        setButtonDisabled(false);
      }
    }
  }, [ref, detailDocument, canScroll]);

  useEffect(() => {
    setButtonDisabled(true);
  }, []);

  return (
    <DocumentContainerWrapper>
      <IconBack
        src={images.companySite.backCompany}
        alt={CONST_COMPANY_BANK_SETTING.ALT.BACK_TO_HOME}
        onClick={handleBack}
      />
      <TitlePageWrapper>{titleDocument}</TitlePageWrapper>
      <TitleNoteUpdate>{titleNoteUpdate}</TitleNoteUpdate>
      <DocumentWrapper height="59vh" boxShadow={true}>
        {isLoadingGetDetailDocument && <Spin size="large" />}
        {!isLoadingGetDetailDocument && (
          <ParagraphWrapper className="style-scroll-document" onScroll={onScroll} ref={ref} onMouseEnter={onScroll}>
            <PreviewPDF
              link={detailDocument}
              width="99%"
              height="auto"
              minHeight="20rem"
              onLoadFileSuccess={() => setCanScroll(true)}
              agreedRegulationsSignatureData={agreedRegulationsSignatureData}
            />
          </ParagraphWrapper>
        )}
      </DocumentWrapper>
      <BtnWrapper>
        <ButtonVerifyPrivacy
          loading={isLoadingCheckDocument}
          onClick={agreeDocument}
          disabled={isVerified ? false : buttonDisabled}
          isVerified={isVerified}
          icon={<ItemIcon top="0.375rem" src={images.companySite.checkPrivacyPolicy} alt={CONST_COMMON.ALT.AGREE} />}
        >
          {isVerified ? CONST_COMMON.AGREED_BTN : CONST_COMMON.AGREE_BTN}
        </ButtonVerifyPrivacy>
      </BtnWrapper>
    </DocumentContainerWrapper>
  );
};

export default AgreeDocument;
