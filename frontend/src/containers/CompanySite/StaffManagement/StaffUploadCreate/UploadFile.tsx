import React, { useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import Papa from 'papaparse';

import ButtonIssuance from '@components/Button/ButtonIssuance';
import { CONST_COMPANY_STAFF_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { IconFile, IconUploadFile } from '@components/Icon';
import { UploadFileCreateWrapper } from './uploadFileStyle';
import configs from 'config';

const UploadFile = ({ onSubmitUploadFile }: { onSubmitUploadFile: (file: any) => void }) => {
  const ref = useRef<any>();

  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState<any>([]);

  const resetFile = () => {
    const inputs = ref.current.querySelectorAll('input');
    inputs.forEach((input: any) => {
      input.value = '';
    });
  };

  const handleOnChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      let result = true;
      if (file.type !== 'text/csv') {
        message.error(LANGUAGE_COMPANY.createStaff.uploadFileCSV);
        result = false;
      }
      if (file.size / 1024 / 1024 > 20) {
        message.error(LANGUAGE_COMPANY.createStaff.uploadFile10MB);
        result = false;
      }

      if (result) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          // encoding: 'Shift-JIS',
          beforeFirstChunk(chunk) {
            let rows = chunk.split(/\r\n|\r|\n/);
            if (rows?.length >= 2) {
              rows[0] = 'stt,name,name_kana,phone,email,salary_type,amount_limit_1,amount_limit_2';
            }
            return rows.join('\r\n');
          },
          complete(results: any) {
            let dataStaff: any = [];
            if (results?.data && results?.data?.length) {
              results.data.forEach((item: any, index: number) => {
                if (
                  index < 1 ||
                  item?.name ||
                  item?.name_kana ||
                  item?.email ||
                  item?.phone ||
                  item?.amount_limit_1 ||
                  item?.amount_limit_2
                ) {
                  dataStaff = [...dataStaff, { ...item }];
                }
              });
            }
            setData(dataStaff);
            setFile(file);
          },
        });
      } else {
        resetFile();
      }
    }
    return;
  };

  useEffect(() => {
    if (file && data?.length === 0) {
      message.error(LANGUAGE_COMPANY.createStaff.uploadFileFormatError);
    } else if (file && data?.length) {
      if (
        data[0] &&
        Object.values(data[0]).join() !==
          '日給者一括登録用,(※必須)氏名,(※必須)フリガナ,電話番号,(※必須)メールアドレス,給与形態,個別設定申請上限額(昼),個別設定申請上限額(夜)' &&
        Object.values(data[0]).join() !==
          '月給者一括登録用,(※必須)氏名,(※必須)フリガナ,電話番号,(※必須)メールアドレス,給与形態,個別設定申請上限額(月),個別設定申請上限額(日)'
      ) {
        message.error(LANGUAGE_COMPANY.createStaff.uploadFileFormatError);
      } else if (data.length <= 1) {
        message.error(LANGUAGE_COMPANY.createStaff.uploadFileNoData);
      } else {
        onSubmitUploadFile(file);
      }
    }

    resetFile();
    setFile(null);
  }, [file, data, onSubmitUploadFile]);

  return (
    <UploadFileCreateWrapper className="wrapper-upload-file-create" ref={ref}>
      <div className="box-content">
        <p className="title">{LANGUAGE_COMPANY.createStaff.tileUploadFile}</p>
        <div className="img-upload">
          <IconUploadFile />
          <input type="file" onChange={handleOnChange} />
        </div>
        {/* <div className="name-file"> {fileUpload && fileUpload.name}</div> */}
        <div className="footer">
          <p className="description">{LANGUAGE_COMPANY.createStaff.descriptionUploadFile}</p>
          <div className="box-btn-upload">
            <ButtonIssuance
              label={CONST_COMPANY_STAFF_MANAGEMENT.BUTTON_CHOOSE_FILE}
              PrefixIcon={<IconFile />}
              className="btn-upload"
            />
            <input type="file" onChange={handleOnChange} />
          </div>
        </div>
        <p className="download-template">
          {LANGUAGE_COMPANY.createStaff.descriptionDownload}{' '}
          <a
            href={
              configs.APP_CLOUDFOUNT +
              '/%E5%BE%93%E6%A5%AD%E5%93%A1%E4%B8%80%E6%8B%AC%E7%99%BB%E9%8C%B2%E3%82%B7%E3%83%BC%E3%83%88-%E6%97%A5%E7%B5%A6.csv'
            }
            download={true}
          >
            {LANGUAGE_COMPANY.createStaff.txtDownload}日給
          </a>
          <a
            href={
              configs.APP_CLOUDFOUNT +
              '/%E5%BE%93%E6%A5%AD%E5%93%A1%E4%B8%80%E6%8B%AC%E7%99%BB%E9%8C%B2%E3%82%B7%E3%83%BC%E3%83%88-%E6%9C%88%E7%B5%A6.csv'
            }
            download={true}
          >
            {LANGUAGE_COMPANY.createStaff.txtDownload}月給
          </a>
        </p>
      </div>
    </UploadFileCreateWrapper>
  );
};

export default UploadFile;
