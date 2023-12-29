import React from 'react';

import ButtonIssuance from '@components/Button/ButtonIssuance';
import { LANGUAGE_COMPANY } from 'constants/language';
import { UploadFileCreateWrapper } from './uploadFileStyle';
import NumberProgress from './NumberProgress';

const UploadFileProgress = ({
  onCancelUpload,
  percentage,
  onSetStatePage,
}: {
  percentage: number;
  onCancelUpload: () => void;
  onSetStatePage: (data: number) => void;
}) => {
  return (
    <UploadFileCreateWrapper className="wrapper-upload-file-progress">
      <div className="box-content">
        <p className="title">{LANGUAGE_COMPANY.createStaff.tileUploadFileProgress}</p>
        <NumberProgress percentage={percentage} onSetStatePage={onSetStatePage} />
        <div className="footer">
          <p className="description">{LANGUAGE_COMPANY.createStaff.descriptionUploadFileProgress}</p>
          <ButtonIssuance
            onClick={onCancelUpload}
            label={LANGUAGE_COMPANY.createStaff.btnCancelUploadFile}
            PrefixIcon="hidden"
            className="btn-cancel"
          />
        </div>
      </div>
    </UploadFileCreateWrapper>
  );
};

export default UploadFileProgress;
