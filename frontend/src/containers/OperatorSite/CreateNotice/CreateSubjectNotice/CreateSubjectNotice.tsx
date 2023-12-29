import React from 'react';

import {
  CreateSubjectNoticeWrapper,
  ErrorMessage,
  Subject,
  SubjectItemsWrapper,
  TitleCreateNoticeSubject,
} from './createSubjectNoticeStyle';
import { Col } from 'antd';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { ISelectedSubject } from '@pages/OperatorSite/NoticeCreate/useCreateNotice';

const CreateSubjectNotice = ({
  selectedSubject,
  setSelectedSubject,
  messageErrorSubject,
}: {
  selectedSubject: ISelectedSubject;
  setSelectedSubject: (values: ISelectedSubject) => void;
  messageErrorSubject: string;
}) => {
  const select = (element: any) => {
    const newSubject = { ...selectedSubject };
    setSelectedSubject({
      ...newSubject,
      ...element,
    });
  };

  return (
    <CreateSubjectNoticeWrapper>
      <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.SUBJECT}</TitleCreateNoticeSubject>
      <Col>
        <SubjectItemsWrapper>
          <Subject
            selected={!!selectedSubject.companyNotify}
            onClick={() => select({ companyNotify: !selectedSubject.companyNotify })}
          >
            {CREATE_NOTIFICATION_OPERATOR.COMPANY_NOTICE}
          </Subject>
          <Subject
            selected={!!selectedSubject.staffNotify}
            onClick={() => select({ staffNotify: !selectedSubject.staffNotify })}
          >
            {CREATE_NOTIFICATION_OPERATOR.STAFF_NOTICE}
          </Subject>
          <Subject
            selected={!!selectedSubject.agencyNotify}
            onClick={() => select({ agencyNotify: !selectedSubject.agencyNotify })}
          >
            {CREATE_NOTIFICATION_OPERATOR.AGENCY}
          </Subject>
        </SubjectItemsWrapper>
        <ErrorMessage>{messageErrorSubject}</ErrorMessage>
      </Col>
    </CreateSubjectNoticeWrapper>
  );
};

export default CreateSubjectNotice;
