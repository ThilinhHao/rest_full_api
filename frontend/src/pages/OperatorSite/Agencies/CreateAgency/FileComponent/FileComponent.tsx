import React from 'react';

import { FileItemAgency, TitleFileCreateAgency } from './fileComponentStyle';
import { RowCenter, SpaceBase } from 'styles';
import { defaultEdit } from 'constants/operatorSite';

const FileComponent = () => {
  return (
    <>
      <SpaceBase height={0.3} />
      <TitleFileCreateAgency>
        <div>必要書類提出項目</div>
        <div />
      </TitleFileCreateAgency>
      <SpaceBase height={2.375} />
      <RowCenter>
        <FileItemAgency>{defaultEdit[0].name}</FileItemAgency>
        <SpaceBase height={1} />

        <FileItemAgency>{defaultEdit[1].name}</FileItemAgency>
      </RowCenter>
    </>
  );
};

export default FileComponent;
