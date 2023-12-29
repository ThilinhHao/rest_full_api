import React from 'react';
import Form from 'antd/es/form';

import { InputProps } from 'antd';
import { TitleCreateNoticeSubject } from '../CreateSubjectNotice/createSubjectNoticeStyle';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { ContentNoticeWrapper, TextAreaContentNotice } from './contentNoticeStyle';

interface ITitleCreate extends InputProps {
  name: string;
}
const ContentNotice = ({ name }: ITitleCreate) => {
  return (
    <ContentNoticeWrapper>
      <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.TEXT}</TitleCreateNoticeSubject>
      <Form.Item rules={[{ required: true, message: CREATE_NOTIFICATION_OPERATOR.VALIDATE_CONTENT }]} name={name}>
        <TextAreaContentNotice placeholder={CREATE_NOTIFICATION_OPERATOR.MULTI_TEXT} maxLength={5000} />
      </Form.Item>
    </ContentNoticeWrapper>
  );
};

export default ContentNotice;
