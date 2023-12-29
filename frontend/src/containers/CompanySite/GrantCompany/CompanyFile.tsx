import React, { useEffect, useState } from 'react';
import images from '@assets/images-base';

import { SpaceBase } from 'styles';
import { EStatusCompany, EStatusFile, MAX_LENGTH } from 'constants/constants';
import { defaultFiles, ICompany, IFile } from 'constants/operatorSite';
import { ErrorOperator, WrapperInput } from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import { BtnAddFile, ItemWrapper, TickedIcon, TitleWrapper, WrapperFile } from './CompanyStyle';

import InputCard from '@components/Input/InputCard';

const FileItem = ({
  item,
  disabled,
  onRemove,
  onChangeName,
  canNotRemove,
}: {
  item: IFile;
  disabled: boolean;
  canNotRemove?: boolean;
  onRemove: () => void;
  onChangeName: () => void;
}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!value) {
      setValue(item.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return (
    <WrapperInput width="25rem">
      <ItemWrapper>
        <InputCard
          id={`element_${item.id}`}
          isShadow={true}
          width={18.75}
          height={2.5}
          value={value}
          maxLength={MAX_LENGTH.DEFAULT}
          defaultValue={item.name}
          disabled={disabled}
          margin={[0, 0.313, 0, 0.626]}
          onChange={(e) => {
            onChangeName();
            setValue(e.target.value);
          }}
        />
        {!canNotRemove && (
          <TickedIcon
            disabled={canNotRemove}
            src={images.company.deleteCompany}
            alt=""
            onClick={() => {
              if (canNotRemove) return;
              onRemove();
            }}
          />
        )}
      </ItemWrapper>
      <ErrorOperator>
        {item.isError && <SpaceBase width={1} />} {item.isError}
      </ErrorOperator>
    </WrapperInput>
  );
};

const CompanyFile = ({
  error,
  files,
  setFiles,
  isCreate,
  statusCompany,
}: {
  error: ICompany;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
  isCreate?: boolean;
  statusCompany?: number;
}) => {
  const addFile = () => {
    const newFiles = [...files];
    newFiles.push({
      name: '',
      status: EStatusFile.UN_TICKED,
      id: Math.random() * Math.random() * Math.random(),
      isError: false,
    });
    setFiles(newFiles);
  };

  const onRemove = (idxRemove: number) => {
    const newFiles: IFile[] = [...files].filter((_, index) => index !== idxRemove);
    setFiles(newFiles);
  };

  const onChangeName = (idxChange: number) => {
    if (!files[idxChange].isError) {
      return;
    }
    setFiles(
      files.map((element: IFile, index: number) => {
        return {
          ...element,
          isError: idxChange === index ? false : element.isError,
        };
      })
    );
  };

  return (
    <>
      <TitleWrapper>
        <div>必要書類提出項目</div>
        <div />
      </TitleWrapper>
      <ErrorOperator>
        {error.files && <SpaceBase width={1} />}
        {error.files}
      </ErrorOperator>
      <WrapperFile>
        {files?.map((element: IFile, index: number) => (
          <React.Fragment key={String(element.id)}>
            <FileItem
              item={element}
              disabled={
                index === 0 ||
                index === 1 ||
                (element.name === defaultFiles[2].name && element.id >= 1) ||
                (statusCompany !== EStatusCompany.STATUS_NOTVNVERIFY && !isCreate)
              }
              canNotRemove={
                index === 0 || index === 1 || (statusCompany !== EStatusCompany.STATUS_NOTVNVERIFY && !isCreate)
              }
              onRemove={() => onRemove(index)}
              onChangeName={() => onChangeName(index)}
            />
          </React.Fragment>
        ))}
        {(statusCompany === EStatusCompany.STATUS_NOTVNVERIFY || isCreate) && (
          <BtnAddFile onClick={addFile}>項目追加</BtnAddFile>
        )}
      </WrapperFile>
    </>
  );
};

export default CompanyFile;
