import React from 'react';
import { Form, InputProps } from 'antd';
import { CreateTitleNoticeWrapper, TitleCreateNoticeInput, TitleInputCreateNotice } from './createTitleNoticeStyle';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { MAX_LENGTH } from 'constants/constants';

interface ITitleCreate extends InputProps {
  name: string;
}

const CreateTitleNotice = ({ name }: ITitleCreate) => {
  return (
    <CreateTitleNoticeWrapper>
      <TitleCreateNoticeInput>{CREATE_NOTIFICATION_OPERATOR.TITLE}</TitleCreateNoticeInput>
      <Form.Item rules={[{ required: true, message: CREATE_NOTIFICATION_OPERATOR.VALIDATE_TITLE }]} name={name}>
        <TitleInputCreateNotice
          placeholder={CREATE_NOTIFICATION_OPERATOR.ANNOUNCEMENT_TITLE}
          maxLength={MAX_LENGTH.DEFAULT}
        />
      </Form.Item>
    </CreateTitleNoticeWrapper>
  );
};

export default CreateTitleNotice;
